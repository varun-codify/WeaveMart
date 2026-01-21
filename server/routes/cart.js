const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get cart
router.get('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
        if (!cart) {
            return res.json({ items: [] });
        }
        res.json(cart);
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        
        // Verify product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.userId });
        
        if (!cart) {
            // Create new cart
            cart = new Cart({
                user: req.userId,
                items: [{ product: productId, quantity }]
            });
        } else {
            // Check if product already in cart
            const itemIndex = cart.items.findIndex(item => 
                item.product.toString() === productId
            );
            
            if (itemIndex > -1) {
                // Update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item
                cart.items.push({ product: productId, quantity });
            }
        }
        
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update cart item quantity
router.patch('/update', auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        const cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        if (quantity <= 0) {
            // Remove item
            cart.items = cart.items.filter(item => 
                item.product.toString() !== productId
            );
        } else {
            // Update quantity
            const item = cart.items.find(item => 
                item.product.toString() === productId
            );
            if (item) {
                item.quantity = quantity;
            }
        }
        
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove from cart
router.delete('/remove/:productId', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.items = cart.items.filter(item => 
            item.product.toString() !== req.params.productId
        );
        
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.userId });
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
