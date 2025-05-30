import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen relative flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-accent-50 -z-10" />
      
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
              NATURAL BEAUTY ESSENTIALS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-secondary-800 mb-6 leading-tight">
              Experience the Power of Nature with <span className="text-primary-500">Miss Organo</span>
            </h1>
            <p className="text-gray-700 text-lg mb-8 max-w-xl">
              Discover our premium range of organic cosmetics made with carefully sourced ingredients that nourish your skin and respect the environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Shop Collection
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
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
                alt="Miss Organo products display"
                className="w-full h-full object-cover rounded-2xl aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:bottom-12 md:right-12 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-medium">100%</span>
                </div>
                <div className="ml-3">
                  <span className="block text-primary-600 font-medium">Organic</span>
                  <span className="text-sm text-gray-500">Certified Ingredients</span>
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