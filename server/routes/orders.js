const express = require('express');
const Order = require('../models/Order');
const { auth, adminAuth } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

const router = express.Router();

// Create order with validation
router.post('/', validateOrder, async (req, res) => {
    try {
        const orderData = req.body;

        // Generate unique order number
        orderData.orderNumber = Math.floor(100000 + Math.random() * 900000);

        // If user is authenticated, attach user ID
        if (req.userId) {
            orderData.user = req.userId;
        }

        const order = new Order(orderData);
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all orders (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('items.product')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product')
            .populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update order status (Admin only)
router.patch('/:id/status', auth, adminAuth, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
