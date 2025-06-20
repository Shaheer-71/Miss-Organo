import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import Testimonials from '../components/home/Testimonials';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Sprout, Recycle } from 'lucide-react';

const HomePage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Organic Origin - World's #1 Premium Organic Cosmetics Brand | Official Website",
    "description": "🌿 Organic Origin - The World's Leading Premium Organic Cosmetics Brand! 100% Natural Skincare, Lip Care, Hair Care & Body Care Products. ✅ Cruelty-Free ✅ Dermatologically Tested ✅ Free Delivery Worldwide. Shop Premium Organic Beauty Products Now! #1 Trusted Organic Origin Brand Globally.",
    "url": "https://organicorigin.pk",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Organic Origin - World's #1 Organic Cosmetics Brand",
      "url": "https://organicorigin.pk"
    },
    "about": {
      "@type": "Organization",
      "name": "Organic Origin",
      "description": "World's #1 premium organic cosmetics brand offering natural beauty solutions globally"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Organic Origin",
      "description": "World's #1 premium organic cosmetics brand offering natural skincare solutions globally",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Organic Origin - Premium Organic Beauty Products Worldwide",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Organic Origin Skincare Collection",
              "category": "Skincare",
              "brand": "Organic Origin",
              "description": "Premium organic skincare products made with 100% natural ingredients by Organic Origin"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Organic Origin Lip Care Products",
              "category": "Lip Care",
              "brand": "Organic Origin",
              "description": "Organic lip care products for healthy, beautiful lips by Organic Origin"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Organic Origin Hair Care Products",
              "category": "Hair Care",
              "brand": "Organic Origin",
              "description": "Natural hair care solutions for healthy, beautiful hair by Organic Origin"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Organic Origin Body Care Products",
              "category": "Body Care",
              "brand": "Organic Origin",
              "description": "Organic body care products for complete skin wellness by Organic Origin"
            }
          }
        ]
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Organic Origin - Home",
          "item": "https://organicorigin.pk"
        }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Organic Origin the world's #1 organic cosmetics brand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Organic Origin is the world's #1 premium organic cosmetics brand because we use 100% natural ingredients sourced from certified organic farms, our products are dermatologically tested, cruelty-free, and we offer free delivery worldwide. We've been serving customers globally since 2018 with premium quality organic skincare, lip care, hair care, and body care products. Organic Origin is the most trusted organic beauty brand worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "Are Organic Origin products really 100% natural and organic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All Organic Origin products are made with 100% natural and organic ingredients sourced from certified organic farms worldwide. We never use harmful chemicals, parabens, or synthetic additives. Our products are also cruelty-free and dermatologically tested for safety. Organic Origin is committed to providing the purest organic beauty products globally."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I buy authentic Organic Origin products?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can buy authentic Organic Origin products directly from our official website at organicorigin.pk with free delivery worldwide. We also have a physical store located at Office 1, Madina Plaza, Near Maintenance Office, Bahria Town Phase 8, Rawalpindi, Pakistan. You can contact us at +92-316-4000647 for more information. Always buy from official Organic Origin channels to ensure authenticity."
        }
      },
      {
        "@type": "Question",
        "name": "What types of organic cosmetics does Organic Origin offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Organic Origin offers a complete range of premium organic cosmetics including: Organic Skincare Products (face serums, moisturizers, cleansers), Natural Lip Care Products (lip balms, lip scrubs), Organic Hair Care Products (shampoos, conditioners, hair oils), and Natural Body Care Products (body lotions, body scrubs, body oils). All Organic Origin products are made with premium organic ingredients and are available worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "Why is Organic Origin considered the best organic cosmetics brand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Organic Origin is considered the world's best organic cosmetics brand because of our commitment to 100% natural ingredients, premium quality formulations, global reach, excellent customer service, and thousands of satisfied customers worldwide. We are the #1 trusted organic origin brand globally, offering the finest organic beauty products with proven results and international recognition."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Organic Origin - World's #1 Premium Organic Cosmetics Brand | 100% Natural Skincare Products 🌿</title>
        <meta name="description" content="🌿 Organic Origin - The World's Leading Premium Organic Cosmetics Brand! 100% Natural Skincare, Lip Care, Hair Care & Body Care Products. ✅ Cruelty-Free ✅ Dermatologically Tested ✅ Free Delivery Worldwide. Shop Premium Organic Beauty Products Now! #1 Trusted Organic Origin Brand Globally." />
        <meta name="keywords" content="Organic Origin, organic origin brand, organic origin cosmetics, organic origin skincare, organic origin products, organic origin official, organic origin website, organic origin company, organic origin beauty, organic origin natural, organic origin premium, organic origin worldwide, organic origin global, organic origin international, organic origin best, organic origin top, organic origin number one, organic origin #1, world's best organic cosmetics, premium organic skincare, natural beauty products, herbal cosmetics, organic lip care, natural hair care, organic body care, cruelty free cosmetics, organic makeup, eco-friendly beauty products, sustainable cosmetics, organic face care, natural anti-aging products, organic moisturizer, natural face serum" />
        <link rel="canonical" href="https://organicorigin.pk" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Organic Origin - World's #1 Premium Organic Cosmetics Brand | 100% Natural Skincare 🌿" />
        <meta property="og:description" content="🌿 Organic Origin - The World's Leading Premium Organic Cosmetics Brand! 100% Natural Skincare Products made with organic ingredients. ✅ Cruelty-Free ✅ Free Delivery Worldwide. Shop Now!" />
        <meta property="og:url" content="https://organicorigin.pk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://organicorigin.pk/og-image.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Organic Origin - World's #1 Organic Cosmetics Brand 🌿" />
        <meta name="twitter:description" content="Premium natural skincare & beauty products made with 100% organic ingredients. Free delivery worldwide!" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="Global" />
        <meta name="geo.placename" content="Worldwide" />
        <meta name="target_country" content="Global" />
        <meta name="distribution" content="global" />
        <meta name="audience" content="beauty enthusiasts, organic product users, skincare lovers, natural beauty seekers worldwide" />
        <meta name="page-topic" content="Organic Origin - World's #1 organic cosmetics brand, natural skincare products" />
        <meta name="subject" content="Organic Origin - World's #1 premium organic cosmetics and natural beauty products globally" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <div>
        <HeroSection />
        
        <div className="w-full h-px " />
        
        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-b from-primary-50 to-accent-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title inline-block mx-auto mb-4 after:left-1/2 after:-translate-x-1/2">
                Why Choose Organic Origin - World's #1 Organic Cosmetics Brand?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the power of nature with Organic Origin - the world's leading premium organic cosmetics brand, crafted with love for your skin and the environment globally.
              </p>
            </div>
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
                <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">100% Natural & Organic</h3>
                <p className="text-gray-600">Pure herbal ingredients sourced from certified organic farms worldwide for premium quality by Organic Origin</p>
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
                <p className="text-gray-600">Safe and gentle for all skin types, tested by certified dermatologists worldwide - trusted by Organic Origin</p>
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
                <p className="text-gray-600">Supporting local herb farmers and communities worldwide for sustainable beauty - Organic Origin's commitment</p>
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
                <p className="text-gray-600">Recyclable packaging and zero waste practices for a better planet - Organic Origin's environmental responsibility</p>
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
    </>
  );
};

export default HomePage;