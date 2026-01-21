import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        // Optional: Add toast notification here
    };

    return (
        <div className="group relative animate-fade-in">
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 rounded-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        width="400"
                        height="500"
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                    />

                    {/* Loading skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse" />
                    )}

                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Quick Add Button */}
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-4 right-4 bg-white text-brand-charcoal p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-maroon hover:text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
                        aria-label="Add to cart"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-4 space-y-1">
                    <p className="text-xs text-stone-500 uppercase tracking-wider transition-colors group-hover:text-brand-maroon">
                        {product.category}
                    </p>
                    <h3 className="text-base font-serif text-brand-charcoal leading-snug group-hover:text-brand-indigo transition-colors duration-300">
                        {product.name}
                    </h3>
                    <p className="text-sm font-medium text-stone-900">₹{product.price.toLocaleString()}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
