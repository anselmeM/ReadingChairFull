import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Plus, LogOut, Home } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold font-serif tracking-wider">LUMINA <span className="text-primary text-sm block font-sans font-normal tracking-normal opacity-70">Admin Console</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin') ? 'bg-primary text-white font-medium shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/products"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/products') ? 'bg-primary text-white font-medium shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Package size={20} />
                        Products
                    </Link>
                    <Link
                        to="/admin/products/new"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/products/new') ? 'bg-primary text-white font-medium shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Plus size={20} />
                        Add Product
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
                        <Home size={20} />
                        Back to Shop
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {location.pathname === '/admin' && 'Dashboard'}
                        {location.pathname === '/admin/products' && 'Product Management'}
                        {location.pathname === '/admin/products/new' && 'Add New Product'}
                        {location.pathname.includes('edit') && 'Edit Product'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Admin User</span>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            A
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
