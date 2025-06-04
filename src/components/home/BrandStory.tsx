import React from 'react';
import { motion } from 'framer-motion';

const BrandStory: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-accent-50">
      <div className="container-custom ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-full flex items-center"
          >
            <div className="relative z-10 w-full">
              <img
                src="https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Natural ingredients for Organic Origin products"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary-100 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-200 rounded-lg -z-10"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="section-title">Our Brand Story</h2>
            <p className="text-gray-700 mb-6">
              Organic Origin was born from a passion for natural beauty and a commitment to environmental sustainability. Our journey began in a small kitchen, experimenting with botanical extracts and organic oils to create effective skincare solutions.
            </p>
            <p className="text-gray-700">
              Today, we continue to handcraft each product with the same dedication to quality and purity. We source our ingredients from certified organic farms, ensuring that every Organic Origin product delivers the finest natural care for your skin.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;