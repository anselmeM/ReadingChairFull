import React, { createContext, useContext, useState, useEffect } from 'react';
import { addItem, removeItem, updateItemQuantity, calculateTotal } from '../utils/cartUtils';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            console.error("Failed to parse cart from local storage", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (e) {
            console.error("Failed to save cart to local storage", e);
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => addItem(prevCart, product));
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => removeItem(prevCart, productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(prevCart => updateItemQuantity(prevCart, productId, quantity));
    };

    const clearCart = () => setCart([]);

    const cartTotal = calculateTotal(cart);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
