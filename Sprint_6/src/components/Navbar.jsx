import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartBadge from './CartBadge';
import LoginModal from './LoginModal';
import OrdersModal from './OrdersModal';

/**
 * Responsive Navigation Header Component with In-Place Login & My Orders modals
 * Fully optimized across all display sizes (Mobile, Tablet, Desktop)
 */
const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { theme, toggleTheme } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleOpenLogin = () => {
    closeMobileMenu();
    setLoginModalOpen(true);
  };

  const handleOpenOrders = () => {
    closeMobileMenu();
    setOrdersModalOpen(true);
  };

  const handleLogout = () => {
    closeMobileMenu();
    logout();
  };

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <span>Aurora<span style={{ color: 'var(--primary)' }}>.</span></span>
        </Link>

        {/* Center Navigation Links (Checkout removed as requested) */}
        <nav className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Shop All
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Shopping Cart
          </NavLink>

          {/* Mobile-Only Auth & Orders Section inside Dropdown */}
          <div className="mobile-auth-section">
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
            {isLoggedIn ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                <button
                  type="button"
                  onClick={handleOpenOrders}
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', padding: '0.65rem 1rem', fontWeight: 700 }}
                >
                  📦 My Orders ({user?.name?.split(' ')[0]})
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm"
                  style={{ width: '100%', color: 'var(--danger)', padding: '0.65rem 1rem', fontWeight: 700 }}
                >
                  Logout Account
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleOpenLogin}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', padding: '0.75rem 1rem', fontWeight: 700 }}
              >
                🔐 Sign In / Guest Login
              </button>
            )}
          </div>
        </nav>

        {/* Right Action Controls: Theme, Cart, Orders & Login/Logout Button */}
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle dark theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          <Link to="/cart" className="cart-icon-wrapper" aria-label="Shopping Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <CartBadge />
          </Link>

          {/* Desktop-Only Auth & Orders Buttons (Hidden on Mobile screens to prevent overflow) */}
          <div className="desktop-auth-section">
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setOrdersModalOpen(true)}
                  className="btn btn-outline btn-sm"
                  style={{ padding: '0.45rem 0.85rem', fontWeight: 700, borderRadius: 'var(--radius-full)' }}
                >
                  📦 My Orders
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--danger)', padding: '0.45rem 0.65rem', fontWeight: 600 }}
                  title="Sign out of your account"
                >
                  Logout ({user?.name?.split(' ')[0]})
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="btn btn-primary btn-sm"
                style={{ padding: '0.48rem 1.1rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}
              >
                🔐 Login
              </button>
            )}
          </div>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Popup Modals */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <OrdersModal isOpen={ordersModalOpen} onClose={() => setOrdersModalOpen(false)} />
    </header>
  );
};

export default Navbar;
