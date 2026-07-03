import React, { useState } from 'react';
import { CheckCircle2, Shield, Lock, Building2 } from 'lucide-react';

export default function Pricing({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [ordered, setOrdered] = useState(false);

  const handlePreOrder = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setOrdered(true);
      setEmail('');
      setTimeout(() => setOrdered(false), 6000);
    }
  };

  const includedItems = [
    "Sentinel wearable device",
    "Companion mobile app",
    "Encrypted evidence storage",
    "Emergency contact alerts (unlimited)",
    "USB charging cable",
    "1-year hardware warranty",
    "Free firmware updates for life"
  ];

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Safety that doesn't cost like a luxury gadget</h1>
          <p>
            Premium protection at an accessible price. Because everyone deserves to feel safe.
          </p>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Main Launch Special Card */}
          <div className="card" style={{ padding: '48px', border: '2px solid var(--primary)', position: 'relative', marginBottom: '48px', background: 'radial-gradient(circle at top right, rgba(255,69,0,0.1) 0%, rgba(22,22,48,0.65) 60%)' }}>
            <div style={{ position: 'absolute', top: '-14px', right: '32px', background: 'var(--primary)', color: '#fff', fontSize: '0.8rem', fontWeight: 800, padding: '6px 16px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 4px 12px rgba(255,69,0,0.5)' }}>
              Launch Special
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1 1 360px' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>Sentinel Core</h2>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, color: '#fff' }}>₹4,499</span>
                  <span style={{ fontSize: '1.4rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹5,999</span>
                </div>
                <p style={{ color: '#10B981', fontWeight: 700, fontSize: '0.95rem', marginBottom: '28px' }}>
                  One-time purchase. No subscriptions.
                </p>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-secondary)' }}>
                  What's Included:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {includedItems.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', fontSize: '0.98rem' }}>
                      <CheckCircle2 size={18} color="#FF4500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pre-order Form Box */}
              <div style={{ flex: '1 1 320px', background: 'rgba(0,0,0,0.4)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-strong)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', textAlign: 'center' }}>Reserve Your Sentinel</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '24px' }}>
                  Lock in launch pricing today. Pay when your order ships.
                </p>

                <form onSubmit={handlePreOrder}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  />
                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}>
                    Pre-order Now
                  </button>
                </form>

                {ordered && (
                  <div style={{ marginTop: '16px', color: '#10B981', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
                    ✅ Thank you! Your reservation has been recorded. We will email your pre-order confirmation shortly.
                  </div>
                )}

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  🔒 Secure checkout • Ships Q4 2025 • 30-day money-back guarantee
                </div>
              </div>
            </div>
          </div>

          {/* B2B Organizations Card */}
          <div className="card" style={{ padding: '40px', display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 420px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Building2 size={26} color="#FF4500" />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Sentinel for Organizations</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                Bulk pricing for universities, corporations, and organizations looking to provide safety devices to students, employees, or community members.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                  <CheckCircle2 size={16} color="#10B981" /> Volume discounts starting at 50 units
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                  <CheckCircle2 size={16} color="#10B981" /> Centralized management dashboard
                </li>
              </ul>
            </div>

            <div style={{ textAlign: 'center', flex: '1 1 240px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>BULK PRICING</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: '6px 0 20px' }}>
                Starting at ₹3,499 / unit
              </div>
              <button 
                onClick={() => setCurrentPage('contact')} 
                style={{ background: 'transparent', color: '#FF4500', border: '2px solid #FF4500', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', width: '100%' }}
              >
                Contact Sales
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
