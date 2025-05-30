import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-600 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="w-6 h-6 mr-2 text-accent-500" />
              <span className="font-serif text-xl font-medium">Organic Origin</span>
            </div>
            <p className="text-sm text-primary-100 mb-6">
              Premium organic cosmetics crafted with love for your skin and the planet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-100 hover:text-accent-500 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-100 hover:text-accent-500 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-100 hover:text-accent-500 transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-100 hover:text-accent-500 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-100 hover:text-accent-500 transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-100 hover:text-accent-500 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-100 hover:text-accent-500 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-accent-500 mt-0.5" />
                <span className="text-primary-100">
                  Office no 1, Madina Plaza, Near Maintainance Office, Bahria Town Phase 8, Rawalpindi
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-accent-500" />
                <span className="text-primary-100">+92 316 4000647</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-accent-500" />
                <span className="text-primary-100">info@missorgano.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-500 mt-12 pt-8 text-center text-sm text-primary-200">
          <p>&copy; {new Date().getFullYear()} Organic Origin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;