import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

// ─── Data ────────────────────────────────────────────────────────────────────

const AUDIOBOOKS = [
    {
        id: 201,
        title: "Shadows of the Void",
        author: "Aditi Sharma",
        narrator: "Aditi Sharma",
        duration: "1:45:00",
        durationSecs: 6300,
        genre: "Sci-Fi",
        price: 16.99,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1Tt9QaT1wwgo3z-gLIC4-XhJ0VxVUg4HaKCFaevhMS76E32gN6UZBh8trh_eD4hRCpqPkEa2AE_jIr7pVIdJ8Oz8YJK2mqXoBVpOi1BJjDkjpVp4LAXRdZQocenZL1RYVjeozRh7Z0MNB_UTGuQtxM5IIUaURs-pYvc6Va3qGPlChDaTXGv4TkYKzce39APQAyASzY3L7WnR91wNLfUyvMgoz_xpXWl10LYRkVkEjd2-fpkeB1MDKMudFMuE9uZcYCNxfVzMOoVY",
        chapters: [
            { title: "Prologue: Before the Dark", duration: "12:30" },
            { title: "Ch. 1: Signal Lost", duration: "18:45" },
            { title: "Ch. 2: Station Omega", duration: "22:10" },
            { title: "Ch. 3: The Hollow Men", duration: "19:55" },
            { title: "Ch. 4: The Edge of Silence", duration: "21:40" },
            { title: "Ch. 5: Zero Point", duration: "10:00" },
        ],
        featured: true,
    },
    {
        id: 202,
        title: "The Alchemist's Dream",
        author: "Julian Vance",
        narrator: "Julian Vance",
        duration: "12:45:00",
        durationSecs: 45900,
        genre: "Fantasy",
        price: 19.99,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDnTqcX9FU_ixrNHug8duKTQL8zztS3zzxGBl6d1_lPH3vfDjybntc3vPvZDAviTV7aCgrRM5_vVXmUmp36h9xbHgTcFZfXjaK1ejXngGZ8LknL_taRIoHkMgwXCmO_7DDyj5yQ5tix3QUtUtN2I1UcPyVGFlCDOSH3_-9kbrF8ydk4-1MKd9vjdSqtWim9WghYsZNjK_FAOKXBEh8s_s3KZrz-X4D_xtm7unrwuLzyftdLploavkcGdjMt_LhfEvcw2Q4U7fjDzg",
        chapters: [
            { title: "Ch. 1: The Flask of Gold", duration: "34:20" },
            { title: "Ch. 2: Forbidden Formulas", duration: "41:15" },
            { title: "Ch. 3: The Philosopher's Burden", duration: "38:50" },
        ],
    },
    {
        id: 203,
        title: "Neon Horizon",
        author: "Aditi Sharma",
        narrator: "Aditi Sharma",
        duration: "8:12:00",
        durationSecs: 29520,
        genre: "Sci-Fi",
        price: 14.99,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMqAhUUo0UONGKLBFhf37_A-rumRlBAbkIlqmCmHoU_a_ianXRfR3qsJgj4gpi9xkHv7G7YiM9uu_z6IjxiFhXmPt9tR_ADFHFFGCVHkidvipKhQnCQs7bgxBpHUAbilw2FNUlebWEV6OnTqrozx0eCe5ZmCn50lHFtDh_0y3MClQZdnVfZtKtoKTltqDK5V4uK-G4ESwG9YT3zrievHA4pZMP07PXv3O_dD4VPwsj8W-IxqDEfksYjyN-d0j_yfx0NY6rUTT910I",
        chapters: [
            { title: "Ch. 1: Grid Zero", duration: "45:00" },
            { title: "Ch. 2: Neural Static", duration: "52:20" },
        ],
    },
    {
        id: 204,
        title: "Whispers in the Static",
        author: "Marcus Thorne",
        narrator: "Marcus Thorne",
        duration: "10:05:00",
        durationSecs: 36300,
        genre: "Thriller",
        price: 15.99,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7bsJxhz3wNWlMgWVMHF7EO7BuaUxYf3AR-J2mrJDUv2np1HnJ-WnEB0tg8IUI6dpy_0Yp7wHuVDT7WWK0Bgxs7YzniSohXNCmZRZSjWvNPFiXslFSbqgaCGCLodge8RVIflxEoAcrQb4Ekan_hEe09-4wREESIK_CF6uL6uE6deptQf9uNIfal9jv1yPYwfTDXkabsIy1GE4URbL-f0N4yUSyGmkerU4ZpGtirZShce5mcg0bpzeUI4yddfgAT-B7gMYCNH6jS4o",
        chapters: [
            { title: "Ch. 1: Dead Air", duration: "38:00" },
            { title: "Ch. 2: The Voice", duration: "43:10" },
            { title: "Ch. 3: Frequency", duration: "40:25" },
        ],
    },
];

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const NARRATORS = [
    { name: "Aditi Sharma", role: "Sci-Fi Specialist", count: "12 Titles", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmYHXL_5pyyUKlCg2Ujv_IVgsh2nYh9UQL4zzdQNrG2-XgaxtpkxmDClVhkWKQzIcO1SEZfCNJtuW3rQZVXtSM01y9YdU6GFYBT8zL-dlODC9Y1R-Ij-RORd4M8FUFV1pFala7aJpUKdcdIeg2IbcdQjPDWUmdBFNNmz7-LvJg1_xI3UKnpu2Qjumk2OfQRJ2wFhNJKxJ3AgA5GP-uIBF0o2TgIDxTtRgWqcX7li7LieEXWfz4jIVagdDFAKzZNYpOwB21z7G6G30" },
    { name: "Julian Vance", role: "Drama & Noir", count: "8 Titles", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkYQkk0pVIlyO15bexrWpdCcJ2iTK6r-KGCR3Qu0VMBX7hTsEBhHuRe-dXEL86YAvJqvv2E45S5Yw6N8akx3E7eka0K3GCWJEyvEUl-Pbe9ovdr71Wpr9dXufe-bGjgfQpKTf_fRwfOGga4OFIHscztvpEsX5UzcGqET4cEzofi1ZYrXOz6IlOJ4fAM1c4S2lYEnva8qINWcxpg7ACd9UuxGhV22e4IVeoFhkN3gEVtV63XLShFWiZUotOouvYE6reUfAgX3sN5AY" },
    { name: "Elena Rossi", role: "Classical Fiction", count: "15 Titles", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn-uTZmjopxgCsHlEBuOEUAD2lA2khN8MHo17KmiitRKkQLxeYOGRmYxwc8ygpHFtXRed4bPpiYD8Si9O5O9zyaQrdXlKPEnlAzrDM3BvlwLcLSalwuGGCmZnWDaPk1_qiDpbBS_VDnpa-jIDP_G87KMkczOfu7qHjmnPcL848Kc8N_nLZMGm7ibp7SYGZDOeVQpqLqLmfmzGFr2R35ZR7ihz-0ZL2omwevQxVZMK1TnR7iDXSpMVuRCvFTws4xV417iY0uzQ3hBI" },
    { name: "Marcus Thorne", role: "Thrillers", count: "10 Titles", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8NJsZTgJgcMevH9qN-_4dh2WxDYhG4qpNw4sG3o2KNsEycy5aN1vE29zGUjpFIRX4Ubx7cqOj3mWt0m3z5Ui_GzD-xhbtWuhFK0lkDi8FDm2KhbwkbnP5GkzYc1BDT_Q7bqJiDhGtRwhF4ZuLT-nRrngna8FZVmgXr2yPhMOXO3nsMywhOG07Dw_bD-eOIZBeZOXVHVvucHn7yNNcFBewVG_ZkNzS_vtAcLsioOSSE3SDBBPMvo81LnjfvTiwUB-rfjFT2k1yIZ0" },
    { name: "Sarah Jenkins", role: "Non-Fiction", count: "9 Titles", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTzSaBAdAqd1YJ0Iv356bgOoDd4BdIbPhMQFBQSnWC-zCm_wSDk6CbRTeKOh96eoKX7m3q2gXVC6yrM6n6AT5q8THej-jfj1oyTCdT13N37omeOsyWOO5jEgcaMqNx4wxhPKI_F2PiH477Ub3GPsdH61ctG9cN1HA6VuBWoyfEiIeKFPe9aHronI5q-4YHKtIZaMkcivtEd4MQFzJQUm1EEzAtBQl-Iay_c0wcRsCPo2TvZFOQ1h2JLVXneY0p48Vqr0x6r9fUxV8" },
    { name: "David Wu", role: "Fantasy", count: "11 Titles", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAauRWM7TF2AcooyqFGJNxjbpzW4Is5Hx0FWeH-l0St2Y-SE0KbnJga37Fz-PzP0_KL1RajAbWDEGzrUv7ESZNhEER9BoK7R04loKgUs_2fJmWz7njBnD9j78LeBPwkP2AMND2h7iyrB4PHFGQK9MGG2LweU1ke4oqExRIxOLVKKKviFIZJAGjovh-nxI80BjbQD1BAyIk1sJh0Rq-SXo4rTEMmV1gq_yfeu4Hrfi32ubpTd5hxkuSPhou0nS7BeKk85UQoYhlCAL0" },
];

// ─── Helper ──────────────────────────────────────────────────────────────────
const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
};

// ─── Animated Waveform ───────────────────────────────────────────────────────
const Waveform = ({ playing }) => {
    const bars = [20, 40, 60, 30, 80, 50, 90, 40, 70, 20, 55, 85, 45, 65, 25, 95, 50, 75, 35, 60, 40, 80, 10, 50, 90, 40, 70, 20, 55, 85, 45, 65];
    return (
        <div className="flex items-end gap-[2px] h-12 px-4 bg-primary/5 rounded-xl border border-primary/10 w-full max-w-md overflow-hidden">
            {bars.map((h, i) => (
                <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary transition-all"
                    style={{
                        height: playing ? `${h}%` : '20%',
                        animationName: playing ? 'wavePulse' : 'none',
                        animationDuration: `${0.4 + (i % 5) * 0.15}s`,
                        animationTimingFunction: 'ease-in-out',
                        animationIterationCount: 'infinite',
                        animationDirection: 'alternate',
                        transition: 'height 0.3s ease',
                    }}
                />
            ))}
            <style>{`
                @keyframes wavePulse {
                    from { transform: scaleY(0.4); }
                    to { transform: scaleY(1); }
                }
            `}</style>
        </div>
    );
};

// ─── Sleep Timer Modal ───────────────────────────────────────────────────────
const SleepTimerModal = ({ onClose, onSet }) => {
    const OPTIONS = [15, 30, 45, 60, 90];
    return (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-[#12102a] border border-white/10 rounded-2xl p-6 w-full max-w-xs shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                    <span className="text-lg">😴</span> Sleep Timer
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {OPTIONS.map(mins => (
                        <button
                            key={mins}
                            onClick={() => { onSet(mins); onClose(); }}
                            className="py-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary text-white text-sm font-medium transition-colors border border-white/5"
                        >
                            {mins}m
                        </button>
                    ))}
                    <button
                        onClick={() => { onSet(null); onClose(); }}
                        className="col-span-3 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 text-sm font-medium transition-colors"
                    >
                        Cancel timer
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Chapter List ────────────────────────────────────────────────────────────
const ChapterList = ({ book, currentChapter, onSelect, onClose }) => (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-[#12102a] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-base">Chapters</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-white text-xl leading-none">✕</button>
            </div>
            <div className="overflow-y-auto space-y-1">
                {book.chapters.map((ch, i) => (
                    <button
                        key={i}
                        onClick={() => { onSelect(i); onClose(); }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${i === currentChapter ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                        <span className="text-xs font-bold text-slate-500 w-5">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{ch.title}</p>
                            <p className="text-xs text-slate-500">{ch.duration}</p>
                        </div>
                        {i === currentChapter && <span className="text-primary text-xs">▶</span>}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const AudiobookPage = () => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    // ── Player state
    const [activeBookId, setActiveBookId] = useState(AUDIOBOOKS[0].id);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);       // 0–100
    const [elapsed, setElapsed] = useState(0);       // seconds
    const [currentChapter, setCurrentChapter] = useState(0);
    const [speedIdx, setSpeedIdx] = useState(1);       // SPEEDS index
    const [showChapters, setShowChapters] = useState(false);
    const [showSleepTimer, setShowSleepTimer] = useState(false);
    const [sleepMins, setSleepMins] = useState(null);
    const [sleepCountdown, setSleepCountdown] = useState(null); // remaining secs

    const intervalRef = useRef(null);
    const sleepRef = useRef(null);

    const activeBook = AUDIOBOOKS.find(b => b.id === activeBookId) || AUDIOBOOKS[0];
    const speed = SPEEDS[speedIdx];

    // ── Tick while playing
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setElapsed(prev => {
                    const next = prev + speed;
                    const total = activeBook.durationSecs;
                    if (next >= total) { setIsPlaying(false); return total; }
                    setProgress((next / total) * 100);
                    return next;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, speed, activeBook.durationSecs]);

    // ── Sleep timer countdown
    useEffect(() => {
        if (sleepMins === null) {
            clearInterval(sleepRef.current);
            setSleepCountdown(null);
            return;
        }
        setSleepCountdown(sleepMins * 60);
        sleepRef.current = setInterval(() => {
            setSleepCountdown(prev => {
                if (prev <= 1) {
                    setIsPlaying(false);
                    setSleepMins(null);
                    clearInterval(sleepRef.current);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(sleepRef.current);
    }, [sleepMins]);

    // ── Reset on book change
    const selectBook = (book) => {
        setActiveBookId(book.id);
        setElapsed(0);
        setProgress(0);
        setCurrentChapter(0);
        setIsPlaying(false);
    };

    const skip = (secs) => {
        setElapsed(prev => {
            const next = Math.max(0, Math.min(prev + secs, activeBook.durationSecs));
            setProgress((next / activeBook.durationSecs) * 100);
            return next;
        });
    };

    const handleSeek = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newElapsed = pct * activeBook.durationSecs;
        setElapsed(newElapsed);
        setProgress(pct * 100);
    }, [activeBook.durationSecs]);

    const cycleSpeed = () => setSpeedIdx(i => (i + 1) % SPEEDS.length);

    const handleAddToCart = (book) => {
        addToCart({ id: book.id, title: book.title, author: book.author, price: book.price, image: book.image, format: 'Audiobook', quantity: 1 });
    };

    return (
        <div className="bg-background-dark text-slate-100 min-h-screen selection:bg-primary selection:text-white pt-16 pb-36">
            <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8">

                {/* ── Hero / Currently Playing ──────────────────────────── */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 py-10">
                    {/* Book cover with glow */}
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 transition-opacity group-hover:opacity-80" />
                        <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 0 60px 10px rgba(127, 6, 249, 0.15)' }}>
                            <img alt={activeBook.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={activeBook.image} />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="px-3 py-1 bg-primary text-[10px] font-bold uppercase tracking-widest rounded-full text-white mb-2 inline-block">
                                    {activeBook.featured ? 'Audiobook of the Month' : activeBook.genre}
                                </span>
                                <h3 className="text-2xl font-bold text-white leading-tight">{activeBook.title}</h3>
                                <p className="text-slate-400 text-sm mt-1">Narrated by {activeBook.narrator}</p>
                            </div>
                        </div>
                    </div>

                    {/* Info + controls */}
                    <div className="flex flex-col gap-7 order-1 lg:order-2">
                        <div>
                            <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2">Now Playing</p>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white mb-1">{activeBook.title}</h1>
                            <p className="text-slate-400 text-lg">{activeBook.narrator} · {activeBook.genre}</p>
                        </div>

                        {/* Current chapter */}
                        <div className="flex items-center gap-3 glass-panel px-4 py-3 rounded-xl">
                            <span className="text-primary text-sm">▶</span>
                            <div className="flex-1">
                                <p className="text-white text-sm font-semibold">{activeBook.chapters[currentChapter]?.title || 'Chapter 1'}</p>
                                <p className="text-slate-500 text-xs">{activeBook.chapters[currentChapter]?.duration}</p>
                            </div>
                            <button
                                onClick={() => setShowChapters(true)}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                All Chapters
                            </button>
                        </div>

                        {/* Waveform */}
                        <Waveform playing={isPlaying} />

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => setIsPlaying(p => !p)}
                                className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined fill-1">{isPlaying ? 'pause' : 'play_arrow'}</span>
                                {isPlaying ? 'Pause' : 'Listen to Sample'}
                            </button>
                            <button
                                onClick={() => handleAddToCart(activeBook)}
                                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-8 rounded-full transition-colors"
                            >
                                Add to Library – ${activeBook.price}
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── Narrator Spotlights ───────────────────────────────── */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Voice Masters: Narrator Spotlights</h2>
                    </div>
                    <div className="flex gap-8 overflow-x-auto pb-6 -mx-2 px-2 scroll-smooth scrollbar-hide">
                        {NARRATORS.map((narrator, index) => (
                            <div key={index} className="flex-shrink-0 flex flex-col items-center gap-4 text-center group cursor-pointer">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary rounded-full scale-0 group-hover:scale-105 transition-transform duration-300 opacity-20" />
                                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors p-1">
                                        <img alt={narrator.name} className="w-full h-full object-cover rounded-full" src={narrator.image} />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-white group-hover:text-primary transition-colors text-sm">{narrator.name}</p>
                                    <p className="text-slate-500 text-xs">{narrator.count} · {narrator.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Top Audiobooks Grid ───────────────────────────────── */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold tracking-tight mb-8 text-white">Top Audiobooks</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {AUDIOBOOKS.map((book) => (
                            <div key={book.id} className={`group cursor-pointer ${book.id === activeBookId ? 'ring-2 ring-primary ring-offset-2 ring-offset-background-dark rounded-xl' : ''}`} onClick={() => selectBook(book)}>
                                <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 transition-all duration-300">
                                    <img alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={book.image} />
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2 py-1 bg-background-dark/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/10">{book.duration.replace(/:\d{2}$/, '')} hrs</span>
                                    </div>
                                    <div className="absolute inset-0 bg-background-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); selectBook(book); setIsPlaying(true); }}
                                            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300"
                                        >
                                            <span className="material-symbols-outlined fill-1">play_arrow</span>
                                        </button>
                                    </div>
                                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleWishlist(book); }}
                                            className={`w-8 h-8 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-md hover:bg-black/80 transition-colors ${isInWishlist(book.id) ? 'text-red-500' : 'text-white'}`}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                                        </button>
                                    </div>
                                    {book.id === activeBookId && (
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <div className="h-0.5 bg-white/20 rounded-full">
                                                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-white leading-tight group-hover:text-primary transition-colors">{book.title}</h4>
                                    <p className="text-slate-500 text-sm">Narrated by <span className="text-slate-300 font-medium">{book.narrator}</span></p>
                                    <p className="text-primary text-sm font-bold">${book.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* ── Persistent Mini Player ──────────────────────────────────── */}
            <div className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-4 lg:p-5 lg:rounded-t-3xl mx-auto max-w-7xl border-x border-white/5"
                style={{ background: 'rgba(13,13,15,0.85)', backdropFilter: 'blur(14px)', borderTop: '1px solid rgba(127,6,249,0.2)' }}>
                <div className="flex items-center justify-between lg:justify-start gap-4 lg:gap-10">

                    {/* Book info */}
                    <div className="flex items-center gap-3 min-w-0 lg:min-w-[260px] flex-1 lg:flex-none">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                            <img alt={activeBook.title} className="w-full h-full object-cover" src={activeBook.image} />
                        </div>
                        <div className="overflow-hidden min-w-0">
                            <h5 className="text-white text-sm font-bold truncate">{activeBook.title}</h5>
                            <p className="text-slate-400 text-xs truncate">{activeBook.chapters[currentChapter]?.title}</p>
                        </div>
                    </div>

                    {/* Main controls + progress */}
                    <div className="flex items-center lg:flex-1 lg:flex-col lg:items-center gap-2">
                        <div className="flex items-center gap-2 sm:gap-5">
                            <button onClick={() => skip(-30)} className="hidden sm:block material-symbols-outlined text-slate-400 hover:text-white transition-colors text-xl">replay_30</button>
                            <button
                                onClick={() => setIsPlaying(p => !p)}
                                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                            >
                                <span className="material-symbols-outlined fill-1 text-xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
                            </button>
                            <button onClick={() => skip(30)} className="hidden sm:block material-symbols-outlined text-slate-400 hover:text-white transition-colors text-xl">forward_30</button>
                        </div>

                        {/* Progress bar */}
                        <div className="hidden lg:flex w-full items-center gap-3">
                            <span className="text-[10px] text-slate-500 font-mono w-12 text-right">{formatTime(elapsed)}</span>
                            <div
                                className="relative flex-1 h-1.5 bg-white/10 rounded-full group cursor-pointer"
                                onClick={handleSeek}
                            >
                                <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: `${progress}%` }}>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full scale-0 group-hover:scale-100 transition-transform" />
                                </div>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono w-12">{activeBook.duration.split(':').slice(0, activeBook.duration.split(':').length - 1).join(':')}</span>
                        </div>
                    </div>

                    {/* Right tools */}
                    <div className="hidden lg:flex items-center gap-5 min-w-[200px] justify-end">
                        {/* Speed */}
                        <button
                            onClick={cycleSpeed}
                            className="text-xs font-bold text-slate-400 hover:text-primary transition-colors w-10 text-center"
                            title="Playback speed"
                        >
                            {speed}×
                        </button>

                        {/* Chapters */}
                        <button
                            onClick={() => setShowChapters(true)}
                            className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors"
                            title="Chapters"
                        >
                            playlist_play
                        </button>

                        {/* Sleep timer */}
                        <button
                            onClick={() => setShowSleepTimer(true)}
                            className={`material-symbols-outlined transition-colors ${sleepCountdown ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
                            title={sleepCountdown ? `Sleep in ${formatTime(sleepCountdown)}` : 'Sleep timer'}
                        >
                            bedtime
                        </button>

                        {sleepCountdown && (
                            <span className="text-[10px] font-mono text-primary">{formatTime(sleepCountdown)}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Modals ──────────────────────────────────────────────────── */}
            {showChapters && (
                <ChapterList
                    book={activeBook}
                    currentChapter={currentChapter}
                    onSelect={(i) => { setCurrentChapter(i); setElapsed(0); setProgress(0); }}
                    onClose={() => setShowChapters(false)}
                />
            )}
            {showSleepTimer && (
                <SleepTimerModal onClose={() => setShowSleepTimer(false)} onSet={setSleepMins} />
            )}
        </div>
    );
};

export default AudiobookPage;
