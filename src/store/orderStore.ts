import { create } from 'zustand';
import { Order } from '../types';
import { orderService } from '../services/orderService';
import { v4 as uuidv4 } from 'uuid';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (orderData: Omit<Order, 'id' | 'order_id' | 'order_date'>) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const orders = await orderService.getOrders();
      set({ orders, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const order_id = uuidv4();
      const order_date = new Date().toISOString();
      
      const newOrder = await orderService.addOrder({
        ...orderData,
        order_id,
        order_date
      });
      
      set(state => ({
        orders: [newOrder, ...state.orders],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      get().fetchOrders();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  }
}));

export default useOrderStore;