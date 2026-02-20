import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart } = useCart();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-4 group">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-900 text-white">
                                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                            </div>
                            <span className="font-serif text-xl font-bold tracking-tight text-white">LUMINA</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-medium text-slate-300 transition-colors hover:text-white" to="/shop">Shop</Link>
                        <Link className="text-sm font-medium text-slate-300 transition-colors hover:text-white" to="/audiobooks">Audiobooks</Link>
                        <Link className="text-sm font-medium text-slate-300 transition-colors hover:text-white" to="/discover">Discover</Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <button className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </button>

                        {/* Cart Button — opens Drawer */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors relative"
                            aria-label="Open cart"
                        >
                            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-background-dark">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </button>

                        <div className="hidden md:block h-8 w-px bg-white/10 mx-1" />
                        <Link
                            to="/dashboard"
                            className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                            <span className="material-symbols-outlined text-[18px]">account_circle</span>
                            <span>My Library</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="material-symbols-outlined text-[24px]">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-white/5 bg-background-dark/95 backdrop-blur-xl absolute w-full left-0 top-16 shadow-2xl">
                        <nav className="flex flex-col p-6 gap-4">
                            <Link className="text-lg font-medium text-slate-300 hover:text-white py-2 border-b border-white/5" to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                            <Link className="text-lg font-medium text-slate-300 hover:text-white py-2 border-b border-white/5" to="/audiobooks" onClick={() => setIsMenuOpen(false)}>Audiobooks</Link>
                            <Link className="text-lg font-medium text-slate-300 hover:text-white py-2 border-b border-white/5" to="/discover" onClick={() => setIsMenuOpen(false)}>Discover</Link>
                            <Link className="flex items-center gap-2 text-lg font-medium text-slate-300 hover:text-white py-2 mt-2" to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                <span className="material-symbols-outlined">account_circle</span>
                                <span>My Library</span>
                            </Link>
                        </nav>
                    </div>
                )}
            </header>

            {/* Cart Drawer — rendered outside header so it can cover full page */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
