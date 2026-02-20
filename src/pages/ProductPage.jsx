import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, Zap } from 'lucide-react';

// ─── Sub-components ──────────────────────────────────────────────────────────

const ReviewForm = ({ productId }) => {
    const { addReview } = useProducts();
    const [rating, setRating] = React.useState(5);
    const [user, setUser] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.trim() || !comment.trim()) return;
        addReview(productId, { user, rating, comment, date: 'Just now' });
        setUser(''); setComment(''); setRating(5);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star} type="button"
                            onClick={() => setRating(star)}
                            className={`text-2xl transition-colors ${rating >= star ? 'text-amber-400' : 'text-slate-600 hover:text-amber-400/50'}`}
                        >★</button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                <input
                    type="text" value={user} onChange={e => setUser(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:border-primary focus:ring-0 outline-none"
                    required
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Review</label>
                <textarea
                    value={comment} onChange={e => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:border-primary focus:ring-0 outline-none h-28 resize-none"
                    required
                />
            </div>
            {submitted && (
                <p className="text-green-400 text-sm font-medium">✓ Review submitted!</p>
            )}
            <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/80 transition-colors"
            >
                Submit Review
            </button>
        </form>
    );
};

const ReviewCard = ({ review }) => (
    <div className="border border-white/5 bg-white/5 rounded-xl p-6">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.user.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm">{review.user}</h4>
                    <div className="flex text-amber-400 text-xs mt-0.5">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                        ))}
                    </div>
                </div>
            </div>
            <span className="text-xs text-slate-500 flex-shrink-0">{review.date}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{review.comment}</p>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const ProductPage = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    const [selectedFormat, setSelectedFormat] = React.useState('Physical');
    const [cartAdded, setCartAdded] = React.useState(false);

    const product = products.find(p => p.id === parseInt(id));

    // ── Safe fallback data so page never crashes ────────────────────────────
    const title = product?.title ?? 'Unknown Title';
    const author = product?.author ?? 'Unknown Author';
    const basePrice = product?.price ?? 24.99;
    const description = product?.description ?? 'No description available.';
    const category = product?.category ?? 'Books';
    const rating = product?.rating ?? 4.5;
    const reviewCount = product?.reviews ?? 0;
    const coverImage = product?.image ?? null;
    const coverColor = product?.color ?? 'from-primary/60 to-purple-900';

    // ── Price by format ────────────────────────────────────────────────────
    const getPrice = () => {
        switch (selectedFormat) {
            case 'Ebook': return (basePrice * 0.8).toFixed(2);
            case 'Audiobook': return (basePrice * 1.2).toFixed(2);
            default: return basePrice.toFixed(2);
        }
    };
    const currentPrice = getPrice();

    // ── Actions ────────────────────────────────────────────────────────────
    if (!id) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-slate-400">No product selected.</p>
        </div>
    );

    if (!product) return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <p className="text-slate-400 text-lg">Product not found.</p>
            <Link to="/shop" className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-colors">
                Back to Shop
            </Link>
        </div>
    );

    const cartItem = {
        id: product.id,
        title: `${title} (${selectedFormat})`,
        author,
        price: parseFloat(currentPrice),
        image: coverImage,
        quantity: 1,
        format: selectedFormat
    };

    const handleAddToCart = () => {
        addToCart(cartItem);
        setCartAdded(true);
        setTimeout(() => setCartAdded(false), 2000);
    };

    const handlePurchase = () => {
        addToCart(cartItem);
        navigate('/checkout');
    };

    const handleWishlist = () => {
        toggleWishlist({ id: product.id, title, author, price: basePrice, image: coverImage, color: coverColor });
    };

    // ── Track recently viewed ──────────────────────────────────────────────
    useEffect(() => {
        if (!product?.id) return;
        const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const updated = [product.id, ...stored.filter(i => i !== product.id)].slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    }, [product?.id]);

    // ── Related products ───────────────────────────────────────────────────
    const related = products
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

    // ── Full star rating display ───────────────────────────────────────────
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    return (
        <div className="flex-grow flex flex-col max-w-[1600px] mx-auto w-full relative pt-20">
            {/* Ambient glow */}
            <div className="absolute top-0 left-[-10%] w-[60%] h-[70%] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-0 right-[-10%] w-[50%] h-[60%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* ── Hero: Book + Details ─────────────────────────────────── */}
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] z-10 relative">

                {/* Left: Book Visual */}
                <section className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                    <div className="book-container w-[260px] h-[390px] sm:w-[320px] sm:h-[480px] md:w-[380px] md:h-[570px]">
                        <div className="book w-full h-full relative cursor-pointer group">
                            <div className="book-spine" />
                            <div className="book-cover shadow-2xl flex flex-col relative overflow-hidden rounded-r-sm">
                                {/* Cover background */}
                                <div className="absolute inset-0 z-0">
                                    {coverImage ? (
                                        <img alt={title} src={coverImage} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${coverColor}`} />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                                </div>
                                {/* Cover text */}
                                <div className="relative z-10 flex flex-col h-full p-8 border border-white/10">
                                    <div className="mt-auto mb-12">
                                        <h1 className="font-serif text-3xl sm:text-4xl text-white tracking-wide leading-tight mb-3 uppercase">{title}</h1>
                                        <p className="text-sm tracking-[0.2em] text-primary font-bold uppercase">{author}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="book-pages bg-[#e3e3e3] border-l border-r border-gray-300" />
                        </div>
                        {/* Shadow */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-black/60 blur-xl rounded-[100%] scale-y-50" />
                    </div>
                </section>

                {/* Right: Product Info */}
                <section className="lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:pr-20 py-12 lg:py-8 z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
                        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                        <span>/</span>
                        <Link to={`/shop?category=${category}`} className="hover:text-primary transition-colors">{category}</Link>
                        <span>/</span>
                        <span className="text-white truncate max-w-[180px]">{title}</span>
                    </div>

                    {/* Title + Rating */}
                    <div className="mb-8">
                        <h1 className="font-serif text-4xl md:text-5xl text-white leading-[1.1] mb-4">{title}</h1>
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
                            <h2 className="text-base font-bold tracking-widest text-slate-300 uppercase">{author}</h2>
                            <div className="flex items-center gap-2">
                                <div className="flex text-amber-400 text-sm">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <span key={s}>{s <= fullStars ? '★' : s === fullStars + 1 && hasHalf ? '½' : '☆'}</span>
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-slate-300">{rating}</span>
                                <span className="text-xs text-slate-500">({reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Format Selector */}
                    <div className="mb-8">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Select Format</label>
                        <div className="inline-flex bg-black/30 p-1 rounded-lg border border-white/5 w-full md:w-auto">
                            {['Physical', 'Ebook', 'Audiobook'].map(fmt => (
                                <button
                                    key={fmt}
                                    onClick={() => setSelectedFormat(fmt)}
                                    className={`flex-1 md:flex-none py-2.5 px-5 rounded-md text-sm font-medium transition-all ${selectedFormat === fmt
                                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    {fmt}
                                </button>
                            ))}
                        </div>
                        <p className="mt-2 text-xs text-slate-400">
                            {selectedFormat === 'Physical' ? '📦 Fast shipping available' : '⚡ Instant digital access'}
                        </p>
                    </div>

                    {/* Synopsis */}
                    <div className="mb-8">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="font-serif text-lg text-white mb-2">Synopsis</h3>
                            <p className="text-slate-300 leading-relaxed text-sm">{description}</p>
                        </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-white/10 pt-8">
                        <div>
                            <span className="text-4xl font-bold text-white font-serif">${currentPrice}</span>
                            {selectedFormat === 'Ebook' && (
                                <span className="ml-2 text-xs text-green-400 font-semibold">20% off</span>
                            )}
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto flex-1 justify-end">
                            {/* Wishlist */}
                            <button
                                onClick={handleWishlist}
                                className={`h-14 px-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center ${isInWishlist(product.id) ? 'text-red-500' : 'text-slate-400 hover:text-white'}`}
                                aria-label="Add to wishlist"
                            >
                                <span className={`material-symbols-outlined ${isInWishlist(product.id) ? 'filled' : ''}`}>favorite</span>
                            </button>
                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                className={`h-14 px-5 rounded-lg border font-semibold transition-all flex items-center gap-2 text-sm ${cartAdded
                                    ? 'bg-green-500/20 border-green-500/40 text-green-400'
                                    : 'border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <ShoppingCart size={18} />
                                {cartAdded ? 'Added!' : 'Add to Cart'}
                            </button>
                            {/* Buy Now */}
                            <button
                                onClick={handlePurchase}
                                className="h-14 flex-1 sm:flex-none sm:w-44 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                            >
                                <Zap size={16} />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── Sticky Mobile CTA (hidden on desktop) ─────────────────── */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-black/90 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex items-center gap-3">
                <div className="flex-1">
                    <span className="text-xl font-bold text-white font-serif">${currentPrice}</span>
                    {selectedFormat === 'Ebook' && <span className="ml-2 text-xs text-green-400 font-semibold">20% off</span>}
                    <p className="text-xs text-slate-500">{selectedFormat}</p>
                </div>
                <button
                    onClick={handleAddToCart}
                    className={`h-11 px-4 rounded-lg border text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 ${cartAdded ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'border-white/20 text-slate-300'}`}
                >
                    <ShoppingCart size={16} />
                    {cartAdded ? '✓' : 'Cart'}
                </button>
                <button
                    onClick={handlePurchase}
                    className="h-11 px-6 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                    <Zap size={15} />
                    Buy Now
                </button>
            </div>

            {/* ── Reviews Section ──────────────────────────────────────── */}
            <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-white/10 z-10 relative">
                <h2 className="text-3xl font-serif text-white mb-10 flex items-center gap-4">
                    Customer Reviews
                    <span className="text-base font-sans font-normal text-slate-400 bg-white/5 px-3 py-1 rounded-full">
                        {reviewCount + (product.userReviews?.length ?? 0)} Reviews
                    </span>
                </h2>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Write a Review */}
                    <div className="lg:col-span-4">
                        <div className="glass-panel p-6 rounded-2xl sticky top-24">
                            <h3 className="text-lg font-bold text-white mb-5">Write a Review</h3>
                            <ReviewForm productId={product.id} />
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="lg:col-span-8 space-y-4">
                        {/* User-submitted reviews */}
                        {product.userReviews?.map((review, idx) => (
                            <ReviewCard key={`user-${idx}`} review={review} />
                        ))}
                        {/* Seed reviews */}
                        <ReviewCard review={{ user: 'Sarah Jenkins', rating: 5, date: '2 days ago', comment: 'Absolutely breathtaking. Highly recommend!' }} />
                        <ReviewCard review={{ user: 'Michael Chen', rating: 4, date: '1 week ago', comment: 'Great story, but the pacing in the middle was a bit slow.' }} />
                        <ReviewCard review={{ user: 'Elena Rodriguez', rating: 5, date: '3 weeks ago', comment: "I couldn't stop reading. Finished it in two days. A masterpiece." }} />
                    </div>
                </div>
            </section>

            {/* ── You May Also Like ────────────────────────────────────── */}
            {related.length > 0 && (
                <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-white/10 z-10 relative">
                    <h2 className="text-2xl font-serif text-white mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {related.map(p => (
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
                                <p className="text-primary font-bold text-sm mt-1">${p.price}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductPage;
