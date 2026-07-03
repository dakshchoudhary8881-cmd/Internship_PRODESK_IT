import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Button from '../components/Button';

/**
 * Premium Home Landing Page Component with Customer Reviews
 */
const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(4, 0)
      .then(res => {
        setFeaturedProducts(res.products || []);
      })
      .catch(err => console.error('Error fetching featured products:', err))
      .finally(() => setLoading(false));
  }, []);

  // Curated customer testimonials
  const reviews = [
    {
      id: 1,
      name: 'Elena Rostova',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Aurora Store is hands down the best E-Commerce platform I have used. My makeup items arrived in New York under 24 hours with super secure eco-friendly packaging!'
    },
    {
      id: 2,
      name: 'Marcus Vance',
      role: 'Tech Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'The Instant Buy Now feature is blazing fast! Placing orders via UPI took meliterally 3 seconds. Plus their customer care team resolved my warranty query in minutes.'
    },
    {
      id: 3,
      name: 'Sophia Chen',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Top-tier product curation. Everything feels premium, the dark mode aesthetics are gorgeous, and the real-time order tracking dashboard keeps you updated every step.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div>
            <div className="hero-badge">
              <span>✨</span> Next-Gen Shopping Experience
            </div>
            <h1 className="hero-title">
              Elevate Your <br />
              <span className="gradient-text">Lifestyle Today.</span>
            </h1>
            <p className="hero-subtitle">
              Discover a curated selection of world-class goods, smart tech, and modern luxuries. Crafted for discerning tastes and delivered with speed.
            </p>
            <div className="hero-buttons">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/shop')}
              >
                Shop Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/shop')}
              >
                Explore Offers
              </Button>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                height: '420px',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, var(--primary-light), rgba(244, 63, 94, 0.15))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              <img
                src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
                alt="Featured Hero Product"
                style={{ width: '75%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(12px)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Essence Lash Princess</div>
                  <div style={{ color: 'var(--primary)', fontWeight: 700 }}>Exclusive Collection</div>
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--text-main)' }}>$9.99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions / Feature Cards */}
      <section className="container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Why Choose Aurora</h2>
          <p style={{ color: 'var(--text-muted)' }}>We combine cutting-edge technology with unbending quality control.</p>
        </div>

        <div className="features-grid" style={{ marginTop: '0' }}>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Fast Delivery</h3>
            <p className="feature-desc">
              Global express shipping directly to your doorstep within 48 hours. Real-time GPS order tracking included.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3 className="feature-title">Premium Products</h3>
            <p className="feature-desc">
              Every item is rigorously tested and verified by our specialized curation team for unmatched durability.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure Payments</h3>
            <p className="feature-desc">
              Bank-grade 256-bit SSL encryption protecting all transactions. Multiple payment methods seamlessly supported.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <span className="product-category">Editor's Pick</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Trending Products</h2>
          </div>
          <Button variant="ghost" onClick={() => navigate('/shop')}>
            View All Products →
          </Button>
        </div>

        {loading ? (
          <Loader skeleton count={4} />
        ) : (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Customer Reviews & Testimonials Section */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '5rem 1.5rem', marginTop: '2rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span className="product-category">Customer Stories</span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginTop: '0.4rem' }}>Loved by Thousands of Shoppers</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Read authentic feedback from shoppers who trust Aurora Store for everyday luxuries and lightning-speed dispatch.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {reviews.map(rev => (
              <div
                key={rev.id}
                style={{
                  background: 'var(--bg-card)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ color: '#F59E0B', fontSize: '1.25rem', marginBottom: '1rem', letterSpacing: '2px' }}>
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.98rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.75rem' }}>
                    "{rev.comment}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{rev.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>✓</span> {rev.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
