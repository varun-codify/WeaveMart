import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../utils/api';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    // For now, use localStorage for simplicity (can be upgraded to use API for logged-in users)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('home_fashion_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('home_fashion_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
}
