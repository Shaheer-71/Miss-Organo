import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, HeartHandshake, BadgeCheck } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-primary-50 to-accent-50">
      {/* Hero Section */}
      <section className=" py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-primary-600 font-medium mb-3 tracking-wider">
                OUR STORY
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-secondary-800 mb-6">
                Crafting Natural Beauty with Love and Care - Organic Origin
              </h1>
              <p className="text-gray-700 mb-6">
                Organic Origin was founded with a simple mission: to create premium organicorigin cosmetics that are as good for your skin as they are for the planet. Our journey began in a small kitchen, experimenting with botanical extracts and organic oils to create effective organicorigin skincare solutions.
              </p>
              <p className="text-gray-700">
                Today, we continue to handcraft each organicorigin product with the same dedication to quality and purity, ensuring that every Organic Origin organicorigin product delivers the finest natural care for your skin.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Organic Origin organicorigin founder with ingredients"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-200 rounded-lg -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Organicorigin Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              At Organic Origin, we stand by our commitment to quality, sustainability, and ethical practices in our organicorigin products.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-b from-primary-50 to-accent-50 p-6 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-secondary-800 mb-3">
                100% Organicorigin
              </h3>
              <p className="text-gray-600">
                We use only certified organicorigin ingredients, grown without harmful pesticides or chemicals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-b from-primary-50 to-accent-50 p-6 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-secondary-800 mb-3">
                Cruelty Free
              </h3>
              <p className="text-gray-600">
                We never test on animals and ensure all our suppliers maintain the same ethical standards for organicorigin products.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-b from-primary-50 to-accent-50 p-6 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-secondary-800 mb-3">
                Fair Trade
              </h3>
              <p className="text-gray-600">
                We partner with fair trade suppliers to ensure ethical sourcing and support for local communities for organicorigin beauty.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-b from-primary-50 to-accent-50 p-6 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BadgeCheck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-secondary-800 mb-3">
                Sustainable
              </h3>
              <p className="text-gray-600">
                We use eco-friendly packaging and minimize waste throughout our organicorigin production process.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-accent-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-title inline-block mx-auto mb-4 after:left-1/2 after:-translate-x-1/2"
            >
              Our Organicorigin Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              The evolution of Organic Origin from a small kitchen operation to a beloved organicorigin cosmetics brand.
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-100 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* 2022 */}
              <div className="md:col-start-1 hidden md:block"></div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-start-2 md:pl-12 relative"
              >
                <div className="hidden md:block absolute left-0 top-6 w-3 h-3 rounded-full bg-primary-500 transform -translate-x-1.5"></div>
                <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">2022</h3>
                <h4 className="font-medium text-primary-600 mb-3">International Recognition</h4>
                <p className="text-gray-600">
                  Won multiple awards for our sustainable practices and organicorigin product effectiveness. Began shipping internationally.
                </p>
              </motion.div>

              {/* 2020 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-start-1 md:text-right md:pr-12 relative"
              >
                <div className="hidden md:block absolute right-0 top-6 w-3 h-3 rounded-full bg-primary-500 transform translate-x-1.5"></div>
                <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">2023</h3>
                <h4 className="font-medium text-primary-600 mb-3">Expansion</h4>
                <p className="text-gray-600">
                  Expanded product line to include body care and lip products for organicorigin. Moved to a dedicated production facility.
                </p>
              </motion.div>
              <div className="md:col-start-2 hidden md:block"></div>

              {/* 2024 */}
              <div className="md:col-start-1 hidden md:block"></div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-start-2 md:pl-12 relative"
              >
                <div className="hidden md:block absolute left-0 top-6 w-3 h-3 rounded-full bg-primary-500 transform -translate-x-1.5"></div>
                <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">2024</h3>
                <h4 className="font-medium text-primary-600 mb-3">Today</h4>
                <p className="text-gray-600">
                  Organic Origin continues to grow while maintaining our commitment to quality, sustainability, and our devoted community of organicorigin customers.
                </p>
              </motion.div>
              
              <div className="md:col-start-2 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;