import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

// Customer Care Pages
import HelpCenter from './pages/HelpCenter';
import ReturnsPolicy from './pages/ReturnsPolicy';
import WarrantyInfo from './pages/WarrantyInfo';
import PrivacyPolicy from './pages/PrivacyPolicy';

/**
 * Helper component that automatically scrolls window to top on route navigation
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * Global Toast Notification Overlay Component
 */
const ToastOverlay = () => {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast" key={toast.id}>
        <span>{toast.type === 'info' ? 'ℹ️' : '✅'}</span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ToastOverlay />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />

                {/* Customer Care Routes */}
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/returns" element={<ReturnsPolicy />} />
                <Route path="/warranty" element={<WarrantyInfo />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
