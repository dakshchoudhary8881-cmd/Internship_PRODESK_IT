import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import Button from '../components/Button';

/**
 * Detailed Product Page Component
 */
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gallery active image state and Quantity state
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then(data => {
        setProduct(data);
        setActiveImage(data.thumbnail || (data.images && data.images[0]));
      })
      .catch(err => {
        setError(err.message || 'Could not fetch product details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1rem' }}>
        <Loader text="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😞</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Product Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {error || 'The requested product could not be located on our servers.'}
        </p>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Back To Shop
        </Button>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const images = product.images || [product.thumbnail];
  const discount = product.discountPercentage || 0;
  const originalPrice = discount > 0 
    ? (product.price / (1 - discount / 100)).toFixed(2) 
    : null;

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: {
        buyNowItem: {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || (product.images && product.images[0]),
          quantity: quantity
        }
      }
    });
  };

  return (
    <div className="container product-details-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop?cat=${product.category}`} style={{ textTransform: 'capitalize' }}>
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{product.title}</span>
      </nav>

      <div className="product-details-grid">
        {/* Left: Interactive Image Gallery */}
        <div className="gallery-container">
          <div className="main-image-wrapper">
            <img src={activeImage} alt={product.title} className="main-image" />
          </div>

          {images.length > 1 && (
            <div className="thumbnails-grid">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumbnail-btn ${activeImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Detailed Specifications & CTA */}
        <div className="details-info">
          {product.brand && <div className="details-brand">{product.brand}</div>}
          <h1 className="details-title">{product.title}</h1>

          <div className="details-rating-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--warning)', fontWeight: 700, fontSize: '1.1rem' }}>
              <span>★</span>
              <span>{product.rating ? product.rating.toFixed(1) : '4.5'}</span>
            </div>
            <span style={{ color: 'var(--text-light)' }}>|</span>
            <span className={`stock-badge ${product.stock > 0 ? 'stock-in' : 'stock-out'}`}>
              {product.availabilityStatus || (product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock')}
            </span>
          </div>

          <div className="details-price-row">
            <span className="details-price">${product.price.toFixed(2)}</span>
            {originalPrice && (
              <>
                <span className="old-price" style={{ fontSize: '1.4rem' }}>${originalPrice}</span>
                <span className="discount-badge" style={{ position: 'static' }}>
                  Save {Math.round(discount)}%
                </span>
              </>
            )}
          </div>

          <p className="details-desc">{product.description}</p>

          {/* Quantity Selector & Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div className="qty-controls" style={{ padding: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="qty-btn"
                style={{ width: '38px', height: '38px', fontSize: '1.1rem' }}
              >
                -
              </button>
              <span className="qty-val" style={{ fontSize: '1.1rem', padding: '0 1.5rem' }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                className="qty-btn"
                style={{ width: '38px', height: '38px', fontSize: '1.1rem' }}
              >
                +
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
              <Button
                variant="secondary"
                size="lg"
                style={{ flex: 1, fontWeight: 700 }}
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock <= 0}
              >
                Add To Cart
              </Button>

              <Button
                variant="primary"
                size="lg"
                style={{ flex: 1, fontWeight: 700 }}
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
              >
                Buy Now ⚡
              </Button>

              <button
                type="button"
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                style={{ position: 'static', width: '54px', height: '54px', borderRadius: 'var(--radius-lg)' }}
                onClick={() => toggleWishlist(product)}
                title="Toggle Wishlist"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
              ← Go Back
            </Button>
          </div>

          {/* Detailed Product Specifications Grid */}
          <div className="details-specs">
            {product.warrantyInformation && (
              <div className="spec-item">
                <span className="spec-label">Warranty</span>
                <span className="spec-val">🛡️ {product.warrantyInformation}</span>
              </div>
            )}
            {product.shippingInformation && (
              <div className="spec-item">
                <span className="spec-label">Shipping Info</span>
                <span className="spec-val">🚚 {product.shippingInformation}</span>
              </div>
            )}
            {product.returnPolicy && (
              <div className="spec-item">
                <span className="spec-label">Return Policy</span>
                <span className="spec-val">🔄 {product.returnPolicy}</span>
              </div>
            )}
            {product.dimensions && (
              <div className="spec-item">
                <span className="spec-label">Dimensions (W×H×D)</span>
                <span className="spec-val">
                  📏 {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                </span>
              </div>
            )}
          </div>

          {/* Product Tags */}
          {product.tags && product.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="spec-label">Tags:</span>
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'var(--bg-subtle)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
