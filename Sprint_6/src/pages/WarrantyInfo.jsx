import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

/**
 * Comprehensive Warranty Information Page Component
 */
const WarrantyInfo = () => {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem' }}>
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Warranty Information</span>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🛡️</div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem' }}>
            Genuine Product Warranty
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem' }}>
            Every product cataloged on Aurora Store is backed by official manufacturer warranties and our comprehensive quality assurance guarantees.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '2.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--primary)' }}>
              1. Standard Manufacturer Protection
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              All electronics, appliances, and branded lifestyle accessories come standard with a minimum 1-to-2 year manufacturer warranty against hardware defects, component failure, and assembly flaws. Simply retain your Aurora order invoice as proof of purchase.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '2.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--primary)' }}>
              2. Aurora Shield Replacement Guarantee
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              Should a covered item experience functional breakdown within the first 14 days of delivery, Aurora Store directly arranges expedited door-to-door replacement at zero courier cost to you, bypassing lengthy brand service center wait times.
            </p>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '2.25rem', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--border-color)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              How to Register a Warranty Claim
            </h3>
            <ol style={{ paddingLeft: '1.4rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.6rem', lineHeight: '1.6' }}>
              <li>Locate your digital tax invoice from your account order confirmation email.</li>
              <li>Photograph or record a short video clip clearly illustrating the functional fault.</li>
              <li>Submit your claim via our Help Center support form or contact authorized brand service partners directly.</li>
            </ol>
          </div>
        </div>

        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <Link to="/shop">
            <Button variant="primary" size="lg">Explore Protected Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WarrantyInfo;
