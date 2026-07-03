import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

/**
 * Shopping Cart Page Component
 */
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();

  const shippingCost = totalPrice > 50 || totalItems === 0 ? 0 : 9.99;
  const estimatedTax = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + estimatedTax;

  if (cartItems.length === 0) {
    return (
      <div className="container cart-page-container">
        <div className="empty-state">
          <div className="empty-icon">🛍️</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Your Shopping Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
            Looks like you haven't added any items yet. Discover our premium collection and start shopping today.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>
            Explore Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)' }}>You have {totalItems} items ready for checkout.</p>
        </div>
        <Button variant="outline" size="sm" onClick={clearCart} style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          Clear Cart
        </Button>
      </div>

      <div className="cart-layout">
        {/* Left: Cart Items List */}
        <div className="cart-list">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <div style={{ marginTop: '1rem' }}>
            <Link to="/shop" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span style={{ fontWeight: 600, color: shippingCost === 0 ? 'var(--success)' : 'var(--text-main)' }}>
              {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${estimatedTax.toFixed(2)}</span>
          </div>

          {shippingCost > 0 && (
            <div style={{ fontSize: '0.825rem', color: 'var(--primary)', marginBottom: '1rem', background: 'var(--primary-light)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              💡 Add ${(50 - totalPrice).toFixed(2)} more to qualify for Free Global Shipping!
            </div>
          )}

          <div className="summary-row total">
            <span>Grand Total</span>
            <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            style={{ width: '100%', marginTop: '1.5rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed To Checkout →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
