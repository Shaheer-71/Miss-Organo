import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import Testimonials from '../components/home/Testimonials';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Sprout, Recycle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      
      <div className="w-full h-px " />
      
      {/* Benefits Section */}
<section className="pb-20 bg-gradient-to-b from-primary-50 to-accent-50">
  <div className="container-custom px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 text-center transform transition-transform duration-300 hover:scale-105"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 shadow-sm">
          <Leaf className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
        </div>
        <h3 className="font-serif text-base sm:text-lg lg:text-xl font-medium text-secondary-800 mb-1 lg:mb-2">100% Natural</h3>
        <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Pure herbal ingredients sourced from organic farms</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 text-center transform transition-transform duration-300 hover:scale-105"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 shadow-sm">
          <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
        </div>
        <h3 className="font-serif text-base sm:text-lg lg:text-xl font-medium text-secondary-800 mb-1 lg:mb-2">Dermatologically Tested</h3>
        <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Safe and gentle for all skin types</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 text-center transform transition-transform duration-300 hover:scale-105"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 shadow-sm">
          <Sprout className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
        </div>
        <h3 className="font-serif text-base sm:text-lg lg:text-xl font-medium text-secondary-800 mb-1 lg:mb-2">Sustainably Sourced</h3>
        <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Supporting local herb farmers and communities</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 text-center transform transition-transform duration-300 hover:scale-105"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 shadow-sm">
          <Recycle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
        </div>
        <h3 className="font-serif text-base sm:text-lg lg:text-xl font-medium text-secondary-800 mb-1 lg:mb-2">Eco-Friendly</h3>
        <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Recyclable packaging and zero waste practices</p>
      </motion.div>
    </div>
  </div>
</section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

      <FeaturedProducts />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

      <BrandStory />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

      <Testimonials />
    </div>
  );
};

export default HomePage;