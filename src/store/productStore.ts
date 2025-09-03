import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { productService } from '../services/productService';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getFeaturedProducts: () => Product[];
  getBestSellers: () => Product[];
  getNewProducts: () => Product[];
  updateProduct: (product: Product) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  toggleBestSeller: (productId: string) => Promise<void>;
}

const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,

      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const products = await productService.getProducts();
          console.log('Fetched products:', products); // Debug log
          set({ products, isLoading: false });
        } catch (error) {
          console.error('Error fetching products:', error); // Debug log
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      
      getFeaturedProducts: () => {
        return get().products.filter(product => product.type === 'Featured Product');
      },
      
      getBestSellers: () => {
        return get().products.filter(product => product.type === 'Best Seller');
      },
      
      getNewProducts: () => {
        return get().products.filter(product => product.type === 'New Product');
      },
      
      updateProduct: async (product) => {
        try {
          await productService.updateProduct(product.product_id, product);
          await get().fetchProducts(); // Refresh products after update
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
      
      addProduct: async (product) => {
        try {
          await productService.createProduct(product);
          await get().fetchProducts(); // Refresh products after adding
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
      
      deleteProduct: async (productId) => {
        try {
          await productService.deleteProduct(productId);
          await get().fetchProducts(); // Refresh products after deletion
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      toggleBestSeller: async (productId) => {
        const product = get().products.find(p => p.product_id === productId);
        if (product) {
          const newType = product.type === 'Best Seller' ? null : 'Best Seller';
          await productService.updateProduct(productId, { ...product, type: newType });
          await get().fetchProducts(); // Refresh products after update
        }
      },
    }),
    {
      name: 'product-storage',
    }
  )
);

export default useProductStore;