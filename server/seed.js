const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    {
        name: "Karur Cotton Bedspread - Heritage Series",
        price: 2499,
        category: "Bedroom",
        image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=1000",
        description: "Hand-woven specialized Karur cotton bedspread featuring traditional motifs. Breathable, durable, and gets softer with every wash.",
        details: {
            fabric: "100% Premium Comb Cotton",
            care: "Machine wash cold, tumble dry low",
            dimensions: "90x100 inches (Queen/King fit)"
        },
        featured: true,
        stock: 50
    },
    {
        name: "Royal Jacquard Cushion Covers (Set of 2)",
        price: 899,
        category: "Living",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=1000",
        description: "Elevate your living space with these intricately woven Jacquard cushion covers. Subtle sheen and premium texture.",
        details: {
            fabric: "Cotton-Silk Blend",
            care: "Dry clean only recommended",
            dimensions: "16x16 inches"
        },
        featured: false,
        stock: 100
    },
    {
        name: "Organic Linen Table Runner",
        price: 1250,
        category: "Dining",
        image: "https://images.unsplash.com/photo-1598300042903-8eb8b9a4062a?auto=format&fit=crop&q=80&w=1000",
        description: "Minimalist earthy tones for a sophisticated dining experience. Made from sustainable linen fibers.",
        details: {
            fabric: "100% Organic Linen",
            care: "Gentle wash, warm iron",
            dimensions: "13x72 inches"
        },
        featured: true,
        stock: 75
    },
    {
        name: "Thermal Blockout Curtains - Indigo",
        price: 3499,
        category: "Living",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000",
        description: "Heavy-duty thermal curtains that keep your room cool in summers and warm in winters. Deep indigo hue.",
        details: {
            fabric: "Polyester Blend with Thermal Lining",
            care: "Dry clean recommended",
            dimensions: "52x84 inches (per panel)"
        },
        featured: false,
        stock: 40
    },
    {
        name: "Handloom Cotton Throw Blanket",
        price: 1899,
        category: "Living",
        image: "https://images.unsplash.com/photo-1601306353428-82eba2da1f38?auto=format&fit=crop&q=80&w=1000",
        description: "Lightweight yet cozy throw blanket with elegant stripes. Perfect for sofas and beds.",
        details: {
            fabric: "100% Cotton Handloom",
            care: "Machine wash gentle cycle",
            dimensions: "50x70 inches"
        },
        featured: true,
        stock: 60
    },
    {
        name: "Silk Embroidered Pillow Covers",
        price: 1499,
        category: "Bedroom",
        image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=1000",
        description: "Luxurious silk pillow covers with delicate hand embroidery. Adds elegance to any bedroom.",
        details: {
            fabric: "Pure Silk with Cotton Backing",
            care: "Dry clean only",
            dimensions: "18x18 inches"
        },
        featured: false,
        stock: 35
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('✅ Products seeded successfully');

        console.log(`📦 Added ${products.length} products to database`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
