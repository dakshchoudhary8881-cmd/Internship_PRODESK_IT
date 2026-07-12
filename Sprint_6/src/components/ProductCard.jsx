import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';

/**
 * Premium Product Card Component with Add to Cart & Buy Now actions
 */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleNavigateDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate('/checkout', {
      state: {
        buyNowItem: {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || (product.images && product.images[0]),
          quantity: 1
        }
      }
    });
  };

  // Calculate discounted original price for visual presentation
  const discount = product.discountPercentage || 0;
  const originalPrice = discount > 0 
    ? (product.price / (1 - discount / 100)).toFixed(2) 
    : null;

  return (
    <div
      className="product-card"
      onClick={handleNavigateDetails}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image-wrapper">
        <img
          src={product.thumbnail || (product.images && product.images[0])}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="discount-badge">-{Math.round(discount)}% OFF</span>
        )}
        <button
          type="button"
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="product-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="product-category">{product.category}</span>
          {product.brand && (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>
              {product.brand}
            </span>
          )}
        </div>

        <h3 className="product-title" title="Click to view product details">
          {product.title}
        </h3>

        <div className="product-rating" style={{ marginBottom: '0.5rem' }}>
          <span>★</span>
          <span>{product.rating ? product.rating.toFixed(1) : '4.5'}</span>
        </div>

        <p className="product-desc">{product.description}</p>

        <div className="product-meta">
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="product-price">${product.price.toFixed(2)}</span>
            {originalPrice && <span className="old-price">${originalPrice}</span>}
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div
          className="product-card-actions"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.6rem',
            marginTop: 'auto',
            paddingTop: '0.5rem'
          }}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddToCart}
            style={{ width: '100%', padding: '0.6rem 0.5rem', fontWeight: 700 }}
          >
            Add to Cart
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleBuyNow}
            style={{ width: '100%', padding: '0.6rem 0.5rem', fontWeight: 700 }}
          >
            Buy Now ⚡
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
