import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Comprehensive Privacy & Data Policy Page Component
 */
const PrivacyPolicy = () => {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '900px' }}>
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Privacy & Data Security Policy</span>
      </nav>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
        Privacy & Cookie Policy
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.05rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        Effective Date: January 1, 2026 • Last Reviewed: July 2026
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>
            1. Collection of Personal Information
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            When you register an account, utilize our <strong>Instant Buy Now ⚡</strong> checkout, or communicate with our 24/7 support specialists, Aurora Store collects essential contact information including your full name, shipping recipient address, email address, and mobile phone number. We do NOT store sensitive banking credentials or full credit card PAN numbers on our application servers.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>
            2. Secure LocalStorage & Cart Persistence
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Aurora Store uses modern HTML5 Web Storage (such as `localStorage`) within your browser to persist your active shopping cart items, wishlist favorites, theme selection (Light/Dark mode), and local order records. This guarantees a seamless session experience across page refreshes without sending unnecessary tracking beacons.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>
            3. Payment Processing & 256-Bit SSL Encryption
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            All financial transactions conducted via Unified Payments Interface (UPI), Net Banking, or Credit/Debit Cards are routed through certified Level 1 PCI-DSS compliant financial institutions using 256-bit TLS encryption protocols.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>
            4. Third-Party Courier & GPS Sharing
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            To fulfill your orders within our promised 48-hour global express timeframe, we share only necessary fulfillment data (Recipient Name, Delivery Address, PIN Code, and Phone Number) with vetted logistics partners (such as BlueDart, FedEx, and DHL) exclusively for delivery dispatch and tracking SMS alerts.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>
            5. Your Data Erasure Rights
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            You maintain full sovereignty over your personal data. You may request complete erasure of your saved profile details or order history records at any time by contacting our Privacy Officer at <strong style={{ color: 'var(--text-main)' }}>privacy@aurora.store</strong> or submitting a direct ticket through our Help Center.
          </p>
        </section>
      </div>

      <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Have Questions About Your Privacy?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          We are committed to absolute transparency regarding how your personal information is protected.
        </p>
        <Link to="/help" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
          Visit Help & Support Portal →
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
