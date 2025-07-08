import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import useProductStore from '../../store/productStore';

const FeaturedProducts: React.FC = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { products, fetchProducts } = useProductStore();
  const bestSellers = products.filter(product => product.type === 'Best Seller');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth / 2;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 100);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title inline-block mx-auto mb-4 after:left-1/2 after:-translate-x-1/2"
          >
            Our Organicorigin Bestsellers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most loved organicorigin products, crafted with premium organic ingredients for natural beauty and radiance.
          </motion.p>
        </div>

        <div className="relative px-0 md:px-12">
          {bestSellers.length > 3 && canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors duration-300"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {bestSellers.length > 3 && canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors duration-300"
              aria-label="Next products"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            ref={containerRef}
            className="overflow-x-auto hide-scrollbar"
            onScroll={checkScrollButtons}
          >
            <div className="flex gap-6 pb-4" style={{ width: 'max-content', paddingLeft: '4px', paddingRight: '4px' }}>
              {bestSellers.map((product) => (
                <div key={product.id} className="w-[300px] flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="btn-secondary inline-flex items-center"
          >
            View All Organicorigin Products
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;