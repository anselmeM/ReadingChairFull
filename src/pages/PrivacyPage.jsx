import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => (
    <div className="max-w-3xl mx-auto px-6 py-24 pt-28">
        <div className="mb-10">
            <Link to="/" className="text-sm text-slate-400 hover:text-primary transition-colors">← Back to Lumina</Link>
        </div>

        <h1 className="font-serif text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: February 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
            <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, including:</p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-slate-400">
                    <li><strong className="text-slate-300">Account info:</strong> Name, email address when you sign up</li>
                    <li><strong className="text-slate-300">Purchase info:</strong> Shipping address, payment method (processed securely by Stripe)</li>
                    <li><strong className="text-slate-300">Usage data:</strong> Pages viewed, books browsed, search queries</li>
                    <li><strong className="text-slate-300">Device info:</strong> Browser type, operating system, IP address</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Data</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-slate-400">
                    <li>Process and fulfill your orders</li>
                    <li>Personalize your browsing experience (e.g., "Recently Viewed")</li>
                    <li>Send transactional emails (order confirmations, receipts)</li>
                    <li>Improve our platform and fix bugs</li>
                    <li>Detect and prevent fraud</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">3. Cookies & Local Storage</h2>
                <p>We use browser <code className="bg-white/10 px-1 py-0.5 rounded text-primary text-sm">localStorage</code> to store your cart, wishlist, and recently viewed books between sessions. We may also use cookies for analytics and session management. You can decline non-essential cookies through our cookie banner.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Sharing</h2>
                <p>We do not sell your personal data. We may share data with:</p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-slate-400">
                    <li><strong className="text-slate-300">Stripe</strong> — for payment processing</li>
                    <li><strong className="text-slate-300">Shipping carriers</strong> — for order fulfillment</li>
                    <li><strong className="text-slate-300">Analytics providers</strong> — aggregated, anonymized usage data</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
                <p>We retain your account data for as long as your account is active. Order records may be kept for up to 7 years for legal and tax purposes. You can request deletion of your account at any time.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-slate-400">
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction or deletion of your data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Data portability (GDPR, CCPA)</li>
                </ul>
                <p className="mt-3">To exercise these rights, email us at <span className="text-primary">privacy@lumina.books</span></p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">7. Security</h2>
                <p>We use industry-standard encryption (TLS/HTTPS) for all data in transit. Payment data never touches our servers — it is processed directly by Stripe with PCI-DSS compliance.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">8. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically. We'll notify you via email for material changes. Continued use of the Service after changes constitutes acceptance.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">9. Contact Us</h2>
                <p>For privacy inquiries: <span className="text-primary">privacy@lumina.books</span></p>
            </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex gap-4 text-sm text-slate-500">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-primary transition-colors">Back to Shop</Link>
        </div>
    </div>
);

export default PrivacyPage;
