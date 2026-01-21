import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

// Complete categories from products.js
const categories = ['All', 'Bedroom', 'Living', 'Dining', 'Bathroom', 'Clothing', "Women's Wear", "Men's Wear"];

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const selectedCategory = searchParams.get('category') || 'All';

    const [sortBy, setSortBy] = useState('featured');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products - use static data for now since backend may not have all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Try API first
                const data = await productsAPI.getAll();

                // If API returns data but it's incomplete (less than expected), use static fallback
                if (!data || data.length < 10) {
                    console.warn('API returned incomplete product data, using static fallback');
                    import('../data/products').then(module => {
                        setProducts(module.products);
                    });
                } else {
                    setProducts(data);
                }
            } catch (error) {
                console.error('Failed to fetch products from API, using static fallback:', error);
                // Fallback to static data if API fails
                import('../data/products').then(module => {
                    setProducts(module.products);
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const updateCategory = (cat) => {
        const params = new URLSearchParams(location.search);
        if (cat === 'All') {
            params.delete('category');
        } else {
            params.set('category', cat);
        }
        navigate(`?${params.toString()}`);
    };

    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            default:
                // featured: prioritize products marked featured
                result.sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1);
        }

        return result;
    }, [selectedCategory, sortBy]);

    return (
        <div className="bg-brand-white min-h-screen pb-20 pt-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <h1 className="text-3xl md:text-5xl font-serif text-brand-charcoal mb-4">Our Collection</h1>
                <p className="text-stone-500 max-w-lg mx-auto">
                    Explore our range of premium textiles, handcrafted for comfort and elegance.
                </p>
            </div>

            {/* Filters & Toolbar */}
            <div className="sticky top-20 z-40 bg-brand-white/95 backdrop-blur border-y border-stone-200 mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Categories */}
                    <div className="flex overflow-x-auto space-x-6 pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => updateCategory(cat)}
                                className={`text-sm tracking-wide whitespace-nowrap transition-colors ${selectedCategory === cat
                                    ? 'text-brand-maroon font-semibold underline decoration-2 underline-offset-4'
                                    : 'text-stone-500 hover:text-brand-charcoal'
                                    }`}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="flex items-center space-x-3 text-sm">
                        <SlidersHorizontal className="w-4 h-4 text-stone-400" />
                        <span className="text-stone-500 hidden sm:inline">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-brand-charcoal font-medium cursor-pointer"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-stone-500 text-lg">No products found in this category.</p>
                        <button
                            onClick={() => updateCategory('All')}
                            className="mt-4 text-brand-indigo hover:underline"
                        >
                            View all products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
