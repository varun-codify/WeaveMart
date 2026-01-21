import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import QuantityControl from '../components/QuantityControl';
import { ArrowLeft, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';

const Product = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) return <div className="pt-20 text-center">Loading...</div>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        // Optional: Add toast or visual feedback
    };

    return (
        <div className="bg-brand-white pt-8 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link to="/shop" className="inline-flex items-center text-sm text-stone-500 hover:text-brand-charcoal transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left: Image */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="eager"
                                width="800"
                                height="800"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col h-full">
                        <span className="text-sm font-bold tracking-widest text-brand-indigo uppercase mb-2">
                            {product.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-4">
                            {product.name}
                        </h1>
                        <p className="text-2xl font-light text-stone-900 mb-8">
                            ₹{product.price.toLocaleString()}
                        </p>

                        <div className="prose prose-stone mb-8 text-stone-600 leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="border-t border-b border-stone-200 py-8 mb-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-stone-900">Quantity</span>
                                <QuantityControl quantity={quantity} setQuantity={setQuantity} />
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-brand-charcoal text-white py-4 font-medium tracking-wide hover:bg-stone-800 transition-colors uppercase text-sm"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Details Tabs */}
                        <div className="space-y-4">
                            {/* Simplistic Accordion/Info */}
                            <div className="grid grid-cols-3 text-center border-b border-stone-200">
                                {['description', 'fabric', 'care'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 text-sm font-medium uppercase tracking-wide transition-colors border-b-2 ${activeTab === tab
                                            ? 'border-brand-maroon text-brand-charcoal'
                                            : 'border-transparent text-stone-400 hover:text-stone-600'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="py-4 text-sm text-stone-600 leading-relaxed min-h-[100px]">
                                {activeTab === 'description' && (
                                    <div className="space-y-2">
                                        <p>Experience the luxury of Karur's finest textiles. Meticulously crafted for durability and aesthetics.</p>
                                        <ul className="list-disc pl-5 space-y-1 mt-2">
                                            <li>Premium finish and feel</li>
                                            <li>Ethically sourced materials</li>
                                            <li>Dimensions: {product.details.dimensions}</li>
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'fabric' && (
                                    <p>Material: <span className="font-medium text-brand-charcoal">{product.details.fabric}</span>. <br />
                                        Our fabrics are sourced directly from artisan weavers ensuring top-notch quality and authenticity.</p>
                                )}
                                {activeTab === 'care' && (
                                    <p>Care Instructions: <span className="font-medium text-brand-charcoal">{product.details.care}</span>. <br />
                                        To maintain the longevity of the fabric, avoid harsh chemicals and direct sunlight for extended periods.</p>
                                )}
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 mt-auto pt-8">
                            <div className="text-center">
                                <Truck className="w-6 h-6 mx-auto text-stone-400 mb-2" />
                                <span className="text-[10px] uppercase text-stone-500 font-bold">Fast Delivery</span>
                            </div>
                            <div className="text-center">
                                <ShieldCheck className="w-6 h-6 mx-auto text-stone-400 mb-2" />
                                <span className="text-[10px] uppercase text-stone-500 font-bold">Quality Guarantee</span>
                            </div>
                            <div className="text-center">
                                <RefreshCcw className="w-6 h-6 mx-auto text-stone-400 mb-2" />
                                <span className="text-[10px] uppercase text-stone-500 font-bold">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
