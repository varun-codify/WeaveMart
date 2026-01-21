const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Allow guest orders
    },
    customerInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        phone: { type: String, required: true }
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        productSnapshot: {
            name: String,
            price: Number,
            image: String
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['card', 'upi', 'cod']
    },
    paymentStatus: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed', 'failed']
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
    },
    metadata: {
        paymentIntentId: String,
        transactionId: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
