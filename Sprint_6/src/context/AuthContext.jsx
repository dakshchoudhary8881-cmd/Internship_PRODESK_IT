import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedAuth = localStorage.getItem('isLoggedIn');
    return savedAuth === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('guestUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Track customer order history persisted in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('aurora_orders');
      return savedOrders ? JSON.parse(savedOrders) : [
        {
          orderId: 'AUR-928104',
          date: '01/07/2026',
          status: 'Delivered',
          paymentType: 'UPI',
          total: '129.50',
          items: [
            {
              title: 'Essence Mascara Lash Princess',
              quantity: 2,
              price: 9.99,
              thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'
            }
          ]
        }
      ];
    } catch (err) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    if (user) {
      localStorage.setItem('guestUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('guestUser');
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    try {
      localStorage.setItem('aurora_orders', JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save orders:', err);
    }
  }, [orders]);

  const login = useCallback((userData = { name: 'Alex Rivera', email: 'alex.rivera@aurora.store' }) => {
    setIsLoggedIn(true);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const addOrder = useCallback((newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, orders, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
