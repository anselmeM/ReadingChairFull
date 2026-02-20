import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { products } = useProducts();

    if (cart.length === 0) {
        const bestSellers = [...products]
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 4);

        return (
            <div className="max-w-5xl mx-auto px-6 py-16 pt-28">
                <div className="text-center mb-14">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 animate-float">
                        <span className="material-symbols-outlined text-4xl text-slate-500">shopping_cart_off</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-3">Your cart is empty</h2>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">Looks like you haven't added any books yet. Here are some great picks to get you started.</p>
                    <Link to="/shop" className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(115,81,251,0.4)]">
                        Browse All Books
                    </Link>
                </div>

                {bestSellers.length > 0 && (
                    <div>
                        <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-3">
                            <span className="text-amber-400">★</span> Best Sellers
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                            {bestSellers.map(p => (
                                <Link key={p.id} to={`/product/${p.id}`} className="group block">
                                    <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 bg-slate-800 shadow-lg group-hover:shadow-primary/20 transition-all">
                                        {p.image ? (
                                            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${p.color || 'from-slate-600 to-slate-800'} flex items-end p-3`}>
                                                <span className="text-white text-xs font-bold line-clamp-2">{p.title}</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-white font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{p.title}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{p.author}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-primary font-bold text-sm">${p.price}</p>
                                        <span className="text-amber-400 text-xs">★ {p.rating}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-12">
                Your <span className="text-gradient">Collection</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="lg:w-2/3 space-y-6">
                    {cart.map(item => (
                        <div key={item.id} className="glass-card rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6 hover:border-primary/40 transition-all group">
                            {/* Product Image */}
                            <div className="w-full sm:w-24 h-48 sm:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 shadow-2xl relative">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={item.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBFryLPApjIzbXKjaEkzH56DtQuZ8zh5iQMMfeqbSFXFnowaI0D-NGmabeJs5AHtF8FuxHFWNNnOPQ02JvvceiooxSHneUafklywk26fEYkwO6-4hwqSQYL77YuwCG--PO6yfq3hCQB600BnNoBnbwrB4KOiTsALuO1rK_ObOXNx6rofcTkfNm5Ipii1AD0quMjKdXmOWRZx2zOSBQPXaYfnmFHGunWPvZVbqw90heDFMlNn6ubUX1JKlawci6SvTMhoZSqGp5HZME"}
                                    alt={item.title}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            </div>

                            {/* Product Details */}
                            <div className="flex-grow w-full text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-slate-300 text-sm">{item.author}</p>
                                    </div>
                                    <span className="text-xl font-bold text-white mt-2 sm:mt-0">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>

                                {/* Controls */}
                                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center bg-surface-highlight rounded-lg border border-white/5 p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <span className="material-symbols-outlined text-sm text-slate-300">remove</span>
                                        </button>
                                        <span className="w-8 text-center font-bold text-white text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm text-slate-300">add</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                            Digital Edition
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="glass-card rounded-2xl p-8 sticky top-24 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-300">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Estimated Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Shipping</span>
                                <span className="text-white">Calculated at checkout</span>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                                <span className="text-lg font-bold text-white">Total</span>
                                <span className="text-2xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full h-14 bg-primary text-white text-lg font-bold uppercase tracking-widest rounded-xl transition-all btn-glow flex items-center justify-center gap-2 group"
                        >
                            Checkout
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>

                        <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            <span className="text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
