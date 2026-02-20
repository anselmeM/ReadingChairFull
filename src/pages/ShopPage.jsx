import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Search, Filter, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const ShopPage = () => {
    const { products } = useProducts();
    const [searchParams] = useSearchParams();

    // Filters State
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [minRating, setMinRating] = useState(0);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [sortBy, setSortBy] = useState('featured');

    // Sync from URL
    useEffect(() => {
        const query = searchParams.get('search');
        if (query !== null) setSearchQuery(query);

        const category = searchParams.get('category');
        if (category !== null) setSelectedCategory(category);
    }, [searchParams]);

    // Derived Data
    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
    const formats = ['Hardcover', 'Paperback', 'Audiobook', 'eBook'];

    // Filtering + Sorting Logic
    const filteredProducts = useMemo(() => {
        const filtered = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
            const matchesRating = (product.rating || 0) >= minRating;
            const matchesFormat = selectedFormats.length === 0 || selectedFormats.includes(product.format);
            return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesFormat;
        });

        // Apply sorting
        return [...filtered].sort((a, b) => {
            if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
            if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
            if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            return 0; // featured – original order
        });
    }, [products, searchQuery, selectedCategory, priceRange, minRating, selectedFormats, sortBy]);

    const handleFormatToggle = (format) => {
        setSelectedFormats(prev =>
            prev.includes(format)
                ? prev.filter(f => f !== format)
                : [...prev, format]
        );
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setPriceRange({ min: 0, max: 100 });
        setMinRating(0);
        setSelectedFormats([]);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Shop</h1>
                    <button
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium"
                    >
                        <Filter size={18} /> Filters
                    </button>
                </div>

                {/* Sidebar Filters */}
                <aside className={`lg:w-1/4 flex-shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24 space-y-8">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                                Filters
                                <button onClick={clearFilters} className="text-xs text-orange-600 hover:text-orange-700">Clear All</button>
                            </h3>

                            {/* Search */}
                            <div className="relative mb-6">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Categories</h4>
                            <ul className="space-y-2">
                                {categories.map(category => (
                                    <li key={category}>
                                        <button
                                            onClick={() => setSelectedCategory(category)}
                                            className={`text-sm w-full text-left px-2 py-1.5 rounded-md transition-colors ${selectedCategory === category
                                                ? 'bg-orange-50 text-orange-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Price Range</h4>
                            <div className="flex items-center gap-2">
                                <div className="relative group">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                                        className="w-full pl-6 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                                <span className="text-gray-400">-</span>
                                <div className="relative group">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 100 })}
                                        className="w-full pl-6 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Format */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Format</h4>
                            <div className="space-y-2">
                                {formats.map(format => (
                                    <label key={format} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedFormats.includes(format)}
                                            onChange={() => handleFormatToggle(format)}
                                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                        />
                                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{format}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Rating</h4>
                            <div className="space-y-2">
                                {[4, 3, 2, 1].map(rating => (
                                    <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === rating}
                                            onChange={() => setMinRating(rating)}
                                            className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                        />
                                        <div className="flex items-center text-yellow-400 text-sm">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`material-symbols-outlined text-[16px] ${i < rating ? 'font-variation-FILL' : 'text-gray-300'}`}>star</span>
                                            ))}
                                            <span className="ml-2 text-gray-500 font-medium text-xs">& Up</span>
                                        </div>
                                    </label>
                                ))}
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="rating"
                                        checked={minRating === 0}
                                        onChange={() => setMinRating(0)}
                                        className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                    />
                                    <span className="text-sm text-gray-600">Any Rating</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:w-3/4 flex-grow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            {selectedCategory === 'All' ? 'All Books' : selectedCategory}
                            <span className="ml-2 text-sm font-normal text-gray-500">({filteredProducts.length} results)</span>
                        </h2>
                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 font-medium focus:ring-orange-500 focus:border-orange-500 cursor-pointer hover:text-gray-900"
                        >
                            <option value="featured">Sort by: Featured</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>
                    </div>

                    {/* Active Filter Chips */}
                    {(searchQuery || selectedCategory !== 'All' || minRating > 0 || selectedFormats.length > 0 || priceRange.min > 0 || priceRange.max < 100) && (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {searchQuery && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-xs font-medium">
                                    Search: "{searchQuery}"
                                    <button onClick={() => setSearchQuery('')} className="hover:text-orange-900 ml-0.5">✕</button>
                                </span>
                            )}
                            {selectedCategory !== 'All' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-xs font-medium">
                                    Category: {selectedCategory}
                                    <button onClick={() => setSelectedCategory('All')} className="hover:text-orange-900 ml-0.5">✕</button>
                                </span>
                            )}
                            {minRating > 0 && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-xs font-medium">
                                    Rating: {minRating}★ & up
                                    <button onClick={() => setMinRating(0)} className="hover:text-orange-900 ml-0.5">✕</button>
                                </span>
                            )}
                            {selectedFormats.map(fmt => (
                                <span key={fmt} className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-xs font-medium">
                                    Format: {fmt}
                                    <button onClick={() => handleFormatToggle(fmt)} className="hover:text-orange-900 ml-0.5">✕</button>
                                </span>
                            ))}
                            {(priceRange.min > 0 || priceRange.max < 100) && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-xs font-medium">
                                    Price: ${priceRange.min}–${priceRange.max}
                                    <button onClick={() => setPriceRange({ min: 0, max: 100 })} className="hover:text-orange-900 ml-0.5">✕</button>
                                </span>
                            )}
                            <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-700 underline">Clear all</button>
                        </div>
                    )}

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                <Search size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No matches found</h3>
                            <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search query.</p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
export default ShopPage;
