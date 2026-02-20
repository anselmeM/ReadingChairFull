import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="group flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden">
            <Link to={`/product/${product.id}`} className="block relative aspect-[2/3] overflow-hidden bg-gray-100">
                {/* Gradient Cover Fallback */}
                <div className={`w-full h-full bg-gradient-to-br ${product.color || 'from-gray-400 to-gray-600'} flex items-center justify-center p-6 text-center`}>
                    <div>
                        <h3 className="text-white font-serif text-xl font-bold leading-tight drop-shadow-md">{product.title}</h3>
                        <p className="text-white/80 text-sm mt-2 font-medium drop-shadow-sm">{product.author}</p>
                    </div>
                </div>
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-600 transition">{product.title}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-4">{product.author}</p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition transform active:scale-95"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
