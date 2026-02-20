import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { Package, ShoppingCart, Plus, BookOpen } from 'lucide-react';

const AdminDashboardPage = () => {
    const { products } = useProducts();
    const { orders } = useOrders();

    const stats = [
        { label: 'Total Products', value: products.length, icon: BookOpen, color: 'bg-blue-50 text-blue-600', link: '/admin/products' },
        { label: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'bg-green-50 text-green-600', link: '/admin/orders' },
        { label: 'Categories', value: new Set(products.map(p => p.category)).size, icon: Package, color: 'bg-purple-50 text-purple-600', link: '/admin/products' },
    ];

    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map(stat => (
                    <Link key={stat.label} to={stat.link} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <p className="text-4xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link to="/admin/products/new" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                        <Plus size={18} /> Add New Product
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        <Package size={18} /> Manage Products
                    </Link>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
                    <Link to="/admin/products" className="text-sm text-primary font-medium hover:text-orange-600">View All</Link>
                </div>
                <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                        {products.slice(0, 5).map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-10 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                                            {product.image ? (
                                                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${product.color || 'from-gray-400 to-gray-600'}`}></div>
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-900 text-sm">{product.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">${product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
