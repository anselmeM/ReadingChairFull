import React, { useState } from 'react';
import { User, Package, Heart, LogOut, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { wishlist } = useWishlist();
    const { orders } = useOrders();

    const user = {
        name: "Alex Reader",
        email: "alex@example.com",
        joined: "January 2024",
        membership: "Gold Member"
    };

    const tabs = [
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'orders', icon: Package, label: 'Orders', count: orders.length },
        { id: 'wishlist', icon: Heart, label: 'Wishlist', count: wishlist.length },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="glass-card rounded-2xl p-8 border-white/10">
                        <h2 className="text-2xl font-serif font-bold text-white mb-8">My Profile</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                                    <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                        <Star size={12} /> {user.membership}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                    <p className="text-white font-medium">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Member Since</label>
                                    <p className="text-white font-medium">{user.joined}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <button className="text-sm text-red-400 hover:text-red-300 font-medium flex items-center gap-2 transition-colors">
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'orders':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-white mb-6">Order History</h2>
                        {orders.length === 0 ? (
                            <div className="glass-card rounded-2xl border-white/10 p-16 text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package size={32} className="text-slate-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white">No orders yet</h3>
                                <p className="text-slate-400 mt-2 mb-6">You haven't made any purchases yet.</p>
                                <Link to="/shop" className="inline-block px-6 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary/80 transition-colors">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="glass-card rounded-2xl border-white/10 p-6">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
                                        <div>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Order {order.id}</span>
                                            <p className="text-sm text-slate-400 mt-0.5">{order.date}</p>
                                        </div>
                                        <span className={`self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered'
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-primary/10 text-primary'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="border-t border-b border-white/5 py-4 my-4">
                                        <ul className="space-y-1">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-white">${order.total.toFixed(2)}</span>
                                        <button className="text-primary hover:text-primary/70 text-sm font-medium transition-colors">View Invoice</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                );

            case 'wishlist':
                return (
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-white mb-6">My Wishlist</h2>
                        {wishlist.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlist.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="glass-card rounded-2xl border-white/10 p-16 text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart size={32} className="text-slate-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Your wishlist is empty</h3>
                                <p className="text-slate-400 mt-2 mb-6">Save items you love and find them here.</p>
                                <Link to="/shop" className="inline-block px-6 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary/80 transition-colors">
                                    Browse Books
                                </Link>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-serif font-bold text-white">My Library</h1>
                <p className="text-slate-400 mt-2">Manage your profile, orders, and saved books.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="md:w-56 flex-shrink-0">
                    <nav className="glass-card rounded-2xl border-white/10 p-2 flex md:flex-col gap-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === tab.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <tab.icon size={18} />
                                <span className="flex-1 text-left">{tab.label}</span>
                                {tab.count > 0 && (
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'}`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
