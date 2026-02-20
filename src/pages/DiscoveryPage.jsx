import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// ─── Genre Dimensions — navigate to filtered shop views ───────────────────
const DIMENSIONS = [
    {
        label: 'DIMENSION 01',
        title: 'The Distant Future',
        category: 'Sci-Fi',
        count: '1,240',
        span: 'lg:col-span-8',
        aspect: 'aspect-[16/9]',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGHRqQPZY68lcRes_DOnbwrs7laaemgAnxqhREMMfkLnvPXwVIeYYR5KuKwSqfqYwFkYDk30MyMpqhKSkwIxciapJAGXFFvnHF7MlKmHk_WTo9j72o5VUOzoCgGXWPnI0x5sfGi2oTJrY6c_IIt9Bh45XibdF3ZHt7dGZ8vRr9BjhbMcRTisopWJLrYbcyFT78so9ArjHP0CWoOdtGSgQYB8HylOwAGu1ay4O_oRP52EL8NVCMWRzf79a1FXXvMbS7SyyFhugzZDU",
        large: true,
    },
    {
        label: 'DIMENSION 02',
        title: 'The Silent Night',
        category: 'Mystery',
        count: '842',
        span: 'lg:col-span-4',
        aspect: 'aspect-[4/5]',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVIwGW7ToXb3JT6CENG0f2aFxc9_ymP2ujzvpjqXcGhOtLcmKmFNN53w9kKawiAcLdrzZtOJCQ7Z3nBFTn0wF1CGSAYJMPsqRoFRwNGe93bVYSZ3oNQt25sxx07H5EM352eScbryAx_IP31tpcR00GzZrOFDpa8Jb3h3UVlvblMn4jy_1kasqhVuRYbVi1f7gp3_kJ7jF_p86zsytVQzx-Aj1-uXPpIXt_PsKUyOgP_QtIOA-Jx_RdE7Zrj1A6hNg88uzYRl4G9bc",
    },
    {
        label: '',
        title: 'Timeless Echoes',
        category: 'History',
        count: '520',
        span: 'lg:col-span-4',
        aspect: 'aspect-square',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmiz7q8299Urxs-f41Pr6ysYsLXIKM-ZgdNfbKSdQkOsNJsT7D3c2gMITo9nYRnsZ5_ovQafJcP_2LI90N6eh9NudimfG1gwtO2_MyqezcxdWcBA79u2kJva5Om7_gID9HKeW6qQgXDBHt3rM_c91eQ3zD6WGPoQkmHWvJpiZ60Xm9w8bDwFRKmBFnQ3jchpbs2drXp0FWoytOgBxNA1jmucgwIclKcQ6YOEWyfbUysBuxQD2wcfdQaaKrdboU3KPA8ZJPyalJykk",
    },
    {
        label: '',
        title: 'Shades of Gray',
        category: 'Mystery',
        count: '315',
        span: 'lg:col-span-4',
        aspect: 'aspect-square',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALE5v3EOxewPb7a9Rwi2V5FRXCixnf8hGm0caorNtp4bf_CV30vthBBm1XP6HFCPowrd5ZB9TGCEluCYhxykdnXT5ccPuX__M-l1RRHq3IZ1QlkMZOcaLLyIrig1Lo5vuhdDMfuGpIuct14g6i3djgrMCXYLh2h7p4Qs_QliQAO-dCDjXGcofWdTWWS2YlPtAEZWBkafNotCJG8k23WXGSFxwtQhYdaXdct8q0irOKDNJmdx_skRjH-rYrKQ5o4uc9MdgO1EfkqYI",
    },
    {
        label: '',
        title: 'Mythic Realms',
        category: 'Fantasy',
        count: '1,102',
        span: 'lg:col-span-4',
        aspect: 'aspect-square',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA52OEdhdrHvvjdK0mOodaPy8cQiRQr7429F4XLEwXv5-eet15n3Yn1FtNRtp1OEt4LJVzP6bAdg4WMXNAmTJGwfjlJSq9__ju_-r12OSsOL0srPHojTmuZebzRqiSoDOajFaBMgBBuEk-kwa74XPR72Ao1aB_7UJxeyv_AfBPzEwlIWbLQQVBOjKFEZpnCpN99ipmsXHYgD91WgfN954zZzFp9p3JHtZD7dSUim0yY8-Di06vxdh45VDO_naZvzvasSnsCdr1YvyI",
    },
];

