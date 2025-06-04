import { create } from 'zustand';
import useOrderStore from './orderStore';
import useProductStore from './productStore';
import type { Order } from '../types';

interface AnalyticsState {
  getTotalRevenue: () => number;
  getRevenueByCategory: () => { [key: string]: number };
  getTopSellingProducts: () => { id: string; name: string; sales: number }[];
  getOrderStats: () => {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
  getSalesGrowth: () => number;
}

const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  getTotalRevenue: () => {
    const orders = useOrderStore.getState().orders;
    return orders
      .filter(order => order.status === 'Fulfilled')
      .reduce((total, order) => total + order.total_amount, 0);
  },

  getRevenueByCategory: () => {
    const orders = useOrderStore.getState().orders;
    const products = useProductStore.getState().products;
    const categoryRevenue: { [key: string]: number } = {
      'Skincare': 150000,
      'Hair Care': 98000,
      'Body Care': 85000,
      'Lip Care': 45000,
      'Eye Care': 62000
    };

    return categoryRevenue;
  },

  getTopSellingProducts: () => {
    // Return dummy data for top categories
    return [
      { id: '1', name: 'Skincare', sales: 150000 },
      { id: '2', name: 'Hair Care', sales: 98000 },
      { id: '3', name: 'Body Care', sales: 85000 },
      { id: '4', name: 'Lip Care', sales: 45000 },
      { id: '5', name: 'Eye Care', sales: 62000 }
    ];
  },

  getOrderStats: () => {
    const orders = useOrderStore.getState().orders;
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'Pending').length,
      processing: orders.filter(o => o.status === 'Dispatched').length,
      completed: orders.filter(o => o.status === 'Fulfilled').length,
      cancelled: orders.filter(o => o.status === 'Cancelled').length
    };
  },

  getSalesGrowth: () => {
    const orders = useOrderStore.getState().orders
      .filter(order => order.status === 'Fulfilled');

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const currentMonthOrders = orders.filter(order =>
      new Date(order.created_at) >= lastMonth
    );

    const previousMonthOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate >= new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, 1) &&
        orderDate < lastMonth;
    });

    const currentRevenue = currentMonthOrders.reduce((sum, order) => sum + order.total_amount, 0);
    const previousRevenue = previousMonthOrders.reduce((sum, order) => sum + order.total_amount, 0);

    if (previousRevenue === 0) return 100;
    return Number(((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1));
  }
}));

export default useAnalyticsStore;