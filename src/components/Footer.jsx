import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-background-dark py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-500">auto_stories</span>
                        <span className="font-serif font-bold text-white">LUMINA</span>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-400">
                        <Link className="hover:text-white transition-colors" to="/privacy">Privacy</Link>
                        <Link className="hover:text-white transition-colors" to="/terms">Terms</Link>
                        <a className="hover:text-white transition-colors" href="mailto:support@lumina.books">Support</a>
                    </div>
                    <div className="flex gap-4">
                        <a className="text-slate-400 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
                        <a class="text-slate-400 hover:text-white transition-colors" href="#"><span class="material-symbols-outlined">public</span></a>
                    </div>
                </div>
                <div className="mt-8 text-center text-xs text-slate-600">
                    © 2023 Lumina Platform. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
