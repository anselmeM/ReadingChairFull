import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    // Initialize from localStorage
    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem('orders');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to load orders", e);
            return [];
        }
    });

    // Save to localStorage whenever orders change
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderData) => {
        const newOrder = {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, // Random ID like ORD-1234
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Processing', // Default new order status
            ...orderData
        };
        setOrders(prevOrders => [newOrder, ...prevOrders]);
        return newOrder.id; // Return ID in case we need to redirect to confirmation
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
