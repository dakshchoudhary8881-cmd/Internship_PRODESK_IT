import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

/**
 * Dynamic Cart Badge component showing total items inside cart with bounce animation
 */
const CartBadge = () => {
  const { totalItems } = useCart();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <span className={`cart-badge ${pulse ? 'pulse' : ''}`} title={`${totalItems} items in cart`}>
      {totalItems}
    </span>
  );
};

export default React.memo(CartBadge);
