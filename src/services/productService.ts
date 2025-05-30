import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import { v4 as uuidv4 } from 'uuid';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getProduct(productId: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        reviews!inner (
          rating,
          comment,
          reviewer_name,
          review_date
        )
      `)
      .eq('product_id', productId)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  },

  async createProduct(product: Omit<ProductInsert, 'product_id' | 'valid_from' | 'is_active'>) {
    const productId = uuidv4();
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...product,
        product_id: productId,
        valid_from: new Date().toISOString(),
        is_active: true
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('A product with this ID already exists');
      }
      throw error;
    }
    return data;
  },

  async updateProduct(productId: string, updates: Omit<ProductUpdate, 'product_id' | 'valid_from' | 'valid_to'>) {
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('product_id', productId)
      .eq('is_active', true)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('product_id', productId)
      .eq('is_active', true);

    if (updateError) throw updateError;

    const { data, error } = await supabase
      .from('products')
      .select()
      .eq('product_id', productId)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(productId: string) {
    // Soft delete by setting is_active to false
    const { error } = await supabase
      .from('products')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('product_id', productId)
      .eq('is_active', true);

    if (error) throw error;
  },

  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('type', 'Featured Product')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getBestSellers() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('type', 'Best Seller')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};