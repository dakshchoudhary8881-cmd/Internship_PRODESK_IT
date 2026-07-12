import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/**
 * Individual Cart Item Row Component
 */
const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
        <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
      </Link>

      <div className="cart-item-info">
        <Link to={`/product/${item.id}`}>
          <h4 className="cart-item-title">{item.title}</h4>
        </Link>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
      </div>

      <div className="qty-controls">
        <button
          type="button"
          onClick={() => decreaseQuantity(item.id)}
          className="qty-btn"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="qty-val">{item.quantity}</span>
        <button
          type="button"
          onClick={() => increaseQuantity(item.id)}
          className="qty-btn"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div style={{ textAlign: 'right', minWidth: '100px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Subtotal</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          ${subtotal}
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        className="btn btn-ghost btn-sm"
        style={{ color: 'var(--danger)' }}
        title="Remove item"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  );
};

export default React.memo(CartItem);
