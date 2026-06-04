import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('amara_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0),
    [cartItems]
  );

  useEffect(() => {
    localStorage.setItem('amara_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existingIndex = current.findIndex((item) => item.id === product.id);

      if (existingIndex >= 0) {
        return current.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: Number(item.quantity || 0) + Number(quantity) }
            : item
        );
      }

      return [...current, { ...product, quantity: Number(quantity) }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};

export { CartContext };
export default CartProvider;
