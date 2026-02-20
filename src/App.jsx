import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AnimatedRoutes from './components/AnimatedRoutes';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';

// ── Error Boundary to surface runtime crashes ─────────────────────────────
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, info: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        this.setState({ info });
        console.error('App crashed:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh', background: '#0D0D0F', color: 'white',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '2rem', fontFamily: 'monospace'
                }}>
                    <h1 style={{ color: '#ef4444', fontSize: '1.5rem', marginBottom: '1rem' }}>
                        ⚠️ App Error Detected
                    </h1>
                    <pre style={{
                        background: '#18181b', padding: '1rem', borderRadius: '0.5rem',
                        maxWidth: '800px', width: '100%', overflow: 'auto',
                        fontSize: '0.8rem', color: '#fca5a5', whiteSpace: 'pre-wrap'
                    }}>
                        {this.state.error?.toString()}
                        {'\n\n'}
                        {this.state.info?.componentStack}
                    </pre>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null, info: null })}
                        style={{
                            marginTop: '1.5rem', background: '#7351fb', color: 'white',
                            border: 'none', padding: '0.5rem 1.5rem', borderRadius: '0.5rem',
                            cursor: 'pointer', fontSize: '0.9rem'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

function App() {
    return (
        <ErrorBoundary>
            <ProductProvider>
                <CartProvider>
                    <WishlistProvider>
                        <OrderProvider>
                            <Router>
                                <Layout>
                                    <AnimatedRoutes />
                                </Layout>
                            </Router>
                        </OrderProvider>
                    </WishlistProvider>
                </CartProvider>
            </ProductProvider>
        </ErrorBoundary>
    );
}

export default App;
