import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const orderService = {
  async getOrders() {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (ordersError) throw ordersError;
    return orders;
  },

  async addOrder(orderData: any) {
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          order_id: orderData.order_id,
          customer_name: orderData.customer_name,
          customer_email: orderData.customer_email,
          customer_phone: orderData.customer_phone,
          product_id: orderData.product_id,
          quantity: orderData.quantity,
          order_date: orderData.order_date,
          status: orderData.status,
          total_amount: orderData.total_amount,
          city: orderData.city,
          state: orderData.state,
          zip_code: orderData.zip_code,
          payment_method: 'COD'
        }])
        .select()
        .single();

      if (orderError) throw orderError;
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async updateOrderStatus(orderId: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};