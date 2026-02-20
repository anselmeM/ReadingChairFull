import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import CartPage from '../pages/CartPage';
import ProductPage from '../pages/ProductPage';
import DashboardPage from '../pages/DashboardPage';
import CheckoutPage from '../pages/CheckoutPage';
import DiscoveryPage from '../pages/DiscoveryPage';
import AudiobookPage from '../pages/AudiobookPage';
import TermsPage from '../pages/TermsPage';
import PrivacyPage from '../pages/PrivacyPage';
import PageTransition from './PageTransition';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import ProductListPage from '../pages/admin/ProductListPage';
import ProductFormPage from '../pages/admin/ProductFormPage';

const AnimatedRoutes = () => {
    const location = useLocation();

    // Admin routes bypass the main layout/animation
    if (location.pathname.startsWith('/admin')) {
        return (
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="products" element={<ProductListPage />} />
                    <Route path="products/new" element={<ProductFormPage />} />
                    <Route path="products/edit/:id" element={<ProductFormPage />} />
                </Route>
            </Routes>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
                <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
                <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
                <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />
                <Route path="/discover" element={<PageTransition><DiscoveryPage /></PageTransition>} />
                <Route path="/audiobooks" element={<PageTransition><AudiobookPage /></PageTransition>} />
                <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
