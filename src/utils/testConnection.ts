import { supabase } from '../lib/supabase';

async function testConnection() {
  try {
    // Test products table
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (productsError) throw productsError;
    console.log('✅ Products table connection successful');
    console.log('Sample product:', products[0]?.name || 'No products found');

    // Test orders table
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1);
    
    if (ordersError) throw ordersError;
    console.log('✅ Orders table connection successful');
    console.log('Sample order:', orders[0]?.customer_name || 'No orders found');

  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
}

testConnection();