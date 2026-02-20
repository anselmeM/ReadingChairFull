import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConsentBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('cookieConsent');
        if (!accepted) {
            // Show after a short delay so it doesn't pop instantly
            const t = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(t);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-40 p-4 lg:p-6">
            <div className="max-w-3xl mx-auto lg:ml-auto lg:mr-6 bg-[#12102a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl flex-shrink-0">🍪</span>
                    <div>
                        <p className="text-white font-semibold text-sm">We use cookies</p>
                        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                            We use cookies to personalize content and improve your experience.
                            See our{' '}
                            <Link to="/privacy" className="text-primary hover:underline" onClick={() => setVisible(false)}>Privacy Policy</Link>
                            {' '}for details.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                        onClick={decline}
                        className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={accept}
                        className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/80 transition-colors"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentBanner;
