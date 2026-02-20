import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const ProductFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProductById, addProduct, updateProduct } = useProducts();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        description: '',
        category: 'Fiction',
        format: 'Hardcover',
        image: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const product = getProductById(id);
            if (product) {
                setFormData({
                    title: product.title,
                    author: product.author,
                    price: product.price,
                    description: product.description || '',
                    category: product.category || 'Fiction',
                    format: product.format || 'Hardcover',
                    image: product.image || ''
                });
            } else {
                navigate('/admin/products');
            }
        }
    }, [id, isEditMode, getProductById, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price)
        };

        if (isEditMode) {
            updateProduct(id, productData);
        } else {
            addProduct(productData);
        }
        navigate('/admin/products');
    };

    return (
        <div className="max-w-3xl mx-auto">
            <button
                onClick={() => navigate('/admin/products')}
                className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft size={18} className="mr-2" /> Back to Products
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            >
                                <option>Fiction</option>
                                <option>Non-Fiction</option>
                                <option>Sci-Fi</option>
                                <option>Romance</option>
                                <option>Thriller</option>
                                <option>Cooking</option>
                                <option>Self-Help</option>
                                <option>Biography</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <select
                            name="format"
                            value={formData.format}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        >
                            <option>Hardcover</option>
                            <option>Paperback</option>
                            <option>Audiobook</option>
                            <option>eBook</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        />
                        <p className="mt-1 text-xs text-gray-500">Leave empty for a colored placeholder.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        ></textarea>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                        >
                            <Save size={18} />
                            {isEditMode ? 'Save Changes' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormPage;
