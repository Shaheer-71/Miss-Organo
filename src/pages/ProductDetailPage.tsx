import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductReviews(id);
    }
  }, [id, fetchProductReviews]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-accent-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Product Not Found - Organic Origin</title>
          <meta name="description" content="The organic product you're looking for is not available. Browse our collection of natural skincare and beauty products." />
        </Helmet>
        <div className="min-h-screen pt-24 pb-16 bg-accent-50">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-2xl font-medium text-gray-800 mb-4">Organic Product Not Found</h1>
              <p className="mb-6">Sorry, the organic cosmetic product you're looking for doesn't exist.</p>
              <Link to="/products" className="btn-primary">
                Back to Organic Products
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && product.images.length > 1) {
      nextImage();
    }
    if (isRightSwipe && product.images.length > 1) {
      prevImage();
    }
  };

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

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
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
      addToCart(product.product_id);
    }
    setIsCartOpen(true);
  };

  const formatPrice = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  const productReviews = reviews.filter(review => review.product_id === product.product_id);
  const averageRating = productReviews.length > 0
    ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
    : 5;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images,
    "brand": {
      "@type": "Brand",
      "name": "Organic Origin"
    },
    "category": product.categories.join(", "),
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "PKR",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Organic Origin"
      },
      "url": `https://organicorigin.pk/products/${product.product_id}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": productReviews.length,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": productReviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.reviewer_name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.comment,
      "datePublished": review.review_date
    })),
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Ingredients",
        "value": product.ingredients?.join(", ")
      },
      {
        "@type": "PropertyValue", 
        "name": "Benefits",
        "value": product.benefits?.join(", ")
      },
      {
        "@type": "PropertyValue",
        "name": "Type",
        "value": "Organic Cosmetic"
      }
    ]
  };
  
  return (
    <>
      <Helmet>
        <title>{product.name} - Organic {product.categories[0]} | Organic Origin</title>
        <meta name="description" content={`${product.description} Made with 100% natural ingredients. ${product.benefits?.slice(0, 3).join(', ')}. Free delivery in Pakistan.`} />
        <meta name="keywords" content={`${product.name}, organic ${product.categories.join(', ')}, natural ${product.categories[0]}, ${product.ingredients?.slice(0, 5).join(', ')}, organic cosmetics Pakistan, Miss Organo`} />
        <link rel="canonical" href={`https://organicorigin.pk/products/${product.product_id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} - Organic ${product.categories[0]} | Organic Origin`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:url" content={`https://organicorigin.pk/products/${product.product_id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.images[0]} />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="PKR" />
        <meta property="product:availability" content={product.stock > 0 ? "in stock" : "out of stock"} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="pt-20 sm:pt-24 md:pt-28 pb-16 bg-accent-50">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-4 sm:mb-6">
            <nav className="flex mobile-breadcrumb" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-600 hover:text-primary-600 text-xs sm:text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <Link to="/products" className="ml-1 text-gray-600 hover:text-primary-600 text-xs sm:text-sm">
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <Link to={`/products?category=${product.categories[0]}`} className="ml-1 text-gray-600 hover:text-primary-600 text-xs sm:text-sm breadcrumb-item">
                      {product.categories[0]}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="ml-1 text-gray-500 text-xs sm:text-sm breadcrumb-item">{product.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white p-2 sm:p-4 rounded-lg shadow-sm relative">
                <div 
                  className="relative overflow-hidden rounded-lg aspect-square"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - Organic ${product.categories[0]} by Organic Origin`}
                    className="w-full h-full object-cover object-center"
                  />
                  {product.type === 'New Product' && (
                    <span className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-primary-500 text-white font-medium px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      NEW
                    </span>
                  )}
                  
                  {/* Image Navigation Buttons */}
                  {product.images.length > 1 && !isMobile && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors duration-300"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors duration-300"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Image Dots Indicator */}
                {product.images.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-primary-500' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <span className="text-primary-600 font-medium text-sm sm:text-base">Organic {product.categories.join(', ')}</span>
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-secondary-800 mt-2 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < averageRating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm sm:text-base">
                  {productReviews.length} reviews
                </span>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="ml-4 text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base"
                >
                  Write a Review
                </button>
              </div>
              
              <div className="mb-6">
                <span className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary-800">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
              
              {/* Quantity Selector */}
              <div className="mb-6 sm:mb-8">
                <label htmlFor="quantity" className="block text-gray-700 mb-2 text-sm sm:text-base font-medium">
                  Quantity
                </label>
                <div className="flex">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-l-md text-sm sm:text-base transition-colors duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    readOnly
                    className="w-12 sm:w-16 text-center border-t border-b border-gray-300 py-2 text-sm sm:text-base"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-r-md text-sm sm:text-base transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex flex-wrap gap-4 mb-6 sm:mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow sm:flex-grow-0 btn-primary flex items-center justify-center py-3 px-6"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
              
              {/* Features */}
              <div className="border-t border-gray-200 pt-6 mt-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mr-2" />
                    <span className="text-gray-700 text-sm sm:text-base">100% Organic</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mr-2" />
                    <span className="text-gray-700 text-sm sm:text-base">Cruelty Free</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mr-2" />
                    <span className="text-gray-700 text-sm sm:text-base">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-12 sm:mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px overflow-x-auto">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'description'
                      ? 'border-primary-500 text-white bg-primary-500 rounded-t-md'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'ingredients'
                      ? 'border-primary-500 text-white bg-primary-500 rounded-t-md'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Natural Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('howToUse')}
                  className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'howToUse'
                      ? 'border-primary-500 text-white bg-primary-500 rounded-t-md'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'benefits'
                      ? 'border-primary-500 text-white bg-primary-500 rounded-t-md'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Benefits
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'reviews'
                      ? 'border-primary-500 text-white bg-primary-500 rounded-t-md'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Customer Reviews ({productReviews.length})
                </button>
              </nav>
            </div>
            
            <div className="py-6 sm:py-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-secondary-800 mb-4">
                    Organic Product Description
                  </h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">{product.description}</p>
                  <p className="text-gray-700 text-sm sm:text-base">
                    This organic {product.categories[0].toLowerCase()} product is carefully crafted using traditional methods 
                    combined with modern organic standards to ensure the highest quality and effectiveness.
                  </p>
                </div>
              )}
              
              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-secondary-800 mb-4">
                    100% Natural Organic Ingredients
                  </h3>
                  <p className="text-gray-700 mb-6 text-sm sm:text-base">
                    All of our ingredients are sustainably sourced from certified organic farms across Pakistan and are completely natural.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.ingredients?.map((ingredient, index) => (
                      <div key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'howToUse' && (
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-secondary-800 mb-4">
                    How to Use This Organic Product
                  </h3>
                  <div className="space-y-4">
                    {product.how_to_use?.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-primary-600 font-medium text-sm sm:text-base">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'benefits' && (
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-secondary-800 mb-4">
                    Organic Benefits for Your Skin
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-secondary-800">
                      Customer Reviews for {product.name}
                    </h3>
                    <button
                      onClick={() => setIsReviewModalOpen(true)}
                      className="btn-primary w-full sm:w-auto"
                    >
                      Write a Review
                    </button>
                  </div>
                  <ReviewList reviews={productReviews} />
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