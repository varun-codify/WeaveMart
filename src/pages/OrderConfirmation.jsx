import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderNumber, email } = location.state || { orderNumber: '—', email: 'your email' };

    return (
        <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center bg-stone-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-brand-charcoal mb-2">Order Confirmed!</h2>
                <p className="text-stone-600 mb-6">
                    Thank you for your purchase. We've sent a confirmation email to <span className="font-medium text-brand-charcoal">{email}</span>.
                </p>
                <div className="bg-stone-50 p-4 rounded text-left mb-8 text-sm text-stone-600">
                    <p className="mb-1"><span className="font-medium">Order Number:</span> #{orderNumber}</p>
                    <p><span className="font-medium">Estimated Delivery:</span> 5-7 Business Days</p>
                </div>
                <Link
                    to="/"
                    className="block w-full bg-brand-charcoal text-white px-8 py-3 uppercase text-sm tracking-widest font-medium hover:bg-stone-800 transition-colors rounded"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
