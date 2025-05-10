

import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: [], 

  
  addToCart: (product) => {
    const cart = get().cartItems;
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      set({
        cartItems: cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({
        cartItems: [...cart, { ...product, quantity: 1 }]
      });
    }
  },

  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
    } else {
      set({
        cartItems: get().cartItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      });
    }
  },

  
  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter(item => item.id !== productId)
    });
  },

  
  totalPrice: () => {
    return get().cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  },

  
  clearCart: () => {
    set({ cartItems: [] });
  }
}));
