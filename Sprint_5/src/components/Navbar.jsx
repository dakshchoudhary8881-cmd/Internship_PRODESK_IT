import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'technology', label: 'Technology' },
    { id: 'app', label: 'App' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <div 
          className="nav-logo" 
          onClick={() => handleNavClick('home')} 
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-badge">S</div>
          <span>SENTINEL</span>
        </div>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
          {mobileOpen && (
            <li style={{ marginTop: '16px' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%' }}
                onClick={() => handleNavClick('pricing')}
              >
                Pre-order
              </button>
            </li>
          )}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="btn-primary" 
            style={{ padding: '8px 18px', fontSize: '0.9rem' }}
            onClick={() => handleNavClick('pricing')}
          >
            Pre-order
          </button>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
