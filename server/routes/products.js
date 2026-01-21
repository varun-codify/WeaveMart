const express = require('express');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, featured } = req.query;
        let query = {};

        if (category) query.category = category;
        if (featured) query.featured = featured === 'true';

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create product (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update product (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete product (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
