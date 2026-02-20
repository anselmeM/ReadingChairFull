import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const CheckoutPage = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { addOrder } = useOrders(); // Use Order Context
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = cartTotal;
    const platformFee = 1.50;
    const discount = 8.90;
    const totalDue = Math.max(0, subtotal + platformFee - discount);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            // Create Order
            const newOrderId = addOrder({
                total: parseFloat(totalDue.toFixed(2)),
                items: cart.map(item => item.title), // Store titles for display
                itemDetails: cart // Store full details just in case
            });

            setIsProcessing(false);
            clearCart();
            alert(`Order placed successfully! Order ID: ${newOrderId}`);
            navigate('/dashboard'); // Redirect to dashboard to see order
        }, 2000);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen overflow-x-hidden">
            {/* Progress Glow Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-primary/20 z-50">
                <div className="h-full bg-primary progress-glow" style={{ width: '85%' }}></div>
            </div>

            <div className="layout-container flex flex-col min-h-screen">
                {/* Header */}
                <header className="flex items-center justify-between px-8 lg:px-20 py-6 border-b border-white/5 bg-background-dark/50 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-3">
                        <div className="text-primary">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Lumina</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link className="text-sm font-medium text-slate-400 hover:text-primary transition-colors flex items-center gap-2" to="/">
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Return to Library
                        </Link>
                        <div className="h-8 w-[1px] bg-white/10"></div>
                        <div className="flex gap-3">
                            <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-primary/20 transition-all">
                                <span className="material-symbols-outlined text-lg">notifications</span>
                            </button>
                            <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-primary/20 transition-all">
                                <span className="material-symbols-outlined text-lg">account_circle</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-10 gap-12">
                    {/* Left Side: Order Summary */}
                    <section className="flex-1 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Order Summary</h2>
                            <p className="text-slate-400">Review your cinematic collection before finalizing.</p>
                        </div>

                        {/* Product List */}
                        <div className="space-y-4">
                            {cart.length === 0 ? (
                                <p className="text-slate-400">Your cart is empty.</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="glass-card rounded-xl p-5 flex items-center gap-6 hover:border-primary/40 transition-all group">
                                        <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 shadow-2xl transition-transform group-hover:scale-105">
                                            <img
                                                className="w-full h-full object-cover"
                                                alt={item.title}
                                                src={item.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBFryLPApjIzbXKjaEkzH56DtQuZ8zh5iQMMfeqbSFXFnowaI0D-NGmabeJs5AHtF8FuxHFWNNnOPQ02JvvceiooxSHneUafklywk26fEYkwO6-4hwqSQYL77YuwCG--PO6yfq3hCQB600BnNoBnbwrB4KOiTsALuO1rK_ObOXNx6rofcTkfNm5Ipii1AD0quMjKdXmOWRZx2zOSBQPXaYfnmFHGunWPvZVbqw90heDFMlNn6ubUX1JKlawci6SvTMhoZSqGp5HZME"}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                                                    <p className="text-slate-400 text-sm">{item.author}</p>
                                                </div>
                                                <span className="text-white font-bold">${item.price}</span>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 text-xs">
                                                    <span className="text-primary font-bold">Qty {item.quantity}</span>
                                                    <span className="text-slate-500">|</span>
                                                    <span className="text-slate-300">Spatial Audio</span>
                                                </div>
                                                <button className="text-slate-500 hover:text-red-400 transition-colors">
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pricing Calculation */}
                        <div className="pt-6 border-t border-white/5 space-y-3">
                            <div className="flex justify-between text-slate-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Platform Fee</span>
                                <span>${platformFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Discount <span className="text-primary text-xs font-bold ml-2">LUMINA20</span></span>
                                <span className="text-primary">-${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-white pt-4">
                                <span>Total Due</span>
                                <span className="text-primary">${totalDue.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Security Trust */}
                        <div className="flex items-center gap-4 py-4 px-6 glass-card rounded-xl bg-primary/5 border-primary/20">
                            <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Your transaction is secured with military-grade 256-bit encryption. <br />
                                Digital assets are instantly added to your <span className="text-white font-semibold underline underline-offset-4 decoration-primary">LUMINA Vault</span>.
                            </p>
                        </div>
                    </section>

                    {/* Right Side: Checkout Form */}
                    <section className="w-full lg:w-[500px] space-y-8">
                        <div className="glass-card rounded-2xl p-8 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>

                            {/* Express Checkout */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button className="flex items-center justify-center gap-2 bg-white text-black h-12 rounded-lg font-bold hover:bg-slate-200 transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05,20.28c-0.96,0.95-2.05,1.72-3.21,2.27c-1.37,0.66-2.87,1.01-4.4,1.01c-1.46,0-2.89-0.31-4.2-0.92 c-1.35-0.62-2.54-1.51-3.48-2.61C0.58,18.73,0,16.9,0,14.88c0-2.45,0.73-4.57,2.16-6.28C3.59,6.89,5.55,5.91,8.02,5.91 c0.97,0,1.96,0.16,2.94,0.48c0.88,0.28,1.67,0.67,2.34,1.15C13.88,7.96,14.45,8.37,14.99,8.78c0.55-0.42,1.14-0.84,1.75-1.25 c0.67-0.45,1.44-0.81,2.29-1.09c0.91-0.3,1.86-0.45,2.8-0.45c2.47,0,4.46,0.98,5.9,2.91C29.2,10.68,30,12.8,30,15.22 c0,2.1-0.58,4.01-1.72,5.65c-1.12,1.61-2.68,2.78-4.6,3.48c-1.89,0.7-3.92,1.04-6.01,1.04C17.44,25.39,17.24,25.39,17.05,25.38V20.28z M15,4.5c0-1.18,0.42-2.18,1.25-3C17.08,0.67,18.17,0.17,19.5,0c0.04,1.16-0.37,2.16-1.21,2.99 C17.46,3.81,16.37,4.31,15,4.5z"></path></svg>
                                    Pay
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-slate-900 border border-white/10 text-white h-12 rounded-lg font-bold hover:bg-slate-800 transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.2-2.04 4.32-1.28 1.28-3.32 2.68-6.88 2.68-5.56 0-10.04-4.52-10.04-10.12s4.48-10.12 10.04-10.12c3.04 0 5.28 1.2 6.96 2.8l2.36-2.36C18.68 1.24 15.88 0 12.48 0 6.48 0 1.52 4.96 1.52 11s4.96 11 10.96 11c3.24 0 5.72-1.08 7.64-3.08 2-2 2.64-4.8 2.64-7.16 0-.48-.04-1-.12-1.48h-10.16z"></path></svg>
                                    Pay
                                </button>
                            </div>

                            <div className="relative flex py-5 items-center">
                                <div className="flex-grow border-t border-white/10"></div>
                                <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-slate-500">Or use card</span>
                                <div className="flex-grow border-t border-white/10"></div>
                            </div>

                            {/* Card Form */}
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <input className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 text-white focus:ring-primary focus:border-primary input-focus transition-all" placeholder="alex@lumina.io" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Card Number</label>
                                    <div className="relative">
                                        <input className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 text-white focus:ring-primary focus:border-primary input-focus transition-all pl-12" placeholder="0000 0000 0000 0000" type="text" />
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">credit_card</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expiry</label>
                                        <input className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 text-white focus:ring-primary focus:border-primary input-focus transition-all" placeholder="MM/YY" type="text" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CVV</label>
                                        <div className="relative">
                                            <input className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 text-white focus:ring-primary focus:border-primary input-focus transition-all" placeholder="***" type="password" />
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">help</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 py-2">
                                    <input className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" type="checkbox" defaultChecked />
                                    <span className="text-sm text-slate-400">Save for future cinematic purchases</span>
                                </div>

                                {/* Submit Button */}
                                <button className="w-full h-16 bg-primary text-white text-lg font-black uppercase tracking-widest rounded-xl transition-all btn-glow mt-4 flex items-center justify-center gap-3" type="submit">
                                    {isProcessing ? 'Processing...' : 'Place Order'}
                                    <span className="material-symbols-outlined font-bold">arrow_forward</span>
                                </button>
                            </form>

                            <p className="text-center text-[10px] text-slate-500 mt-6 leading-relaxed uppercase tracking-tighter">
                                By clicking "Place Order" you agree to Lumina's <a className="text-white hover:text-primary underline" href="#">Terms of Cinematic Distribution</a> and <a className="text-white hover:text-primary underline" href="#">Privacy Policy</a>.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="space-y-2">
                                <span className="material-symbols-outlined text-primary">download</span>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Instant Access</p>
                            </div>
                            <div className="space-y-2">
                                <span className="material-symbols-outlined text-primary">high_quality</span>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Lossless Audio</p>
                            </div>
                            <div className="space-y-2">
                                <span className="material-symbols-outlined text-primary">all_inclusive</span>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Lifetime Vault</p>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="mt-auto border-t border-white/5 py-10">
                    <div className="max-w-[1400px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">SSL Encrypted Checkout</span>
                        </div>
                        <div className="flex gap-8 text-[11px] text-slate-500 uppercase font-bold tracking-widest">
                            <a className="hover:text-primary transition-colors" href="#">Support</a>
                            <a className="hover:text-primary transition-colors" href="#">Licensing</a>
                            <a className="hover:text-primary transition-colors" href="#">Community</a>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium">© 2024 LUMINA CINEMATIC AUDIO. ALL RIGHTS RESERVED.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CheckoutPage;
