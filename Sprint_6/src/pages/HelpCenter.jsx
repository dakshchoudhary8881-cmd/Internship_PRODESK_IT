import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

/**
 * Help Center & Interactive Support Page Component
 */
const HelpCenter = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState({ subject: '', orderId: '', message: '' });

  const faqs = [
    {
      q: 'How do I track the status of my order?',
      a: 'Once your order is successfully placed, an Order ID (e.g., AUR-582910) is generated. You can click on "📦 My Orders" in the top navigation bar anytime to check live dispatch and delivery updates.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit and debit cards, UPI applications (Google Pay, PhonePe, Paytm), Net Banking across 50+ banks, and Cash on Delivery (COD).'
    },
    {
      q: 'How does the Instant Buy Now feature work?',
      a: 'Clicking "Buy Now ⚡" on any product bypasses your standard cart and takes you straight to single-item express checkout without modifying or clearing your existing cart items.'
    },
    {
      q: 'Can I initiate a return or claim warranty?',
      a: 'Absolutely. Visit our dedicated Returns Policy or Warranty Information pages via the footer links below to initiate hassle-free doorstep returns within 30 days.'
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketData({ subject: '', orderId: '', message: '' });
      alert('Your support query has been logged! Ticket ID #TICK-8921 sent to your email.');
    }, 1200);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem' }}>
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Help Center & FAQ</span>
      </nav>

      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎧</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem' }}>
          How Can We Help You?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Find instant answers to common questions regarding orders, deliveries, payments, and account management.
        </p>
      </div>

      {/* Quick Redirect Hub */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '850px', margin: '0 auto 4rem' }}>
        <div onClick={() => navigate('/returns')} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', cursor: 'pointer', textAlign: 'center', transition: 'all var(--transition-fast)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
          <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>Returns Portal</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Initiate 30-day returns</p>
        </div>
        <div onClick={() => navigate('/warranty')} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', cursor: 'pointer', textAlign: 'center', transition: 'all var(--transition-fast)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
          <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>Warranty Claims</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Check coverage status</p>
        </div>
        <div onClick={() => navigate('/shop')} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', cursor: 'pointer', textAlign: 'center', transition: 'all var(--transition-fast)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛍️</div>
          <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>Product Catalog</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Browse new arrivals</p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: `1px solid ${isOpen ? 'var(--primary)' : 'var(--border-color)'}`,
                  overflow: 'hidden',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.3rem', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-muted)', lineHeight: '1.7', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Interactive Support Ticket Form */}
      <div style={{ background: 'var(--bg-subtle)', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', maxWidth: '750px', margin: '0 auto', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>Submit a Support Query</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', fontSize: '0.95rem' }}>
          Fill out the quick form below and an Aurora customer specialist will respond directly to your account within 2 hours.
        </p>

        <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Subject Category</label>
              <select
                className="form-input"
                value={ticketData.subject}
                onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                required
              >
                <option value="">Select Topic...</option>
                <option value="Order Status">Order Tracking / Dispatch Status</option>
                <option value="Payment Issue">Payment / Refund Query</option>
                <option value="Product Quality">Product & Warranty Query</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Order ID (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. AUR-928104"
                value={ticketData.orderId}
                onChange={(e) => setTicketData({ ...ticketData, orderId: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Message Details</label>
            <textarea
              rows={4}
              className="form-input"
              placeholder="Explain how we can assist you today..."
              value={ticketData.message}
              onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
              required
            ></textarea>
          </div>

          <Button type="submit" variant="primary" size="lg" loading={ticketSubmitted}>
            📨 Submit Support Ticket
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;