// ─── Tilt card effect ────────────────────────────────────────────────────────
const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
    };
    const handleLeave = () => {
        if (ref.current) ref.current.style.transform = '';
    };
    return (
        <div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}
            style={{ transition: 'transform 0.15s ease', transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
};

// ─── Genre card ──────────────────────────────────────────────────────────────
const GenreCard = ({ dim }) => {
    const navigate = useNavigate();
    return (
        <div
            className={`genre-card relative group ${dim.span} ${dim.aspect} overflow-hidden rounded-[2rem] cursor-pointer`}
            onClick={() => navigate(`/shop?category=${encodeURIComponent(dim.category)}`)}
        >
            <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                alt={dim.title}
                src={dim.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                {dim.label && (
                    <span className="text-xs font-bold tracking-[0.4em] uppercase text-electric-violet mb-3 block">{dim.label}</span>
                )}
                <h3 className={`font-serif italic text-white mb-5 ${dim.large ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>{dim.title}</h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/shop?category=${encodeURIComponent(dim.category)}`); }}
                        className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold text-sm transition-all
                            ${dim.large
                                ? 'bg-white text-background-dark hover:bg-electric-violet hover:text-white'
                                : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-background-dark'
                            }`}
                    >
                        Browse {dim.category} <span className="material-symbols-outlined text-sm">north_east</span>
                    </button>
                    <div>
                        <span className="text-2xl font-serif text-white">{dim.count}</span>
                        <span className="block text-[10px] font-bold tracking-widest text-white/40 uppercase">Titles Available</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const DiscoveryPage = () => {
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const carouselRef = useRef(null);

    // Pull real top-rated books as curated picks
    const curatedBooks = [...(products || [])]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 6);

    // DNA stats derived from recently viewed categories
    const dnaStats = (() => {
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const viewedProds = viewed.map(id => products.find(p => p.id === id)).filter(Boolean);
        const catCounts = viewedProds.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
        }, {});
        const total = viewedProds.length || 1;
        const sorted = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
        if (!sorted.length) return [{ label: 'Synthetic', pct: 84 }, { label: 'Enigmatic', pct: 12 }, { label: 'Organic', pct: 4 }];
        return sorted.slice(0, 3).map(([cat, cnt]) => ({
            label: cat,
            pct: Math.round((cnt / total) * 100),
        }));
    })();

    const scrollCarousel = (dir) => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen overflow-x-hidden relative pt-16">
            <style>{`
                .electric-violet { color: #8b5cf6; }
                .text-electric-violet { color: #8b5cf6; }
                .bg-electric-violet { background-color: #8b5cf6; }
                .border-electric-violet\/30 { border-color: rgba(139,92,246,0.3); }
                .glass-panel {
                    background: rgba(13, 13, 15, 0.6);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .glow-text {
                    text-shadow: 0 0 80px rgba(139,92,246,0.3), 0 0 120px rgba(139,92,246,0.15);
                }
                .orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(100px);
                    pointer-events: none;
                    z-index: 0;
                    opacity: 0.2;
                }
                .orb-1 {
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, #8b5cf6, transparent);
                    top: -200px;
                    right: -200px;
                    animation: orbFloat1 18s ease-in-out infinite alternate;
                }
                .orb-2 {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, #06b6d4, transparent);
                    bottom: 10%;
                    left: -150px;
                    animation: orbFloat2 22s ease-in-out infinite alternate;
                }
                @keyframes orbFloat1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-60px, 80px) scale(1.1); } }
                @keyframes orbFloat2 { from { transform: translate(0,0) scale(1); } to { transform: translate(80px, -60px) scale(1.15); } }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .genre-card { transition: transform 0.3s ease; z-index: 1; position: relative; }
            `}</style>

            {/* Ambient Orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            <main className="max-w-[1600px] mx-auto px-6 lg:px-20 py-16">

                {/* ── Hero ────────────────────────────────────────────────── */}
                <section className="text-center mb-24 relative">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel mb-8 border-electric-violet/30">
                        <span className="flex h-2 w-2 rounded-full bg-electric-violet animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-electric-violet">Editorial Discovery</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-serif italic font-light tracking-tight glow-text leading-[0.85] mb-6 text-white">
                        Explore Worlds
                    </h1>
                    <p className="text-white/50 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Step beyond the horizon. Navigate through meticulously curated dimensions of storytelling, crafted for the cinematic soul.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Link to="/shop" className="px-8 py-3 bg-white text-background-dark rounded-full font-black text-xs tracking-widest hover:bg-electric-violet hover:text-white transition-all">
                            BROWSE ALL BOOKS
                        </Link>
                        <Link to="/audiobooks" className="px-8 py-3 border border-white/20 text-white rounded-full font-black text-xs tracking-widest hover:bg-white/5 transition-all">
                            EXPLORE AUDIOBOOKS
                        </Link>
                    </div>
                </section>

                {/* ── Benton Grid - Clickable genre cards ─────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-32">
                    {DIMENSIONS.map((dim, i) => (
                        <GenreCard key={i} dim={dim} />
                    ))}
                </div>

                {/* ── Curated Books Carousel (real products) ──────────────── */}
                <section className="mb-32">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-xs font-bold tracking-[0.4em] uppercase text-electric-violet mb-4 block">TOP RATED</span>
                            <h2 className="text-5xl font-serif italic text-white">Curated for Your Journey</h2>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => scrollCarousel(-1)}
                                className="size-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all hover:border-primary"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button
                                onClick={() => scrollCarousel(1)}
                                className="size-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all hover:border-primary"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    <div ref={carouselRef} className="flex gap-8 overflow-x-auto scrollbar-hide py-10 px-2 -mx-2 pb-16" style={{ scrollSnapType: 'x mandatory' }}>
                        {curatedBooks.map((book, i) => (
                            <TiltCard key={book.id} className="min-w-[280px] group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                                <Link to={`/product/${book.id}`}>
                                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-5 shadow-2xl">
                                        {book.image ? (
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={book.title} src={book.image} />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${book.color || 'from-primary/60 to-purple-900'}`} />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-4 right-4 bg-electric-violet/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white">
                                            {book.rating ? `${book.rating}★` : `${95 - i * 4}% MATCH`}
                                        </div>
                                        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.preventDefault(); toggleWishlist(book); }}
                                                className={`w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/80 transition-colors ${isInWishlist(book.id) ? 'text-red-400' : 'text-white'}`}
                                            >
                                                <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold mb-1 text-white group-hover:text-electric-violet transition-colors line-clamp-1">{book.title}</h4>
                                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-2">{book.author} · {book.category}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary font-bold">${book.price}</span>
                                        <button
                                            onClick={(e) => { e.preventDefault(); addToCart({ ...book, quantity: 1 }); }}
                                            className="text-xs text-slate-400 hover:text-white border border-white/10 hover:border-primary px-3 py-1 rounded-full transition-all"
                                        >
                                            + Cart
                                        </button>
                                    </div>
                                </Link>
                            </TiltCard>
                        ))}
                    </div>
                </section>

                {/* ── Narrative DNA ─────────────────────────────────────────── */}
                <section className="glass-panel rounded-[3rem] p-8 md:p-16 border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-electric-violet/10 to-transparent pointer-events-none" />
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                        <div className="max-w-2xl">
                            <span className="text-xs font-bold tracking-[0.4em] uppercase text-electric-violet mb-6 block">YOUR READING PROFILE</span>
                            <h2 className="text-4xl md:text-6xl font-serif italic mb-6 text-white">Your Narrative DNA</h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-8">
                                {dnaStats[0]
                                    ? <>Based on your browsing, your profile resonates most with <span className="text-white font-bold">{dnaStats[0].label}</span> — your taste is unmistakably curated.</>
                                    : <>Browse some books to see your personalized reading profile take shape.</>
                                }
                            </p>
                            <div className="flex gap-8 md:gap-12 flex-wrap">
                                {dnaStats.map((stat, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <div className="w-px h-12 bg-white/10" />}
                                        <div>
                                            <div className="text-4xl font-serif text-white mb-1">{stat.pct}%</div>
                                            <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase">{stat.label}</div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <Link
                                to="/shop"
                                className="bg-white text-background-dark px-12 py-5 rounded-full font-black tracking-widest text-xs hover:bg-electric-violet hover:text-white transition-all transform hover:-translate-y-1 text-center"
                            >
                                EXPLORE YOUR GENRES
                            </Link>
                            <Link
                                to="/discover"
                                onClick={() => localStorage.removeItem('recentlyViewed')}
                                className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-full font-black tracking-widest text-xs hover:bg-white/5 transition-all text-center"
                            >
                                RESET PROFILE
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DiscoveryPage;
