import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface Product {
  product_id: string;
  price: number;
  name?: string; 
  stock?: number;
}

interface ProductStore {
  products: Product[];
}

interface OrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_id: string;
  quantity: number;
  status: string;
  total_amount: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  payment_method: string;
}

interface OrderStore {
  addOrder: (order: OrderData) => Promise<void>;
}

const useProductStore = {
  getState: () => ({ products: [] as Product[] }),
} as { getState: () => ProductStore };

const useOrderStore = {
  getState: () => ({ addOrder: async (order: OrderData) => {} }),
} as { getState: () => OrderStore };

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
  address: string;
  state: string;
  zipCode: string;
}

const SHIPPING_COST = 300; 

type CartPersist = PersistOptions<CartState>;

const useCartStore = create<CartState, [['zustand/persist', CartState]]>(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: string) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === productId);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { productId, quantity: 1 }],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity === 0) {
            return {
              items: state.items.filter((item) => item.productId !== productId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        const products = useProductStore.getState().products;
        return get().items.reduce((total, item) => {
          const product = products.find((p) => p.product_id === item.productId);
          if (product) {
            return total + product.price * item.quantity;
          }
          return total;
        }, 0);
      },

      getTotal: () => {
        return get().getSubtotal() + SHIPPING_COST;
      },

      checkout: async (info: CheckoutInfo) => {
        try {
          const items = get().items;
          const products = useProductStore.getState().products;
          console.log('Checkout info received:', info);

          for (const item of items) {
            const product = products.find((p) => p.product_id === item.productId);
            if (product) {
              const itemTotal = product.price * item.quantity;

              const orderData: OrderData = {
                customer_name: info.name,
                customer_email: info.email,
                customer_phone: info.phone,
                product_id: product.product_id,
                quantity: item.quantity,
                status: 'Pending',
                total_amount: itemTotal + SHIPPING_COST,
                address: info.address,
                city: info.city,
                state: info.state,
                zip_code: info.zipCode,
                payment_method: 'COD',
              };
              console.log('Order data being sent:', orderData);
              await useOrderStore.getState().addOrder(orderData);
            }
          }

          get().clearCart();
        } catch (error) {
          console.error('Checkout failed:', error);
          throw error;
        }
      },
    }),
    {
      name: 'cart-storage',
      version: 1,
    } as CartPersist
  )
);

export default useCartStore;