const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    details: {
        fabric: String,
        care: String,
        dimensions: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        default: 100,
        min: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
