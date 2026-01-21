import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { products, categories } from '../data/products';

const Home = () => {
    const featuredProducts = products.filter(p => p.featured).slice(0, 3);
    const collections = categories.filter(c => c !== "All");

    return (
        <div className="bg-brand-white">
            {/* Hero Section */}
            <section className="relative h-[85vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2048&auto=format&fit=crop"
                        alt="Premium Textile Interiors"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-brand-charcoal/30 mix-blend-multiply"></div>
                </div>

                <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 animate-slide-up">
                        Quality Textiles.<br />
                        Crafted for Comfort.
                    </h1>
                    <p className="text-lg md:text-xl text-brand-beige max-w-2xl mb-10 font-light tracking-wide animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Bringing the heritage of Karur's finest weaving straight to your home.
                        Elegant, durable, and timeless.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Link
                            to="/shop"
                            className="px-8 py-4 bg-white text-brand-charcoal font-medium hover:bg-brand-beige hover:scale-105 transition-all duration-300 min-w-[180px] rounded-sm shadow-lg hover:shadow-xl"
                        >
                            Explore Collections
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white/10 hover:scale-105 transition-all duration-300 min-w-[180px] rounded-sm"
                        >
                            Visit Our Store
                        </Link>
                    </div>
                </div>
            </section>

            {/* Brand Story / Trust */}
            <section className="py-20 px-4 bg-brand-beige/30">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-brand-indigo text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Our Heritage</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-6">Woven in Karur, Loved Globally</h2>
                    <p className="text-stone-600 leading-relaxed mb-12">
                        For generations, Karur has been the heart of India's home textile industry.
                        At Home Fashion, we continue this legacy by combining traditional craftsmanship
                        with modern aesthetics. Every thread tells a story of quality and dedication.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in rounded-lg">
                            <ShieldCheck className="w-10 h-10 text-brand-maroon mb-4 animate-bounce-subtle" />
                            <h3 className="font-serif text-lg mb-2">Premium Quality</h3>
                            <p className="text-sm text-stone-500">100% Export Quality Standards</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in rounded-lg" style={{ animationDelay: '0.1s' }}>
                            <Truck className="w-10 h-10 text-brand-maroon mb-4 animate-bounce-subtle" style={{ animationDelay: '0.3s' }} />
                            <h3 className="font-serif text-lg mb-2">Pan-India Delivery</h3>
                            <p className="text-sm text-stone-500">Secure shipping across 200+ cities</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in rounded-lg" style={{ animationDelay: '0.2s' }}>
                            <Star className="w-10 h-10 text-brand-maroon mb-4 animate-bounce-subtle" style={{ animationDelay: '0.6s' }} />
                            <h3 className="font-serif text-lg mb-2">Trusted Heritage</h3>
                            <p className="text-sm text-stone-500">Serving homes since 1998</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collections (Horizontal Scroll) */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-serif text-brand-charcoal mb-2">Curated Collections</h2>
                        <p className="text-stone-500">Designed for every corner of your home</p>
                    </div>
                    <Link to="/shop" className="hidden md:flex items-center text-brand-indigo hover:text-brand-maroon transition-colors group">
                        View All <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((cat, idx) => (
                        <Link key={idx} to={`/shop?category=${cat}`} className="group relative aspect-[3/4] overflow-hidden bg-stone-100">
                            <img
                                src={
                                    cat === 'Bedroom' ? 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800' :
                                        cat === 'Living' ? 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800' :
                                            cat === 'Dining' ? 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800' :
                                                cat === 'Bathroom' ? 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' :
                                                    cat === 'Clothing' ? 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800' :
                                                        cat === "Women's Wear" ? 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800' :
                                                            cat === "Men's Wear" ? 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800' :
                                                                'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800' // Fallback
                                }
                                alt={cat}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <span className="text-white text-xl font-serif tracking-wide block mb-2 transform translate-y-0 transition-transform group-hover:-translate-y-2">
                                    {cat}
                                </span>
                                <span className="text-brand-beige text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    Shop Now
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Editor's Pick */}
            <section className="py-20 bg-brand-charcoal text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-serif mb-12 text-center">Featured Masterpieces</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="group block">
                                <div className="relative aspect-square overflow-hidden bg-stone-800 mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-white text-brand-charcoal text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                        New
                                    </div>
                                </div>
                                <h3 className="text-lg font-serif mb-1 group-hover:text-brand-beige transition-colors">{product.name}</h3>
                                <p className="text-stone-400 font-light">₹{product.price.toLocaleString()}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <Link to="/shop" className="inline-block border-b border-white pb-1 hover:text-brand-beige hover:border-brand-beige transition-colors">
                            Discover All Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
