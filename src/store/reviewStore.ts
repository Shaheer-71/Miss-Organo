import { create } from 'zustand';
import { Review } from '../types';
import { reviewService } from '../services/reviewService';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  fetchProductReviews: (productId: string) => Promise<void>;
  addReview: (review: {
    product_id: string;
    rating: number;
    comment: string | null;
    reviewer_name: string;
  }) => Promise<void>;
}

const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  isLoading: false,
  error: null,

  fetchProductReviews: async (productId: string) => {
    set({ isLoading: true, error: null });
    try {
      const reviews = await reviewService.getProductReviews(productId);
      // Merge new reviews with existing ones, avoiding duplicates
      set(state => {
        const existingReviews = state.reviews.filter(r => r.product_id !== productId);
        return {
          reviews: [...existingReviews, ...reviews],
          isLoading: false
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addReview: async (review) => {
    set({ isLoading: true, error: null });
    try {
      const newReview = await reviewService.addReview(review);
      set(state => ({
        reviews: [newReview, ...state.reviews],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  }
}));

export default useReviewStore;