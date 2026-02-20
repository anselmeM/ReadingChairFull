import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => (
    <div className="max-w-3xl mx-auto px-6 py-24 pt-28">
        <div className="mb-10">
            <Link to="/" className="text-sm text-slate-400 hover:text-primary transition-colors">← Back to Lumina</Link>
        </div>

        <h1 className="font-serif text-4xl font-bold text-white mb-3">Terms of Service</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: February 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed">
            <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using the Lumina platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use the Service.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Use of the Service</h2>
                <p>You may use Lumina for personal, non-commercial purposes. You agree not to:</p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-slate-400">
                    <li>Reproduce or redistribute any content without permission</li>
                    <li>Attempt to reverse-engineer, hack, or disrupt the platform</li>
                    <li>Use the Service for any unlawful purpose</li>
                    <li>Share your account credentials with third parties</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">3. Digital Products & Downloads</h2>
                <p>Upon purchase, digital products (eBooks, Audiobooks) are licensed to you for personal use only. You may not resell, share, or distribute downloaded content. All sales of digital products are final unless the product is materially defective.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Physical Products & Shipping</h2>
                <p>For physical book orders, we aim to ship within 3–5 business days. Delivery estimates are not guaranteed. Risk of loss transfers to you upon handoff to the carrier. Returns are accepted within 30 days for unused items in original condition.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
                <p>All content on Lumina — including book covers, descriptions, audio files, and UI design — is owned by Lumina or licensed from rights holders. Nothing on this site grants you a license to use our intellectual property outside of normal browsing and purchasing.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">6. Disclaimer of Warranties</h2>
                <p>The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or meet specific requirements.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, Lumina shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service or inability to use it.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">8. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes your acceptance of the revised terms.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
                <p>For questions about these Terms, contact us at <span className="text-primary">legal@lumina.books</span></p>
            </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex gap-4 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-primary transition-colors">Back to Shop</Link>
        </div>
    </div>
);

export default TermsPage;
