import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Get in touch</h1>
          <p>
            Questions about Sentinel? Want to partner with us? We're here to help.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section">
        <div className="container" style={{ maxWidth: '1050px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '48px', alignItems: 'start' }}>
            
            {/* Form Card */}
            <div className="card" style={{ padding: '40px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>Send us a message</h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Tell us how we can help..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}>
                  <Send size={18} /> Send Message
                </button>
              </form>

              {sent && (
                <div style={{ marginTop: '20px', padding: '14px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} /> Thank you! Your message has been sent. We'll be in touch soon.
                </div>
              )}
            </div>

            {/* Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={22} color="#FF4500" /> Direct Inquiries
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.98rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>General Inquiries:</span>
                    <a href="mailto:hello@sentinel.safety" style={{ display: 'block', fontWeight: 700, color: '#fff', marginTop: '2px' }}>hello@sentinel.safety</a>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Press & Media:</span>
                    <a href="mailto:press@sentinel.safety" style={{ display: 'block', fontWeight: 700, color: '#fff', marginTop: '2px' }}>press@sentinel.safety</a>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Partnerships & Sales:</span>
                    <a href="mailto:partners@sentinel.safety" style={{ display: 'block', fontWeight: 700, color: '#fff', marginTop: '2px' }}>partners@sentinel.safety</a>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={22} color="#FF4500" /> Headquarters
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Bangalore, Karnataka, India
                </p>
              </div>

              <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={22} color="#FF4500" /> Office Hours
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Monday - Friday:</span> <strong style={{ color: '#fff' }}>9:00 AM - 6:00 PM IST</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Saturday:</span> <strong style={{ color: '#fff' }}>10:00 AM - 2:00 PM IST</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Sunday:</span> <strong style={{ color: 'var(--text-muted)' }}>Closed</strong>
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 20px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
                ⚠️ For urgent safety-related emergencies, please immediately contact local emergency services (112 / 911) in your area.
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
