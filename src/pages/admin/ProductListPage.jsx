import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';

const ProductListPage = () => {
    const { products, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-primary focus:border-primary"
                    />
                </div>
                <Link to="/admin/products/new" className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-orange-600 transition-colors">
                    <Plus size={20} /> Add New
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Format</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-14 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                                            {product.image ? (
                                                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${product.color || 'from-gray-400 to-gray-600'}`}></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{product.title}</div>
                                            <div className="text-sm text-gray-500">{product.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">${product.price}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.format || 'Standard'}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No products found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;
