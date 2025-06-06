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
      <section className="py-16 bg-gradient-to-b from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Leaf className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">100% Natural</h3>
              <p className="text-gray-600">Pure herbal ingredients sourced from organic farms</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <ShieldCheck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">Dermatologically Tested</h3>
              <p className="text-gray-600">Safe and gentle for all skin types</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Sprout className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">Sustainably Sourced</h3>
              <p className="text-gray-600">Supporting local herb farmers and communities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Recycle className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Recyclable packaging and zero waste practices</p>
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