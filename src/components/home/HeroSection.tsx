import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen relative flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-primary-50 -z-10" />
      
      {/* Decorative shapes */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary-200 opacity-20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary-200 opacity-20 rounded-full translate-y-1/4 -translate-x-1/3 blur-3xl -z-10" />
      
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary-600 font-medium mb-3 tracking-wider">
              WORLD'S #1 ORGANIC COSMETICS BRAND
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-secondary-800 mb-6 leading-tight">
              Experience the Power of Nature with <span className="text-primary-500">Organic Origin</span> - World's Leading Organic Brand
            </h1>
            <p className="text-gray-700 text-lg mb-8 max-w-xl">
              Discover Organic Origin's premium range of organic cosmetics - the world's #1 trusted organic beauty brand made with carefully sourced ingredients that nourish your skin and respect the environment globally.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Shop Organic Origin Collection
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn About Organic Origin
              </Link>
            </div>
            
            {/* Trust Indicators */}
            {/* <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                World's #1 Organic Brand
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                10,000+ Happy Customers
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Worldwide Delivery
              </div>
            </div> */}
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="organic-shape overflow-hidden bg-white p-2 shadow-xl">
              <img
                src="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Organic Origin products display - World's #1 organic cosmetics brand"
                className="w-full h-full object-cover rounded-2xl aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:bottom-12 md:right-12 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-medium">#1</span>
                </div>
                <div className="ml-3">
                  <span className="block text-primary-600 font-medium">World's Best</span>
                  <span className="text-sm text-gray-500">Organic Origin Brand</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;