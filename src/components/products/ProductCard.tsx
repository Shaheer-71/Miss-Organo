import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import useCartStore from '../../store/cartStore';
import useReviewStore from '../../store/reviewStore';
import LazyImage from '../common/LazyImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore(state => state.addItem);
  const { reviews, fetchProductReviews } = useReviewStore();

  useEffect(() => {
    fetchProductReviews(product.product_id);
  }, [product.product_id, fetchProductReviews]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.product_id);
  };

  const formatPrice = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  // Calculate average rating for this specific product
  const productReviews = reviews.filter(review => review.product_id === product.product_id);
  const averageRating = productReviews.length > 0
    ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
    : 5; // Default to 5 if no reviews

  return (
    <div className="card group">
      {/* Product Image */}
      <div className="relative overflow-hidden h-48">
        <Link to={`/products/${product.product_id}`}>
          <LazyImage
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.type === 'New Product' && (
            <span className="bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded">
              NEW
            </span>
          )}
          {product.type === 'Best Seller' && (
            <span className="bg-gold-500 text-white text-xs font-medium px-2 py-1 rounded">
              BEST SELLER
            </span>
          )}
          {product.type === 'Featured Product' && (
            <span className="bg-secondary-500 text-white text-xs font-medium px-2 py-1 rounded">
              FEATURED
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-primary-500 text-white p-2 rounded-full mx-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-primary-600"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-1">
          <span className="text-sm text-primary-600">{product.categories[0]}</span>
        </div>
        <Link to={`/products/${product.product_id}`}>
          <h3 className="font-serif text-lg font-medium text-secondary-800 mb-1 hover:text-primary-600 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="font-medium text-secondary-800">{formatPrice(product.price)}</span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < averageRating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">({productReviews.length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;