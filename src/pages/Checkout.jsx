import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Truck, CreditCard, ShieldCheck } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Generate order number once
    const [orderNumber] = useState(() => Math.floor(Math.random() * 1000000));

    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-white px-4 text-center">
                <h2 className="text-3xl font-serif text-brand-charcoal mb-4">Your bag is empty</h2>
                <Link
                    to="/shop"
                    className="bg-brand-charcoal text-white px-8 py-3 uppercase text-sm tracking-widest font-medium hover:bg-stone-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Save shipping info to session storage for Payment page
        sessionStorage.setItem('checkout_shipping_info', JSON.stringify(formData));

        // Simulate brief validation
        setTimeout(() => {
            setLoading(false);
            navigate('/payment');
        }, 800);
    };

    return (
        <div className="bg-brand-white py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif text-brand-charcoal mb-8 text-center md:text-left">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Shipping Form */}
                    <div>
                        <div className="bg-white p-6 md:p-8 shadow-sm border border-stone-100 rounded-lg">
                            <h2 className="text-xl font-serif text-brand-charcoal mb-6 flex items-center">
                                <Truck className="w-5 h-5 mr-2 text-brand-maroon" /> Shipping Information
                            </h2>

                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="block w-full h-10 px-3 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="block w-full h-10 px-3 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full h-10 px-3 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="block w-full h-10 px-3 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-stone-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="block w-full h-10 px-3 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-stone-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            required
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="block w-full h-10 px-3 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="zipCode" className="block text-sm font-medium text-stone-700 mb-1">ZIP Code</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            required
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="block w-full h-10 px-3 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="block w-full h-10 px-3 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-stone-50 p-6 md:p-8 sticky top-24 rounded-lg border border-stone-200">
                            <h2 className="text-xl font-serif text-brand-charcoal mb-6 border-b border-stone-200 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start">
                                        <div className="flex gap-3">
                                            <img src={item.image} alt={item.name} className="w-12 h-16 object-cover bg-stone-200 rounded-sm" />
                                            <div>
                                                <p className="text-sm font-medium text-brand-charcoal">{item.name}</p>
                                                <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-stone-800">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 text-sm text-stone-600 mb-8 border-t border-stone-200 pt-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-brand-charcoal pt-2">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded border border-stone-200 mb-6">
                                <div className="flex items-center mb-2">
                                    <CreditCard className="w-4 h-4 mr-2 text-stone-400" />
                                    <span className="text-sm font-medium text-stone-700">Payment Method</span>
                                </div>
                                <p className="text-xs text-stone-500">Cash on Delivery (COD) is available for all orders.</p>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-charcoal text-white py-4 font-medium tracking-wide uppercase text-sm hover:bg-stone-800 transition-colors shadow-sm mb-4 rounded disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {loading ? 'Processing...' : `Proceed to Payment`}
                            </button>

                            <div className="flex items-center justify-center text-xs text-stone-400 mt-4">
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                <span>SSL Encrypted Checkout</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
