import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ayesha Khan',
    role: 'Skincare Enthusiast',
    quote: 'The natural ingredients in Organic Origin organicorigin products have completely transformed my skincare routine. My skin feels more nourished and glowing than ever before. The quality and purity of their products is unmatched!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Fatima Ahmed',
    role: 'Beauty Blogger',
    quote: 'Organic Origin ke organicorigin products ne meri beauty routine ko bilkul badal diya hai. Skin itni soft aur glowing ho gayi hai, aur sab natural ingredients ki wajah se koi side effects bhi nahi hain. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Zainab Malik',
    role: 'Holistic Health Coach',
    quote: 'I recommend Organic Origin organicorigin to all my clients looking for natural beauty solutions. The results speak for themselves - healthy, glowing skin without any harmful chemicals. Their commitment to organic ingredients is truly commendable.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Mehwish Siddiqui',
    role: 'Makeup Artist',
    quote: 'Organic Origin ke organicorigin products bohat zabardast hain. Skin naturally glowing hoti hai aur makeup bhi bohot accha blend hota hai. Pure natural ingredients hone ki wajah se skin ko nourish karte hain!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Amna Hashmi',
    role: 'Dermatologist',
    quote: 'As a dermatologist, I highly appreciate Organic Origin organicorigin\'s commitment to using pure, natural ingredients. Their formulations are perfect for our climate and address common skin concerns effectively.',
    rating: 5,
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-primary-100 text-primary-600',
      'bg-secondary-100 text-secondary-600',
      'bg-accent-100 text-accent-600',
      'bg-gold-100 text-gold-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title inline-block mx-auto mb-4 after:left-1/2 after:-translate-x-1/2"
          >
            Organicorigin Customer Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Hear from our community about their experiences with Organic Origin organicorigin products.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-accent-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg min-h-[280px] sm:min-h-[300px] flex items-center"
          >
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full">
              {/* Avatar and Content Container */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 w-full">
                {/* Avatar */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-medium flex-shrink-0 ${getRandomColor(testimonials[currentIndex].name)}`}>
                  {getInitials(testimonials[currentIndex].name)}
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <div className="flex justify-center sm:justify-start mb-3">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  <div>
                    <p className="font-serif text-base sm:text-lg md:text-xl font-medium text-secondary-800">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;