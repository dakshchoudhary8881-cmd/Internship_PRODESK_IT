import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

/**
 * 30-Day Easy Returns Policy Page Component
 */
const ReturnsPolicy = () => {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem' }}>
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>30-Day Easy Returns</span>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔄</div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem' }}>
            30-Day Easy Returns Policy
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem' }}>
            We want you to love everything you buy from Aurora Store. If you aren't completely satisfied, returning your purchase is effortless and hassle-free.
          </p>
        </div>

        {/* 3 Step Return Flow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📋</div>
            <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>1. Request Return</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Select your item in your order history and state your reason for return within 30 days of delivery.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🚚</div>
            <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>2. Doorstep Pickup</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Our courier executive will collect the packaged product directly from your home within 24–48 hours.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💰</div>
            <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>3. Instant Refund</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Once quality inspection completes, refunds are credited back to your original source mode or UPI instantly.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Eligibility & Conditions</h2>
          <ul style={{ paddingLeft: '1.2rem', listStyle: 'disc', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>Products must be returned in their original condition with all tags, brand boxes, warranty cards, and accessories intact.</li>
            <li>Fragrances, opened skincare, hygiene products, and customized goods are non-returnable due to health safety protocols.</li>
            <li>If an item is received damaged or defective upon arrival, please report it within 48 hours for immediate priority exchange.</li>
          </ul>

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link to="/help">
              <Button variant="outline">Contact Customer Support →</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;
