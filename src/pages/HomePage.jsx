import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';

const HomePage = () => {
    const { addToCart } = useCart();
    const { products } = useProducts();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const handleQuickAdd = (id, title, author, price, image) => {
        addToCart({
            id,
            title,
            author,
            price,
            image,
            quantity: 1
        });
    };

    return (
        <main className="flex-grow pt-16">
            {/* Hero Section */}
            <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 lg:px-8">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-glow"></div>
                <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"></div>
                <div className="absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-purple-900/20 blur-[120px]"></div>
                {/* Content Container */}
                <div className="relative z-10 grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Text Content */}
                    <div className="max-w-2xl text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            New Immersive Experience Available
                        </div>
                        <h1 className="font-serif text-5xl font-black leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl mb-6">
                            Where Stories <br />
                            <span className="text-gradient">Come Alive</span>
                        </h1>
                        <p className="mb-10 text-lg leading-relaxed text-slate-400 sm:text-xl max-w-lg mx-auto lg:mx-0">
                            Experience the next generation of storytelling. Premium physical editions, immersive audiobooks, and exclusive collector's items.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link to="/shop" className="group relative flex h-12 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-8 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(115,81,251,0.5)]">
                                <span className="relative z-10">Start Exploring</span>
                                <span className="material-symbols-outlined relative z-10 text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </Link>
                            <button className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10">
                                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                                Listen to Sample
                            </button>
                        </div>
                    </div>
                    {/* Visual Content */}
                    <div className="relative hidden h-[600px] w-full lg:block">
                        {/* Main Book */}
                        <div className="animate-float absolute left-1/2 top-1/2 z-20 h-[480px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-r-2xl bg-surface-dark shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transform perspective-1000 rotate-y-[-15deg] rotate-x-[5deg]">
                            <div className="h-full w-full overflow-hidden rounded-r-2xl border-l-4 border-l-white/10 bg-cover bg-center" data-alt="Abstract dark nebulas book cover art" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeZNh4gaR3unJHrbSqS-Y81-gabXUncpfhwSX_CAqvjbTFW4vvzY195fFB6p61uUQ-IHBgI_lcEQh_YWMjX7al6G0iQW5_xTmqmZO2IkFUZHvSHZ7xM9bepKtclkdlgMT50c8AY_JoN4_UUQN26qgrChAwAv5GIyV8KjB7fOm1Jg-K_InlIi9ugjadSWIjXD5ZHF6SNoDJhNU5fMADrpAq5jJPwCPgHF4CNn2iSc3Nc7Gplfbj59z-eFElARdKwVVaPYauYKy7dOA')" }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <p className="font-serif text-2xl font-bold text-white">The Starless Sea</p>
                                        <p className="text-sm text-slate-300">Erin Morgenstern</p>
                                    </div>
                                </div>
                            </div>
                            {/* Book Spine Simulation */}
                            <div className="absolute left-0 top-0 h-full w-[20px] -translate-x-full bg-[#1a1625] rounded-l-sm shadow-inner"></div>
                        </div>
                        {/* Floating Elements Behind */}
                        <div className="animate-float-delayed absolute left-[10%] top-[20%] z-10 h-[240px] w-[160px] opacity-60 grayscale blur-[1px] transform rotate-[-12deg]">
                            <div className="h-full w-full rounded-lg bg-cover bg-center shadow-2xl" data-alt="Vintage book cover art floating in background" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0biScmYNWVtlFx5cPieDwGU1wEutYMgEf0gQnueiFK6UCM28CSzA3Iat-v95uS1yz7eibGc5NztIxWkXBA5W9-HG6NBM7pAvh9rUYqD12LRKWXJiEuC8gxOerSf0E8mvdy8gBBkRTGmCOTSMzKQXj4VYxIlSAW-mfIP9RkKXTJjtnwW0lqN4d81a6MKRWijOxqrelGg4N-XFv_vu5MyL5cr5JZyUsmkWvFqseneRiKWOD0QU1sJBCzLSkty58sVT7cOJu9exGvBg')" }}></div>
                        </div>
                        <div className="animate-float absolute right-[5%] bottom-[20%] z-30 h-[200px] w-[140px] opacity-80 transform rotate-[10deg]">
                            <div className="h-full w-full rounded-lg bg-cover bg-center shadow-2xl border border-white/10" data-alt="Minimalist white book cover art" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwf2CtpBcgDiP15k1MmnY3oLYZ9WvzbLer_HY0_0a2QTKz4aX3V3ZEDx8BWSCHaNRZp8hN7j4uYQ5FtHwb5BYiy5rlIk5HkCmaey0c62HekRETHN4NuRmGujo49aqNDb0vMhRaHLiQqdFkIY4tYw_Y0fGgaH89Etnxcu1-nQ9UpSO9nuZ4epi_UjuKiaecWspjku1GgyC7B4rZLQXCOPTqEzKLTNcEz1nxKj_n_CsRGUaCAxnwBGckFh8GMXqPNWyuwUBX9xP1u54')" }}>
                                <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-md">
                                    <span className="material-symbols-outlined text-[16px] text-white">headphones</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curated This Week */}
            <section className="border-t border-white/5 bg-surface-dark/30 py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="font-serif text-3xl font-bold text-white">Curated Collections</h2>
                            <p className="mt-2 text-slate-400">Hand-picked selections for the discerning reader.</p>
                        </div>
                        <Link className="hidden text-sm font-medium text-primary hover:text-primary/80 sm:flex items-center gap-1" to="/shop">
                            View All Collections
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Featured Large Card */}
                        <div className="card-tilt group relative col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden rounded-2xl bg-surface-highlight border border-white/5">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Dark moody library atmosphere" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcm7T09T3wuefl84V_i2B2FeeEoIKtS6r2N5jaHHvbD7yywArtS4DX6VAKngn20hp2wz8grQTyet1Z7ZuhNkR9gEwXuVKi8sgCA6w35YLVwn0tWq6rq9GpmEsSI-nVsfEjXLpQ11lmUPNAbA0VL4g8qIWV7KBgDLEkbbAm6LpWkyz6oqFt6Vk4ky7pXNDfwQ0vy4xk241SUe0PUD0kKvW_1wFBEJ2cJ50ZHcDFA9qEqE8xmWH8EooEDCNVCMcul5Wm7_QpkSnX8k8')" }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
                                <div className="absolute top-6 right-6 z-20">
                                    <button
                                        onClick={(e) => { e.preventDefault(); toggleWishlist({ id: 101, title: "The Midnight Library", author: "Matt Haig", price: 24.99, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcm7T09T3wuefl84V_i2B2FeeEoIKtS6r2N5jaHHvbD7yywArtS4DX6VAKngn20hp2wz8grQTyet1Z7ZuhNkR9gEwXuVKi8sgCA6w35YLVwn0tWq6rq9GpmEsSI-nVsfEjXLpQ11lmUPNAbA0VL4g8qIWV7KBgDLEkbbAm6LpWkyz6oqFt6Vk4ky7pXNDfwQ0vy4xk241SUe0PUD0kKvW_1wFBEJ2cJ50ZHcDFA9qEqE8xmWH8EooEDCNVCMcul5Wm7_QpkSnX8k8" }); }}
                                        className={`rounded-full bg-black/40 p-2 backdrop-blur-md hover:bg-black/60 transition-colors ${isInWishlist(101) ? 'text-red-500' : 'text-white'}`}
                                    >
                                        <span className={`material-symbols-outlined block text-[20px] ${isInWishlist(101) ? 'font-variation-FILL' : ''}`}>favorite</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative flex h-full flex-col justify-end p-8">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">Editor's Choice</span>
                                    <span className="inline-flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-[14px]">headphones</span>
                                        Audio Available
                                    </span>
                                </div>
                                <h3 className="font-serif text-3xl font-bold text-white">The Midnight Library</h3>
                                <p className="mt-2 max-w-lg text-slate-300">Between life and death there is a library, and within that library, the shelves go on forever. Explore the variations of your life.</p>
                                <div className="mt-6 flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuickAdd(101, "The Midnight Library", "Matt Haig", 24.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuBcm7T09T3wuefl84V_i2B2FeeEoIKtS6r2N5jaHHvbD7yywArtS4DX6VAKngn20hp2wz8grQTyet1Z7ZuhNkR9gEwXuVKi8sgCA6w35YLVwn0tWq6rq9GpmEsSI-nVsfEjXLpQ11lmUPNAbA0VL4g8qIWV7KBgDLEkbbAm6LpWkyz6oqFt6Vk4ky7pXNDfwQ0vy4xk241SUe0PUD0kKvW_1wFBEJ2cJ50ZHcDFA9qEqE8xmWH8EooEDCNVCMcul5Wm7_QpkSnX8k8")}
                                        className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                    <Link to="/product/101" className="flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">visibility</span>
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Side Card 1 */}
                        <div className="card-tilt group relative overflow-hidden rounded-2xl bg-surface-highlight border border-white/5 p-6">
                            <div className="mb-4 aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg relative">
                                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Sci-fi abstract geometric pattern book cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkzIyuix5F8-RDWR1UPgzlPLeSepLxeooaIUjJbBXBJFg8MYzbMTB9WftKZdXyDJ-u-FvLxAmTUuF5y8X8THF-QpaRiEGI1aPmiIHFo-X3-krgWOaKtlJ1wS4H_hDTixxmBRBjTopyZwn0wd70xc_znaa-JnrukMOK2kdGNdo7iWlAJ-p9IGIO982_MRv4N3HMNdpuyN0ImylnvV6DM7TnZa21gJfo_9o1fAnO7UwvFW4y4UJzvJw1nFNrWvgyz3RScWkVWDINgbQ')" }}></div>
                                <div className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors" onClick={(e) => { e.preventDefault(); toggleWishlist({ id: 102, title: "Project Hail Mary", author: "Andy Weir", price: 24.99, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkzIyuix5F8-RDWR1UPgzlPLeSepLxeooaIUjJbBXBJFg8MYzbMTB9WftKZdXyDJ-u-FvLxAmTUuF5y8X8THF-QpaRiEGI1aPmiIHFo-X3-krgWOaKtlJ1wS4H_hDTixxmBRBjTopyZwn0wd70xc_znaa-JnrukMOK2kdGNdo7iWlAJ-p9IGIO982_MRv4N3HMNdpuyN0ImylnvV6DM7TnZa21gJfo_9o1fAnO7UwvFW4y4UJzvJw1nFNrWvgyz3RScWkVWDINgbQ" }); }}>
                                    <span className={`material-symbols-outlined block text-[16px] ${isInWishlist(102) ? 'text-red-500 font-variation-FILL' : 'text-white'}`}>favorite</span>
                                </div>
                            </div>
                            <h3 className="font-serif text-xl font-bold text-white">Project Hail Mary</h3>
                            <p className="text-sm text-slate-400">Andy Weir</p>
                            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                                <span className="text-lg font-bold text-white">$24.99</span>
                                <button
                                    onClick={() => handleQuickAdd(102, "Project Hail Mary", "Andy Weir", 24.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuDkzIyuix5F8-RDWR1UPgzlPLeSepLxeooaIUjJbBXBJFg8MYzbMTB9WftKZdXyDJ-u-FvLxAmTUuF5y8X8THF-QpaRiEGI1aPmiIHFo-X3-krgWOaKtlJ1wS4H_hDTixxmBRBjTopyZwn0wd70xc_znaa-JnrukMOK2kdGNdo7iWlAJ-p9IGIO982_MRv4N3HMNdpuyN0ImylnvV6DM7TnZa21gJfo_9o1fAnO7UwvFW4y4UJzvJw1nFNrWvgyz3RScWkVWDINgbQ")}
                                    className="rounded-full bg-white/10 p-2 text-white hover:bg-primary hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Second Row */}
                    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Product Card */}
                        <div className="card-tilt group rounded-xl bg-surface-highlight border border-white/5 p-4 hover:border-primary/30 transition-colors">
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
                                <div className="h-full w-full bg-cover bg-center" data-alt="Nature landscape book cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTsCI3f0JWTqEDp_uBknAWFR3TJ_XEauSTG4k9OBPpcIiVy-NuZmOI-I8OPLn8r2UIUna6uuJ-MCElZA-veoKuyLY9zXIDwNlBcURBE6OnftaMQWGas63NRU-itpEgZvhs8VVhG5hZ5IzfWV2meTjsg91RyXmkA1JIJgnGMCcDBx5705-3UEa8_AXgJAgphWALgruAD-6ozCdPkfp10GoyuwcSvDbYdk1JpiygBPpBfR2pRR1qNnSUE9zX1njVmaeTQte1gyz_MWs')" }}></div>
                                <div className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors" onClick={(e) => { e.preventDefault(); toggleWishlist({ id: 2, title: "Klara and the Sun", author: "Kazuo Ishiguro", price: 22.00, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTsCI3f0JWTqEDp_uBknAWFR3TJ_XEauSTG4k9OBPpcIiVy-NuZmOI-I8OPLn8r2UIUna6uuJ-MCElZA-veoKuyLY9zXIDwNlBcURBE6OnftaMQWGas63NRU-itpEgZvhs8VVhG5hZ5IzfWV2meTjsg91RyXmkA1JIJgnGMCcDBx5705-3UEa8_AXgJAgphWALgruAD-6ozCdPkfp10GoyuwcSvDbYdk1JpiygBPpBfR2pRR1qNnSUE9zX1njVmaeTQte1gyz_MWs" }); }}>
                                    <span className={`material-symbols-outlined block text-[16px] ${isInWishlist(2) ? 'text-red-500 font-variation-FILL' : 'text-white'}`}>favorite</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-serif text-lg font-bold text-white truncate">Klara and the Sun</h4>
                                <p className="text-sm text-slate-400">Kazuo Ishiguro</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">New</span>
                                    <span className="text-sm font-medium text-slate-500 line-through">$28.00</span>
                                    <span className="text-sm font-bold text-white">$22.00</span>
                                </div>
                            </div>
                        </div>
                        {/* Product Card */}
                        <div className="card-tilt group rounded-xl bg-surface-highlight border border-white/5 p-4 hover:border-primary/30 transition-colors">
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
                                <div className="h-full w-full bg-cover bg-center" data-alt="Minimalist typography book cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLoZ5-pYvMiBlFlJCLcpxnMHTKPEKXPDCugyzgrC3XL5RfPHyokqlzacQEcnfy-KD9mWoovm-y1Y0MiL4W66T0WWXTZVnnag73hPjgYy4PY72dy0SxIrVA6-sYr58t6QMRetVIbvoek9USwUenroerODcfNAjiMWVHCkFkpQtdUWIynTHzMHhyZaIorLRwpwX2JM8AeM3LPW5yZ7yFa3Gt3D7dFcWIsMSV5c5xJrCq5MoArk9EVFeDnuHS-zEB_7HHq_Au8b9cnyQ')" }}></div>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-serif text-lg font-bold text-white truncate">Dune</h4>
                                <p className="text-sm text-slate-400">Frank Herbert</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px] text-slate-400">star</span>
                                    <span className="text-sm text-white">4.9</span>
                                    <span className="text-sm font-bold text-white ml-auto">$18.99</span>
                                </div>
                            </div>
                        </div>
                        {/* Product Card */}
                        <div className="card-tilt group rounded-xl bg-surface-highlight border border-white/5 p-4 hover:border-primary/30 transition-colors">
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
                                <div className="h-full w-full bg-cover bg-center" data-alt="Abstract art colorful book cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXVQ9xcXMP7T6k5pzSGcC0FPjUdrcTDuwtXNTLfttFB8djb6HY4_K4hJY1NPYKzvSY2MBK0unhLeWiO9vMVcuKGhOOALRJdOiYRUb16lbFehYITr1cLkWlw8aKh23BcZCB6UI0dYT4EkrkUZX2rdRH3r0sOvb-cfoh_WIEwFG000yC-yiDA7l51138eUOQiXMXAPdj9tKwOafyoB9Fn1LOySjp5fDrZLshVwWjtnBTMWN8fqHtkfp5FSfyV2gfrCb6PFw43Et509Q')" }}></div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
                                    <button className="rounded-full bg-white p-3 text-black hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined block">play_arrow</span>
                                    </button>
                                </div>
                                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 backdrop-blur-md">
                                    <span className="material-symbols-outlined text-[12px] text-white">graphic_eq</span>
                                    <span className="text-[10px] font-bold text-white">12h 4m</span>
                                </div>
                                <div className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors" onClick={(e) => { e.preventDefault(); toggleWishlist({ id: 3, title: "The Silent Patient", author: "Alex Michaelides", price: 14.95, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVQ9xcXMP7T6k5pzSGcC0FPjUdrcTDuwtXNTLfttFB8djb6HY4_K4hJY1NPYKzvSY2MBK0unhLeWiO9vMVcuKGhOOALRJdOiYRUb16lbFehYITr1cLkWlw8aKh23BcZCB6UI0dYT4EkrkUZX2rdRH3r0sOvb-cfoh_WIEwFG000yC-yiDA7l51138eUOQiXMXAPdj9tKwOafyoB9Fn1LOySjp5fDrZLshVwWjtnBTMWN8fqHtkfp5FSfyV2gfrCb6PFw43Et509Q" }); }}>
                                    <span className={`material-symbols-outlined block text-[16px] ${isInWishlist(3) ? 'text-red-500 font-variation-FILL' : 'text-white'}`}>favorite</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-serif text-lg font-bold text-white truncate">The Silent Patient</h4>
                                <p className="text-sm text-slate-400">Alex Michaelides</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs text-slate-500">Audiobook</span>
                                    <span className="text-sm font-bold text-white">$14.95</span>
                                </div>
                            </div>
                        </div>
                        {/* Explore Category Card */}
                        <Link className="group relative flex flex-col justify-center items-center rounded-xl bg-gradient-to-br from-surface-highlight to-surface-dark border border-white/5 p-4 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_-5px_rgba(115,81,251,0.2)]" to="/shop">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                <span className="material-symbols-outlined text-[32px]">explore</span>
                            </div>
                            <h4 className="font-serif text-xl font-bold text-white">Browse All</h4>
                            <p className="text-center text-sm text-slate-400 mt-2">Discover over 10,000 titles in our library</p>
                            <span className="mt-4 text-sm font-bold text-primary group-hover:text-white flex items-center gap-1">
                                Go to Library <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Audio Experience Section */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-background-dark">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent"></div>
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
                        <div className="lg:w-1/2">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <span className="material-symbols-outlined text-[14px]">headphones</span>
                                Spatial Audio Ready
                            </div>
                            <h2 className="font-serif text-4xl font-black text-white sm:text-5xl">Immersive Audio</h2>
                            <p className="mt-6 text-lg text-slate-400">Let the world's best narrators transport you. Our premium audiobooks feature cinematic soundscapes and Dolby Atmos support for a truly surrounding experience.</p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <div className="flex items-center gap-4 rounded-lg bg-surface-highlight border border-white/5 p-4 pr-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(115,81,251,0.4)]">
                                        <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white">The Sandman</span>
                                        <span className="text-xs text-slate-400">Neil Gaiman • Act I</span>
                                    </div>
                                    <div className="ml-4 flex h-8 gap-0.5 items-end">
                                        <div className="w-1 bg-primary h-3 animate-pulse"></div>
                                        <div className="w-1 bg-primary h-6 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1 bg-primary h-4 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-1 bg-primary h-8 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                        <div className="w-1 bg-primary h-5 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1 bg-primary h-2 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                        <div className="w-1 bg-primary h-6 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative lg:w-1/2">
                            <div className="relative mx-auto aspect-square w-full max-w-md">
                                {/* Vinyl/CD representation or abstract sound waves */}
                                <div className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-tr from-surface-highlight to-black p-8 shadow-2xl">
                                    <div className="h-full w-full rounded-full border border-white/5 bg-[url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-50" data-alt="Abstract sound wave texture"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-32 w-32 rounded-full bg-background-dark shadow-2xl flex items-center justify-center border border-white/10">
                                        <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                                    </div>
                                </div>
                                {/* Floating cards over audio visual */}
                                <div className="absolute -right-4 top-10 w-48 rounded-lg border border-white/10 bg-surface-dark/90 p-3 backdrop-blur-md shadow-xl animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-cover bg-center" data-alt="Book cover thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBz4xTmTM8RJAD7u51qsDQ9gFvqdrP08gLM9di6IzAUcKhbp8qJ4nKF7_t67wCA-biwmP4HwjvM8tlR6-Yzisnn4y8frrPiaGXjORgECxZICMlq0Tr-qIiaT8poniWVshpmzpAXQr4hQyq9wkCR0cnu66tbiGCff06IsWcIZcvam5eTGn9yKeAhvRW_12Lih4mhEaxwh3P3MhYgNeVcPlTSBwZykRd0pTEyfR2wEFBjLVcRdAxMezj7IZkiww6NQMafKVjMeviK5SA')" }}></div>
                                        <div>
                                            <div className="text-xs font-bold text-white">Sherlock Holmes</div>
                                            <div className="text-[10px] text-slate-400">Stephen Fry</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -left-4 bottom-20 w-48 rounded-lg border border-white/10 bg-surface-dark/90 p-3 backdrop-blur-md shadow-xl animate-float-delayed">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-cover bg-center" data-alt="Book cover thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBW8Qm0MzOy5CxZ-gSa24kVjz4I4im9-2VmdenY3koCGeOmfGyPREQ7v1d7oMps4DeKTkgq2gCMLbyEQFY_n4Wxcy1kNgs5htE5_0jMPbxBC-DWVVVK21pFrS4RiM1l1DcQYsZ1YgD7OfKFpcXi0lYAcqbXBxuOG5JLKePfh-mm3Htj-_Ij_vbb0JcwV6XVX1LS8SmqJuoCplABaLvGhyPS5w7-XWUQeovI9KHFbg8Fe_uOzHrOkxpcptgS-CgBIRBegsik81O63CQ')" }}></div>
                                        <div>
                                            <div className="text-xs font-bold text-white">Becoming</div>
                                            <div className="text-[10px] text-slate-400">Michelle Obama</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals (Dynamic) */}
            <section className="py-24 bg-surface-dark border-t border-white/5">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="font-serif text-3xl font-bold text-white">Fresh from the Press</h2>
                            <p className="mt-2 text-slate-400">The latest additions to our collection.</p>
                        </div>
                        <Link to="/shop" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
                            View All
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="group relative flex flex-col">
                                <Link to={`/product/${product.id}`} className="relative aspect-[2/3] overflow-hidden rounded-lg bg-surface-highlight border border-white/5 mb-4 shadow-md group-hover:shadow-xl transition-all">
                                    {product.image ? (
                                        <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${product.image}')` }}></div>
                                    ) : (
                                        <div className={`h-full w-full bg-gradient-to-br ${product.color || 'from-slate-700 to-slate-800'} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                                    )}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                                            className={`rounded-full bg-black/60 p-1.5 backdrop-blur-md hover:bg-black/80 transition-colors ${isInWishlist(product.id) ? 'text-red-500' : 'text-white'}`}
                                        >
                                            <span className={`material-symbols-outlined block text-[16px] ${isInWishlist(product.id) ? 'font-variation-FILL' : ''}`}>favorite</span>
                                        </button>
                                    </div>
                                </Link>
                                <div className="flex-1">
                                    <h3 className="font-serif text-lg font-bold text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                                        <Link to={`/product/${product.id}`}>{product.title}</Link>
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-2">{product.author}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="font-bold text-white">${product.price}</span>
                                        <button
                                            onClick={() => handleQuickAdd(product.id, product.title, product.author, product.price, product.image)}
                                            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary transition-colors"
                                            title="Add to Cart"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Genre Grid */}
            <section className="py-24 px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-8 font-serif text-3xl font-bold text-white">Browse by Genre</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Link className="group relative overflow-hidden rounded-xl h-40" to="/shop?category=Sci-Fi">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Sci-Fi nebulas and stars" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWWouYU1IbCigQEJkoZSaCZHdWdvxmNMf1796-y0EPE177RcV1AXUNgMbYPUy_SyDtw_8KNnNQWXzl9Oz_lSMK1BktaT9aELmtRQwUVH_apMxt-d--YBzTIb0y3iJN3jNZrY7OBmsKLjm1hcI9KzxMbbVCcEsLGAB2Jlw9nj8_Yu68_jLAYldNjE3dZcb8I7X0suC5vhg_HpOJGzF5Zo4FSSG5TNobYQw04phJzUx3uduHwmv3j8HjB-ctuQomvzm4-4zrpfhHrtU')" }}>
                                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply transition-opacity group-hover:bg-primary/50"></div>
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-serif text-xl font-bold text-white drop-shadow-md">Sci-Fi</span>
                            </div>
                        </Link>
                        <Link className="group relative overflow-hidden rounded-xl h-40" to="/shop?category=Fantasy">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Fantasy forest mystic" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTnxK-LAGCsmAD3ioo2yHKBCdl-Kdtl2HC9TZgpHPOLLvTxzakBiYEo3B-sLYnCeffdqs1c-x3QrYODbbrJILQIheg7qmzllz2hqrtL7fPRfTpVk1kPuFv3cIjMt_IRathqWSwQ7HU5SXRSuLRdQmLEh2B7-6YFciokx7rAoTh_xF7VSOORmJrDhUESEtVKphZbWnFWXpAFxXvjJvJQ6YPpuFesXcz7d8uNrJ-Iy_lJ8W_KZDlozfpaesZRODzlpFuylI0Zs0aK40')" }}>
                                <div className="absolute inset-0 bg-emerald-600/40 mix-blend-multiply transition-opacity group-hover:bg-emerald-600/50"></div>
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-serif text-xl font-bold text-white drop-shadow-md">Fantasy</span>
                            </div>
                        </Link>
                        <Link className="group relative overflow-hidden rounded-xl h-40" to="/shop?category=Mystery">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Mystery dark alley fog" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCutGpVaQw3P4PHHYWXRx3sbMiR7pwtIg2lVvQvD7ORbV9yZEc32LKqKskYIU6R7sgRdzYdtS_8Elgj5YQ5MoPEzOg5CbE9T_gE90Zk8Z0dMPLREfPigxHgwSf_dscdcEhE3JITVsTYVa6VLCElTWdTUKawEPDMGzZw4b3fehFYYV8dKBZPsVWiwFStKurrHhDlwX5d5I_UjoXxiweaW0p9JCq2JwJ-DOWVHJ600CVQ9fkMDdFA_aaebelrHOu0HOb6vDg6b9c2T20')" }}>
                                <div className="absolute inset-0 bg-indigo-600/40 mix-blend-multiply transition-opacity group-hover:bg-indigo-600/50"></div>
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-serif text-xl font-bold text-white drop-shadow-md">Mystery</span>
                            </div>
                        </Link>
                        <Link className="group relative overflow-hidden rounded-xl h-40" to="/shop?category=History">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="History vintage maps" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuACovEmYFPs99PUo-KdLZGrJlVzFmjcLTj8ehf7SnUCGaIgmywbL4aa5eQOFKEdUSKjVDCRIpCJnU052zrRYWEh_ZkhOgGFw_koI1d8KFCjVrchvbGZcHRs60QI_hSHbjEdoNtRDLbGgYFBqZB0-Qn14jyV3pbcBbQTjhNAFXdie3wycF3I2pAYIK0s6dYmxkI2JZqRuilKYZe0zcN9KniutSeGLy5Mhnc4hZKdxEGcPX-86zq7IqT6YlimOEgxCBeGg857tnyU8NU')" }}>
                                <div className="absolute inset-0 bg-amber-700/40 mix-blend-multiply transition-opacity group-hover:bg-amber-700/50"></div>
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-serif text-xl font-bold text-white drop-shadow-md">History</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Recently Viewed */}
            {(() => {
                const viewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
                const viewedProducts = viewedIds
                    .map(id => products.find(p => p.id === id))
                    .filter(Boolean)
                    .slice(0, 5);
                if (!viewedProducts.length) return null;
                return (
                    <section className="py-16 px-6 lg:px-8 border-t border-white/5">
                        <div className="mx-auto max-w-7xl">
                            <h2 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-lg">🕐</span> Recently Viewed
                            </h2>
                            <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
                                {viewedProducts.map(p => (
                                    <Link key={p.id} to={`/product/${p.id}`} className="group flex-shrink-0 w-32">
                                        <div className="w-32 h-48 rounded-xl overflow-hidden mb-2 bg-slate-800 shadow-lg group-hover:shadow-primary/20 transition-all">
                                            {p.image ? (
                                                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${p.color || 'from-slate-600 to-slate-800'} flex items-end p-2`}>
                                                    <span className="text-white text-xs font-bold line-clamp-2">{p.title}</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-white text-xs font-semibold line-clamp-1 group-hover:text-primary transition-colors">{p.title}</p>
                                        <p className="text-primary text-xs font-bold mt-0.5">${p.price}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })()}

            {/* Newsletter Section */}
            <section className="py-24 border-t border-white/5 bg-gradient-to-b from-background-dark to-surface-dark">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="font-serif text-3xl font-bold text-white mb-4">Stay Immersed</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join 50,000+ readers. Get exclusive access to limited editions, author interviews, and early bird releases.</p>
                    <NewsletterForm />
                </div>
            </section>
        </main>
    );
};

const NewsletterForm = () => {
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
        setEmail('');
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto flex items-center justify-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-6 py-4 animate-fade-in">
                <span className="text-2xl">🎉</span>
                <div className="text-left">
                    <p className="text-white font-bold text-sm">You're on the list!</p>
                    <p className="text-slate-400 text-xs">We'll send you the good stuff. No spam, ever.</p>
                </div>
            </div>
        );
    }

    return (
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
            />
            <button type="submit" className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                Subscribe
            </button>
        </form>
    );
};

export default HomePage;
