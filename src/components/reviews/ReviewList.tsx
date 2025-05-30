import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
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
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getRandomColor(review.reviewer_name)}`}>
                <span className="text-lg font-medium">
                  {getInitial(review.reviewer_name)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{review.reviewer_name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.review_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? 'text-gold-500 fill-gold-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          {review.comment && (
            <p className="text-gray-700">{review.comment}</p>
          )}
        </div>
      ))}

      {reviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;