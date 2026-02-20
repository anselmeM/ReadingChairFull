import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-md flex flex-col bg-[#0f0b1a] border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={20} className="text-primary" />
                        <h2 className="text-white font-bold text-lg">Your Cart</h2>
                        {cart.length > 0 && (
                            <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                {cart.reduce((a, i) => a + i.quantity, 0)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cart Body */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5">
                                <ShoppingBag size={32} className="text-slate-500" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Your cart is empty</h3>
                            <p className="text-slate-400 text-sm mb-6">Add books to get started.</p>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/80 transition-colors"
                            >
                                Browse Books
                            </button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group">
                                {/* Image */}
                                <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${item.color || 'from-primary/50 to-purple-900'}`} />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold text-sm line-clamp-2 leading-tight">{item.title}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{item.author}</p>
                                    {item.format && (
                                        <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1">
                                            {item.format}
                                        </span>
                                    )}

                                    <div className="flex items-center justify-between mt-3">
                                        {/* Qty stepper */}
                                        <div className="flex items-center gap-1 bg-black/30 rounded-lg p-0.5 border border-white/5">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors disabled:opacity-30"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-6 text-center text-white text-xs font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-white font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-slate-500 hover:text-red-400 transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer – Summary + CTA */}
                {cart.length > 0 && (
                    <div className="px-5 py-5 border-t border-white/10 flex-shrink-0 space-y-4">
                        {/* Totals */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-slate-400 text-sm">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-sm">
                                <span>Shipping</span>
                                <span className="text-white">Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                                <span>Total</span>
                                <span className="text-primary">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* CTAs */}
                        <Link
                            to="/checkout"
                            onClick={onClose}
                            className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                            Checkout
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            to="/cart"
                            onClick={onClose}
                            className="w-full h-10 text-slate-400 text-sm font-medium flex items-center justify-center hover:text-white transition-colors"
                        >
                            View full cart
                        </Link>

                        {/* Trust badge */}
                        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                            <span>🔒</span>
                            <span>Secure checkout</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
