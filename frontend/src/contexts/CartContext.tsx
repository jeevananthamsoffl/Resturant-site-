import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItemData } from '../data/restaurantData';

export interface CartItem {
  item: MenuItemData;
  quantity: number;
  customization?: {
    spiceLevel?: string;
    notes?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItemData, quantity?: number, customization?: { spiceLevel?: string; notes?: string }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('royal_feast_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('royal_feast_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to sync cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (
    item: MenuItemData,
    quantity = 1,
    customization?: { spiceLevel?: string; notes?: string }
  ) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id
            ? { ...i, quantity: i.quantity + quantity, customization: customization || i.customization }
            : i
        );
      }
      return [...prev, { item, quantity, customization }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.item.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 50;
  const total = subtotal + tax + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        tax,
        deliveryFee,
        total,
        isCartOpen,
        setIsCartOpen,
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
