import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../utils/api';
import { CreditCard, Truck, Smartphone, ShieldCheck, Lock } from 'lucide-react';

// Stripe Imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe (Replace with your actual Publishable Key)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const cardStyle = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: 'Inter, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};

const PaymentForm = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [shippingInfo, setShippingInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedInfo = sessionStorage.getItem('checkout_shipping_info');
        if (storedInfo) {
            setShippingInfo(JSON.parse(storedInfo));
        } else {
            navigate('/checkout');
        }
    }, [navigate]);

    if (!shippingInfo || cart.length === 0) return null;

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (selectedMethod === 'card') {
            // Stripe Payment Flow with proper verification
            if (!stripe || !elements) {
                setError('Stripe has not loaded yet. Please try again.');
                setLoading(false);
                return;
            }

            try {
                // 1. Generate order number first
                const orderNumber = Math.floor(100000 + Math.random() * 900000);

                // 2. Create Payment Intent on Backend with cart items (NOT amount)
                // Server will calculate the total from product prices
                const response = await fetch('http://localhost:4242/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        items: cart.map(item => ({
                            id: item.id,
                            quantity: item.quantity
                        })),
                        orderData: {
                            orderNumber,
                            customerEmail: shippingInfo.email
                        }
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Failed to create payment intent');
                }

                const { clientSecret, paymentIntentId, amount, error: backendError } = await response.json();

                if (backendError) {
                    throw new Error(backendError.message);
                }

                // 3. Confirm Card Payment with Stripe
                const cardElement = elements.getElement(CardElement);
                const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
                            email: shippingInfo.email,
                            phone: shippingInfo.phone,
                            address: {
                                line1: shippingInfo.address,
                                city: shippingInfo.city,
                                state: shippingInfo.state,
                                postal_code: shippingInfo.zipCode,
                                country: 'IN',
                            },
                        },
                    },
                });

                if (stripeError) {
                    throw new Error(stripeError.message);
                }

                // 4. Only create order if payment succeeded
                if (paymentIntent.status === 'succeeded') {
                    await completeOrder(orderNumber, paymentIntentId, 'card', 'completed');
                } else {
                    throw new Error('Payment was not successful');
                }

            } catch (err) {
                console.error("Payment failed:", err);
                setError(err.message || "Payment failed. Please try again.");
                setLoading(false);
            }

        } else if (selectedMethod === 'upi' || selectedMethod === 'cod') {
            // Non-Stripe payment methods (UPI/COD)
            try {
                const orderNumber = Math.floor(100000 + Math.random() * 900000);
                const mockTransactionId = `${selectedMethod.toUpperCase()}-${Date.now()}`;

                // Simulate processing delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                await completeOrder(orderNumber, mockTransactionId, selectedMethod, selectedMethod === 'cod' ? 'pending' : 'completed');
            } catch (err) {
                console.error("Order creation failed:", err);
                setError("Failed to create order. Please try again.");
                setLoading(false);
            }
        }
    };

    const completeOrder = async (orderNumber, transactionId, paymentMethod, paymentStatus) => {
        const order = {
            orderNumber,
            customerInfo: shippingInfo,
            items: cart.map(item => ({
                product: item._id || item.id,
                productSnapshot: {
                    name: item.name,
                    price: item.price,
                    image: item.image
                },
                quantity: item.quantity,
                price: item.price
            })),
            total: cartTotal,
            paymentMethod: paymentMethod,
            paymentStatus: paymentStatus,
            status: paymentStatus === 'completed' ? 'confirmed' : 'pending',
            metadata: {
                paymentIntentId: paymentMethod === 'card' ? transactionId : null,
                transactionId: transactionId
            }
        };

        try {
            // Save order to backend
            const createdOrder = await ordersAPI.create(order);
            console.log('✅ Order created:', createdOrder);

            // Clear cart and redirect on success
            clearCart();
            sessionStorage.removeItem('checkout_shipping_info');
            setLoading(false);

            navigate('/order-confirmation', {
                state: {
                    orderNumber,
                    email: shippingInfo.email,
                    paymentStatus
                }
            });
        } catch (error) {
            console.error('❌ Failed to save order:', error);

            // Fallback: Save to localStorage if API fails
            const fallbackOrder = {
                ...order,
                date: new Date().toISOString()
            };
            const existingOrders = JSON.parse(localStorage.getItem('home_fashion_orders') || '[]');
            existingOrders.push(fallbackOrder);
            localStorage.setItem('home_fashion_orders', JSON.stringify(existingOrders));

            clearCart();
            sessionStorage.removeItem('checkout_shipping_info');
            setLoading(false);

            navigate('/order-confirmation', {
                state: { orderNumber, email: shippingInfo.email }
            });
        }
    };

    return (
        <div className="bg-brand-white py-12 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif text-brand-charcoal mb-8 text-center md:text-left">Payment</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Payment Methods */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                            <h2 className="text-xl font-medium text-brand-charcoal mb-4 flex items-center">
                                <Lock className="w-5 h-5 mr-2 text-brand-maroon" /> Secure Payment
                            </h2>

                            <form id="payment-form" onSubmit={handlePayment} className="space-y-4">

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm mb-4">
                                        {error}
                                    </div>
                                )}

                                {/* UPI Option */}
                                <div
                                    onClick={() => setSelectedMethod('upi')}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedMethod === 'upi' ? 'border-brand-maroon bg-stone-50 ring-1 ring-brand-maroon' : 'border-stone-200 hover:border-stone-300'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={selectedMethod === 'upi'}
                                            onChange={() => setSelectedMethod('upi')}
                                            className="text-brand-maroon focus:ring-brand-maroon"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-brand-charcoal flex items-center gap-2">
                                                <Smartphone className="w-5 h-5 text-stone-500" /> UPI
                                            </span>
                                            <p className="text-xs text-stone-500 mt-1">Google Pay, PhonePe, Paytm, BHIM</p>
                                        </div>
                                    </div>
                                    {selectedMethod === 'upi' && (
                                        <div className="mt-4 pl-7">
                                            <input
                                                type="text"
                                                placeholder="Enter UPI ID"
                                                className="w-full border-stone-300 rounded-md text-sm focus:ring-brand-maroon focus:border-brand-maroon"
                                                required={selectedMethod === 'upi'}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Card Option (Stripe) */}
                                <div
                                    onClick={() => setSelectedMethod('card')}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedMethod === 'card' ? 'border-brand-maroon bg-stone-50 ring-1 ring-brand-maroon' : 'border-stone-200 hover:border-stone-300'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={selectedMethod === 'card'}
                                            onChange={() => setSelectedMethod('card')}
                                            className="text-brand-maroon focus:ring-brand-maroon"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-brand-charcoal flex items-center gap-2">
                                                <CreditCard className="w-5 h-5 text-stone-500" /> Credit / Debit Card
                                            </span>
                                            <p className="text-xs text-stone-500 mt-1">Pay securely via Stripe</p>
                                        </div>
                                    </div>
                                    {selectedMethod === 'card' && (
                                        <div className="mt-4 pl-7 pr-2">
                                            <div className="p-3 border border-stone-300 rounded-md bg-white">
                                                <CardElement options={cardStyle} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* COD Option */}
                                <div
                                    onClick={() => setSelectedMethod('cod')}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedMethod === 'cod' ? 'border-brand-maroon bg-stone-50 ring-1 ring-brand-maroon' : 'border-stone-200 hover:border-stone-300'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={selectedMethod === 'cod'}
                                            onChange={() => setSelectedMethod('cod')}
                                            className="text-brand-maroon focus:ring-brand-maroon"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-brand-charcoal flex items-center gap-2">
                                                <Truck className="w-5 h-5 text-stone-500" /> Cash on Delivery
                                            </span>
                                            <p className="text-xs text-stone-500 mt-1">Pay with cash upon delivery.</p>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 sticky top-24">
                            <h3 className="text-lg font-serif text-brand-charcoal mb-4 border-b border-stone-200 pb-2">Order Summary</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-stone-600">
                                    <span>Items ({cart.length})</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-stone-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-brand-charcoal pt-3 border-t border-stone-200">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="payment-form"
                                disabled={loading || !stripe}
                                className="w-full bg-brand-charcoal text-white py-3 rounded uppercase text-sm font-medium tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-70 flex justify-center items-center"
                            >
                                {loading ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString()}`}
                            </button>

                            <div className="mt-6 flex flex-col gap-2 text-xs text-stone-400 text-center">
                                <p className="flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Secure SSL Encrypted Transaction
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Main Export wrapping with Elements
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default Payment;
