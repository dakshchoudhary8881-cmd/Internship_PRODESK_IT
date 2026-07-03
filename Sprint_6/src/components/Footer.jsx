import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Modern Responsive Footer Component
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="navbar-brand" style={{ marginBottom: '1rem' }}>
              <div className="brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <span>Aurora<span style={{ color: 'var(--primary)' }}>.</span></span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '340px', marginBottom: '1.5rem' }}>
              Experience next-generation online retail with curated lifestyle items, lightning-fast global dispatch, and zero-risk shopping.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
              <span style={{ cursor: 'pointer' }}>𝕏</span>
              <span style={{ cursor: 'pointer' }}>📸</span>
              <span style={{ cursor: 'pointer' }}>💼</span>
              <span style={{ cursor: 'pointer' }}>✉️</span>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop All Products</Link></li>
              <li><Link to="/cart">Your Shopping Cart</Link></li>
              <li><Link to="/checkout">Fast Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/shop?cat=beauty">Beauty & Fragrances</Link></li>
              <li><Link to="/shop?cat=groceries">Premium Gourmet</Link></li>
              <li><Link to="/shop?cat=furniture">Modern Living</Link></li>
              <li><Link to="/shop?cat=electronics">Gadgets & Tech</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center & FAQ</Link></li>
              <li><Link to="/returns">30-Day Easy Returns</Link></li>
              <li><Link to="/warranty">Warranty Information</Link></li>
              <li><Link to="/privacy">Privacy & Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Aurora Store SPA. Built for Frontend Architect Sprint Evaluation.</p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
