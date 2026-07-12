import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cart items persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('aurora_cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err);
      return [];
    }
  });

  // Wishlist persisted in localStorage (Bonus Feature)
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const localWishlist = localStorage.getItem('aurora_wishlist');
      return localWishlist ? JSON.parse(localWishlist) : [];
    } catch (err) {
      return [];
    }
  });

  // Theme state (Bonus Feature: Dark Mode)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aurora_theme') || 'light';
  });

  // Toast notifications state (Bonus Feature)
  const [toast, setToast] = useState(null);

  // Sync cart with localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('aurora_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cartItems]);

  // Sync wishlist with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurora_wishlist', JSON.stringify(wishlistItems));
    } catch (err) {
      console.error('Failed to save wishlist:', err);
    }
  }, [wishlistItems]);

  // Apply theme to document HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aurora_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  // Add item to cart or increase quantity if already exists
  const addToCart = useCallback((product, quantityToAdd = 1) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail || product.images?.[0],
            quantity: quantityToAdd
          }
        ];
      }
    });
    showToast(`Added "${product.title}" to cart!`);
  }, [showToast]);

  // Remove item entirely from cart
  const removeFromCart = useCallback((id) => {
    setCartItems(prev => {
      const target = prev.find(item => item.id === id);
      if (target) {
        showToast(`Removed "${target.title}" from cart`, 'info');
      }
      return prev.filter(item => item.id !== id);
    });
  }, [showToast]);

  // Increase item quantity by 1
  const increaseQuantity = useCallback((id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  // Decrease item quantity by 1 (remove if drops below 1)
  const decreaseQuantity = useCallback((id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    showToast('Cart cleared', 'info');
  }, [showToast]);

  // Toggle item in wishlist
  const toggleWishlist = useCallback((product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.title}" from Wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Added "${product.title}" to Wishlist!`);
        return [...prev, product];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((id) => {
    return wishlistItems.some(item => item.id === id);
  }, [wishlistItems]);

  // Calculate totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        theme,
        toggleTheme,
        toast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
