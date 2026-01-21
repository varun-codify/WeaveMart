import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';
import QuantityControl from '../components/QuantityControl';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-white px-4 text-center">
                <h2 className="text-3xl font-serif text-brand-charcoal mb-4">Your bag is empty</h2>
                <p className="text-stone-500 mb-8 max-w-sm mx-auto">
                    Sign in to see if you have any saved items. Or continue shopping to add items to your bag.
                </p>
                <Link
                    to="/shop"
                    className="bg-brand-charcoal text-white px-8 py-3 uppercase text-sm tracking-widest font-medium hover:bg-stone-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-brand-white py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif text-brand-charcoal mb-12">Shopping Bag ({cart.length})</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-stone-100">
                                {/* Image */}
                                <div className="w-full sm:w-32 aspect-[3/4] bg-stone-100 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-serif text-brand-charcoal pr-8">{item.name}</h3>
                                            <p className="text-sm font-bold text-stone-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <p className="text-sm text-stone-500 mb-1">{item.category}</p>
                                        <p className="text-sm text-stone-500">Unit Price: ₹{item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex justify-between items-end mt-4 sm:mt-0">
                                        <div className="scale-90 origin-bottom-left">
                                            <QuantityControl
                                                quantity={item.quantity}
                                                setQuantity={(q) => updateQuantity(item.id, q)}
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-stone-400 hover:text-brand-maroon transition-colors flex items-center text-sm"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-sm text-stone-500 hover:text-brand-charcoal underline"
                        >
                            Clear Shopping Bag
                        </button>
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-stone-50 p-6 md:p-8 sticky top-24">
                            <h3 className="text-lg font-serif text-brand-charcoal mb-6 border-b border-stone-200 pb-4">Order Summary</h3>

                            <div className="space-y-4 text-sm text-stone-600 mb-8">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping Estimated</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (GST Included)</span>
                                    <span>Included</span>
                                </div>
                            </div>

                            <div className="border-t border-brand-charcoal/10 pt-6 mb-8">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-base font-medium text-brand-charcoal">Total</span>
                                    <span className="text-2xl font-serif text-brand-charcoal">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-stone-400 mt-2">Prices include all applicable taxes.</p>
                            </div>

                            <Link to="/checkout" className="block w-full bg-brand-charcoal text-white py-4 font-medium tracking-wide uppercase text-sm hover:bg-stone-800 transition-colors shadow-sm mb-4 text-center">
                                Proceed to Checkout
                            </Link>

                            <div className="text-center">
                                <Link to="/shop" className="text-sm text-stone-500 hover:text-brand-charcoal flex items-center justify-center">
                                    <ArrowLeft className="w-3 h-3 mr-1" /> Continue Shopping
                                </Link>
                            </div>

                            <div className="mt-8 pt-8 border-t border-stone-200">
                                <div className="flex items-center justify-center text-xs text-stone-400">
                                    <ShieldCheck className="w-4 h-4 mr-2" />
                                    <span>Secure Checkout Encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
