import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AudioPlayer from './AudioPlayer';
import ConsentBanner from './ConsentBanner';

const Layout = ({ children }) => {
    const location = useLocation();
    const isCheckout = location.pathname === '/checkout';

    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-900">
            {!isCheckout && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            <AudioPlayer />
            {!isCheckout && <Footer />}
            <ConsentBanner />
        </div>
    );
};

export default Layout;
