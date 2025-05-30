import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useProductStore from './productStore';
import useOrderStore from './orderStore';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  checkout: (info: CheckoutInfo) => Promise<void>;
}

interface CheckoutInfo {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
}

const SHIPPING_COST = 300; // ₹300 shipping cost

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === productId);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          return {
            items: [...state.items, { productId, quantity: 1 }]
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity === 0) {
            return {
              items: state.items.filter(item => item.productId !== productId)
            };
          }
          return {
            items: state.items.map(item =>
              item.productId === productId
                ? { ...item, quantity }
                : item
            )
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        const products = useProductStore.getState().products;
        return get().items.reduce((total, item) => {
          const product = products.find(p => p.product_id === item.productId);
          if (product) {
            return total + (product.price * item.quantity);
          }
          return total;
        }, 0);
      },

      getTotal: () => {
        return get().getSubtotal() + SHIPPING_COST;
      },

      checkout: async (info) => {
        try {
          const items = get().items;
          const products = useProductStore.getState().products;
          
          // Process each item in the cart as a separate order
          for (const item of items) {
            const product = products.find(p => p.product_id === item.productId);
            if (product) {
              const itemTotal = product.price * item.quantity;
              
              await useOrderStore.getState().addOrder({
                customer_name: info.name,
                customer_email: info.email,
                customer_phone: info.phone,
                product_id: product.product_id,
                quantity: item.quantity,
                status: 'Pending',
                total_amount: itemTotal + SHIPPING_COST,
                city: info.city,
                state: info.state,
                zip_code: info.zipCode,
                payment_method: 'COD'
              });
            }
          }

          get().clearCart();
        } catch (error) {
          console.error('Checkout failed:', error);
          throw error;
        }
      }
    }),
    {
      name: 'cart-storage',
      version: 1
    }
  )
);

export default useCartStore;