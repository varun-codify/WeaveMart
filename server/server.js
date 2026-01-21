const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const compression = require("compression");

// Initialize dotenv
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Webhook endpoint MUST be BEFORE express.json() middleware
app.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('⚠️ Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('✅ Payment succeeded:', paymentIntent.id);

            // Update order status in database
            const Order = require('./models/Order');
            try {
                const order = await Order.findOne({
                    'metadata.paymentIntentId': paymentIntent.id
                });

                if (order) {
                    order.paymentStatus = 'completed';
                    order.status = 'confirmed';
                    await order.save();
                    console.log('✅ Order updated:', order.orderNumber);
                }
            } catch (error) {
                console.error('Error updating order:', error);
            }
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('❌ Payment failed:', failedPayment.id);

            // Update order status to failed
            try {
                const Order = require('./models/Order');
                const order = await Order.findOne({
                    'metadata.paymentIntentId': failedPayment.id
                });

                if (order) {
                    order.paymentStatus = 'failed';
                    order.status = 'cancelled';
                    await order.save();
                }
            } catch (error) {
                console.error('Error updating failed order:', error);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

// ═══════════════════════════════════════════════════════════
// 🔐 SECURITY MIDDLEWARE (Production-Ready)
// ═══════════════════════════════════════════════════════════

// 1. Helmet - Secure HTTP Headers
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for API server
    crossOriginEmbedderPolicy: false
}));

// 2. Rate Limiting - Prevent Brute Force & DDoS
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 requests per hour
    message: 'Too many authentication attempts, please try again later.',
    skipSuccessfulRequests: true
});

const paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit payment attempts
    message: 'Too many payment requests, please try again later.',
});

// Apply general rate limiting to all routes
app.use(generalLimiter);

// 3. Data Sanitization against NoSQL Injection
app.use(mongoSanitize());

// 4. Prevent HTTP Parameter Pollution
app.use(hpp());

// 5. Compression for better performance
app.use(compression());

// Middleware (AFTER webhook route)
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body size

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');

// API Routes with Rate Limiters
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Textile CP Backend is running!");
});

// Config route to send Publishable Key to frontend
app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

// ═══════════════════════════════════════════════════════════
// 🔐 SECURE PAYMENT INTENT - Server-Side Price Calculation
// ═══════════════════════════════════════════════════════════
app.post("/create-payment-intent", paymentLimiter, async (req, res) => {
    try {
        const { items, orderData } = req.body;

        // Validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                error: { message: 'Invalid cart items' }
            });
        }

        // Import product data (in production, this would be from database)
        const { products } = require('./data/products');

        // Calculate total amount SERVER-SIDE (NEVER trust client)
        let totalAmount = 0;
        const invalidItems = [];

        for (const item of items) {
            const product = products.find(p => p.id === item.id);

            if (!product) {
                invalidItems.push(item.id);
                continue;
            }

            // Validate quantity
            const quantity = parseInt(item.quantity);
            if (!quantity || quantity < 1 || quantity > 99) {
                return res.status(400).json({
                    error: { message: 'Invalid quantity for product: ' + product.name }
                });
            }

            // Use ONLY server-side price
            totalAmount += product.price * quantity;
        }

        if (invalidItems.length > 0) {
            return res.status(400).json({
                error: { message: 'Invalid product IDs: ' + invalidItems.join(', ') }
            });
        }

        if (totalAmount <= 0) {
            return res.status(400).json({
                error: { message: 'Invalid total amount' }
            });
        }

        // Create a PaymentIntent with order metadata
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convert to paise/cents
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                orderNumber: orderData?.orderNumber || '',
                customerEmail: orderData?.customerEmail || '',
                orderId: orderData?.orderId || '',
                itemCount: items.length
            },
            description: `Order #${orderData?.orderNumber || 'N/A'} - ${items.length} items`
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: totalAmount // Send back calculated amount for verification
        });
    } catch (e) {
        console.error("❌ Error creating payment intent:", e);
        res.status(400).json({
            error: {
                message: e.message,
            },
        });
    }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}!`));
