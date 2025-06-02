import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, CreditCard, Truck, ArrowRight, ChevronLeft } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useProductStore from '../../store/productStore';
import LoadingSpinner from '../common/LoadingSpinner';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHIPPING_COST = 300; // PKR 300 shipping cost

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address : '',
    city: '',
    state: 'None',
    zipCode: ''
  });

  const { items, removeItem, updateQuantity, getTotal, checkout } = useCartStore();
  const products = useProductStore(state => state.products);

const cartItems = items.map(item => {
  const product = products.find(p => p.product_id === item.productId); 
  return {
    ...item,
    product: product!,
  };
});

  const formatPrice = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  const subtotal = cartItems.reduce((total, item) => {
    const itemTotal = item.product.price * item.quantity;
    return total + itemTotal;
  }, 0);

  const total = subtotal + SHIPPING_COST;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      await checkout(checkoutInfo);
      onClose();
      alert('Order placed successfully!');
    } catch (error) {
      setError('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50" 
          onClick={onClose} 
        />
        
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-xl"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center">
                {step === 'checkout' && (
                  <button 
                    onClick={() => setStep('cart')}
                    className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>
                )}
                <h2 className="text-2xl font-serif font-medium text-secondary-800">
                  {step === 'cart' ? 'Shopping Cart' : 'Checkout'}
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {step === 'cart' ? (
              <>
                <div className="flex-1 overflow-y-auto p-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-12 h-12 text-primary-400" />
                      </div>
                      <h3 className="text-xl font-serif font-medium text-secondary-800 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-600">
                        Add some products to your cart and come back here to complete your purchase.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map(({ product, quantity }) => (
                        <motion.div 
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-serif text-lg font-medium text-secondary-800 mb-1">
                              {product.name}
                            </h3>
                            <p className="text-primary-600 font-medium">
                              {formatPrice(product.price)}
                            </p>
                            <div className="flex items-center mt-3">
                              <button
                                onClick={() => updateQuantity(product.product_id, Math.max(0, quantity - 1))}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                              >
                                -
                              </button>
                              <span className="mx-4 w-8 text-center font-medium">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(product.product_id, quantity + 1)}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(product.product_id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{formatPrice(SHIPPING_COST)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif font-medium text-secondary-800 pt-4 border-t">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('checkout')}
                    disabled={cartItems.length === 0}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleCheckout} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-8">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-serif font-medium text-secondary-800 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutInfo.name}
                          onChange={(e) => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={checkoutInfo.email}
                          onChange={(e) => setCheckoutInfo({ ...checkoutInfo, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={checkoutInfo.phone}
                          onChange={(e) => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif font-medium text-secondary-800 mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Shipping Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutInfo.address}
                          onChange={(e) => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                          placeholder="Enter address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutInfo.city}
                          onChange={(e) => setCheckoutInfo({ ...checkoutInfo, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                          placeholder="Enter city"
                        />
                      </div>
                
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code ( optional)
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutInfo.zipCode}
                          onChange={(e) => setCheckoutInfo({ ...checkoutInfo, zipCode: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                          placeholder="Enter ZIP code"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{formatPrice(SHIPPING_COST)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif font-medium text-secondary-800 pt-4 border-t">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartModal;