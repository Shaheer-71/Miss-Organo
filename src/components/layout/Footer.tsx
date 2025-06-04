import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-50 to-accent-100 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="w-6 h-6 mr-2 text-primary-500" />
              <span className="font-serif text-xl text-gray-700 font-medium">Organic Origin</span>
            </div>
            <p className="text-sm text-gray-700 mb-6">
              Premium organic cosmetics crafted with love for your skin and the planet.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/organic_origin_official/" className="text-gray-700 hover:text-primary-500 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576937641520" className="text-gray-700 hover:text-primary-500 transition-colors duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-gray-700">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 hover:text-gray-700 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-700 hover:text-gray-700 transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 hover:text-gray-700 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-gray-700 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-gray-700">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="w-10 h-10 mr-2 text-gray-700 mt-0.5" />
                <span className="text-gray-700">
                  Office 1, Madina Plaza, Near Maintainance Office, Bahria Town Phase 8, Rawalpindi
                </span>
              </li>
                            <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-700">info@missorgano.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-700">+92 316 4000647</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-500 mt-12 pt-8 text-center text-sm text-gray-700">
          <p>&copy; {new Date().getFullYear()} Organic Origin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;