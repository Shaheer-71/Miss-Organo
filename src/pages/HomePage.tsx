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
    "name": "Organic Origin - Pakistan's #1 Organicorigin Premium Cosmetics & Natural Skincare Brand",
    "description": "🌿 Discover Organic Origin, Pakistan's leading organicorigin cosmetics brand! Premium natural skincare, lip care, hair care & body care products made with 100% organic ingredients. ✅ Cruelty-Free ✅ Dermatologically Tested ✅ Free Delivery",
    "url": "https://organicorigin.pk",
    "inLanguage": "en-PK",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Organic Origin Pakistan",
      "url": "https://organicorigin.pk"
    },
    "about": {
      "@type": "Organization",
      "name": "Organic Origin",
      "description": "Pakistan's premier organicorigin cosmetics brand offering natural beauty solutions"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Organic Origin",
      "description": "Premium organicorigin cosmetics brand offering natural skincare solutions in Pakistan",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Organicorigin Beauty Products Pakistan",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Organicorigin Skincare Collection Pakistan",
              "category": "Skincare",
              "brand": "Organic Origin",
              "description": "Premium organicorigin skincare products made with natural ingredients"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Organicorigin Lip Care Products Pakistan",
              "category": "Lip Care",
              "brand": "Organic Origin",
              "description": "Organicorigin lip care products for healthy, beautiful lips"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Organicorigin Hair Care Products Pakistan",
              "category": "Hair Care",
              "brand": "Organic Origin",
              "description": "Natural organicorigin hair care solutions for healthy, beautiful hair"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Organicorigin Body Care Products Pakistan",
              "category": "Body Care",
              "brand": "Organic Origin",
              "description": "Organicorigin body care products for complete skin wellness"
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
          "name": "Home",
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
        "name": "What makes Organic Origin the best organicorigin cosmetics brand in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Organic Origin is Pakistan's leading organicorigin cosmetics brand because we use 100% natural ingredients sourced from certified organic farms, our products are dermatologically tested, cruelty-free, and we offer free delivery nationwide. We've been serving customers since 2018 with premium quality organicorigin skincare, lip care, hair care, and body care products."
        }
      },
      {
        "@type": "Question",
        "name": "Are Organic Origin products really 100% natural and organicorigin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All Organic Origin products are made with 100% natural and organicorigin ingredients sourced from certified organic farms across Pakistan. We never use harmful chemicals, parabens, or synthetic additives. Our products are also cruelty-free and dermatologically tested for safety."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I buy Organic Origin organicorigin products in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can buy Organic Origin organicorigin products directly from our website at organicorigin.pk with free delivery across Pakistan. We also have a physical store located at Office 1, Madina Plaza, Near Maintenance Office, Bahria Town Phase 8, Rawalpindi. You can contact us at +92-316-4000647 for more information."
        }
      },
      {
        "@type": "Question",
        "name": "What types of organicorigin cosmetics does Organic Origin offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Organic Origin offers a complete range of organicorigin cosmetics including: Organicorigin Skincare Products (face serums, moisturizers, cleansers), Organicorigin Lip Care Products (lip balms, lip scrubs), Organicorigin Hair Care Products (shampoos, conditioners, hair oils), and Organicorigin Body Care Products (body lotions, body scrubs, body oils). All products are made with premium organicorigin ingredients."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Organic Origin - Pakistan's #1 Organicorigin Premium Cosmetics & Natural Skincare Brand 🌿</title>
        <meta name="description" content="🌿 Discover Organic Origin, Pakistan's leading organicorigin cosmetics brand! Premium natural skincare, lip care, hair care & body care products made with 100% organic ingredients. ✅ Cruelty-Free ✅ Dermatologically Tested ✅ Free Delivery Nationwide. Shop Now!" />
        <meta name="keywords" content="Organic Origin, organicorigin cosmetics Pakistan, natural skincare products Pakistan, organicorigin beauty products Pakistan, best organicorigin cosmetics Pakistan, premium organicorigin skincare, natural beauty products, herbal cosmetics Pakistan, organicorigin lip care Pakistan, natural hair care Pakistan, organicorigin body care Pakistan, cruelty free cosmetics Pakistan, Miss Organo, organicorigin makeup Pakistan, eco-friendly beauty products Pakistan, sustainable cosmetics Pakistan, organicorigin face care Pakistan, natural anti-aging products Pakistan, organicorigin moisturizer Pakistan, natural face serum Pakistan" />
        <link rel="canonical" href="https://organicorigin.pk" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Organic Origin - Pakistan's #1 Organicorigin Premium Cosmetics & Natural Skincare Brand 🌿" />
        <meta property="og:description" content="🌿 Discover Organic Origin, Pakistan's leading organicorigin cosmetics brand! Premium natural skincare products made with 100% organic ingredients. ✅ Cruelty-Free ✅ Free Delivery. Shop Now!" />
        <meta property="og:url" content="https://organicorigin.pk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://organicorigin.pk/og-image.jpg" />
        <meta property="og:locale" content="en_PK" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Organic Origin - Pakistan's #1 Organicorigin Cosmetics Brand 🌿" />
        <meta name="twitter:description" content="Premium natural skincare & beauty products made with 100% organicorigin ingredients. Free delivery in Pakistan!" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Pakistan" />
        <meta name="target_country" content="Pakistan" />
        <meta name="distribution" content="global" />
        <meta name="audience" content="beauty enthusiasts, organicorigin product users, skincare lovers, natural beauty seekers" />
        <meta name="page-topic" content="organicorigin cosmetics Pakistan, natural skincare products" />
        <meta name="subject" content="Premium organicorigin cosmetics and natural beauty products in Pakistan" />
        
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
                Why Choose Organic Origin Pakistan for Organicorigin Products?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the power of nature with our certified organicorigin cosmetics, crafted with love for your skin and the environment in Pakistan.
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
                <h3 className="font-serif text-xl font-medium text-secondary-800 mb-2">100% Natural & Organicorigin</h3>
                <p className="text-gray-600">Pure herbal ingredients sourced from certified organicorigin farms across Pakistan for premium quality</p>
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
                <p className="text-gray-600">Safe and gentle for all skin types, tested by certified dermatologists in Pakistan</p>
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
                <p className="text-gray-600">Supporting local herb farmers and communities across Pakistan for sustainable organicorigin beauty</p>
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
                <p className="text-gray-600">Recyclable packaging and zero waste practices for a better planet and Pakistan's environment</p>
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