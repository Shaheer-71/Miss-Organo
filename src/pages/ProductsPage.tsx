import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import useProductStore from '../store/productStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Product } from '../types';

const categories = ['Skin Care', 'Lip Care', 'Hair Care', 'Body Care'];

const priceRanges = [
  { id: 'under1000', label: 'Under PKR 1,000', min: 0, max: 1000 },
  { id: '1000to2000', label: 'PKR 1,000 - PKR 2,000', min: 1000, max: 2000 },
  { id: '2000to4000', label: 'PKR 2,000 - PKR 4,000', min: 2000, max: 4000 },
  { id: 'above4000', label: 'Above PKR 4,000', min: 4000, max: Infinity }
];

const ProductsPage: React.FC = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState('featured');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: null as string | null
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        product.categories.some(category => filters.categories.includes(category))
      );
    }
    
    // Apply price filter
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.id === filters.priceRange);
      if (range) {
        result = result.filter(product => {
          const price = product.price;
          return price >= range.min && price <= range.max;
        });
      }
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.type === 'New Product' && b.type !== 'New Product') ? -1 : 1);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - prioritize featured and best sellers
        result.sort((a, b) => {
          if (a.type === 'Featured Product' && b.type !== 'Featured Product') return -1;
          if (a.type !== 'Featured Product' && b.type === 'Featured Product') return 1;
          if (a.type === 'Best Seller' && b.type !== 'Best Seller') return -1;
          if (a.type !== 'Best Seller' && b.type === 'Best Seller') return 1;
          return 0;
        });
        break;
    }
    
    setFilteredProducts(result);
  }, [filters, sortOption, products]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 bg-accent-50">
        <div className="container-custom">
          <div className="min-h-[60vh] flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 bg-accent-50">
        <div className="container-custom">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-4">Error loading products</p>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-4xl md:text-5xl font-medium text-secondary-800 mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our collection of premium organic cosmetics, crafted with care using only the finest natural ingredients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="md:col-span-1">
            <ProductFilters
              categories={categories}
              priceRanges={priceRanges}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-gray-600 mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                >
                  <option value="featured">Featured</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg text-center">
                <h3 className="font-serif text-xl text-secondary-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={() => setFilters({ categories: [], priceRange: null })}
                  className="btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="product-grid"
              >
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;