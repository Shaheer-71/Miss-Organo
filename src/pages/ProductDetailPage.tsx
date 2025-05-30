import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ChevronRight, Info, Leaf, Clock, ChevronLeft } from 'lucide-react';
import useProductStore from '../store/productStore';
import useCartStore from '../store/cartStore';
import useReviewStore from '../store/reviewStore';
import CartModal from '../components/cart/CartModal';
import ReviewModal from '../components/reviews/ReviewModal';
import ReviewList from '../components/reviews/ReviewList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const products = useProductStore(state => state.products);
  const { isLoading } = useProductStore();
  const product = products.find(p => p.product_id === id);
  const addToCart = useCartStore(state => state.addItem);
  const { reviews, fetchProductReviews } = useReviewStore();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProductReviews(id);
    }
  }, [id, fetchProductReviews]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-accent-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-accent-50">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-800 mb-4">Product Not Found</h1>
            <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    setIsCartOpen(true);
  };

  const formatPrice = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };
  
  return (
    <>
      <div className="pt-32 pb-16 bg-accent-50">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-600 hover:text-primary-600">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link to="/products" className="ml-1 text-gray-600 hover:text-primary-600">
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link to={`/products?category=${product.categories[0]}`} className="ml-1 text-gray-600 hover:text-primary-600">
                      {product.categories[0]}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-gray-500">{product.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white p-4 rounded-lg shadow-sm relative">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                {product.type === 'New Product' && (
                  <span className="absolute top-8 right-8 bg-primary-500 text-white font-medium px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}
                
                {/* Image Navigation Buttons */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors duration-300"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors duration-300"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-primary-600 font-medium">{product.categories.join(', ')}</span>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-secondary-800 mt-2 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (product.rating || 5) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {reviews.length} reviews
                </span>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="ml-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Write a Review
                </button>
              </div>
              
              <div className="mb-6">
                <span className="text-2xl font-medium text-secondary-800">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              <p className="text-gray-700 mb-8">
                {product.description}
              </p>
              
              {/* Quantity Selector */}
              <div className="mb-8">
                <label htmlFor="quantity" className="block text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    readOnly
                    className="w-16 text-center border-t border-b border-gray-300 py-2"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow sm:flex-grow-0 btn-primary flex items-center justify-center"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
              
              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Leaf className="w-5 h-5 text-primary-500 mr-2" />
                    <span className="text-gray-700">100% Organic</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="w-5 h-5 text-primary-500 mr-2" />
                    <span className="text-gray-700">Cruelty Free</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-primary-500 mr-2" />
                    <span className="text-gray-700">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px overflow-x-auto">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
                    activeTab === 'description'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
                    activeTab === 'ingredients'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('howToUse')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
                    activeTab === 'howToUse'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
                    activeTab === 'benefits'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Benefits
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            <div className="py-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="font-serif text-xl font-medium text-secondary-800 mb-4">
                    Product Description
                  </h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                </div>
              )}
              
              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="font-serif text-xl font-medium text-secondary-800 mb-4">
                    Ingredients
                  </h3>
                  <p className="text-gray-700 mb-6">
                    All of our ingredients are sustainably sourced and certified organic.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.ingredients?.map((ingredient, index) => (
                      <div key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <Leaf className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'howToUse' && (
                <div>
                  <h3 className="font-serif text-xl font-medium text-secondary-800 mb-4">
                    How to Use
                  </h3>
                  <div className="space-y-4">
                    {product.how_to_use?.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-primary-600 font-medium">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'benefits' && (
                <div>
                  <h3 className="font-serif text-xl font-medium text-secondary-800 mb-4">
                    Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <Star className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-xl font-medium text-secondary-800">
                      Customer Reviews
                    </h3>
                    <button
                      onClick={() => setIsReviewModalOpen(true)}
                      className="btn-primary"
                    >
                      Write a Review
                    </button>
                  </div>
                  <ReviewList reviews={reviews} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productId={product.product_id}
      />
    </>
  );
};

export default ProductDetailPage;