import React from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantityControl = ({ quantity, setQuantity, max = 10 }) => {
    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increase = () => {
        if (quantity < max) setQuantity(quantity + 1);
    };

    return (
        <div className="flex items-center border border-stone-300 rounded-none w-max">
            <button
                onClick={decrease}
                className="p-3 hover:bg-stone-50 transition-colors text-stone-600 disabled:opacity-50"
                disabled={quantity <= 1}
            >
                <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium text-brand-charcoal">{quantity}</span>
            <button
                onClick={increase}
                className="p-3 hover:bg-stone-50 transition-colors text-stone-600 disabled:opacity-50"
                disabled={quantity >= max}
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
};

export default QuantityControl;
