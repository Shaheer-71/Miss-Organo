import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { Review } from '../types';

export const reviewService = {
  async getProductReviews(productId: string) {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('is_active', true)
      .order('review_date', { ascending: false });

    if (error) throw error;
    return reviews;
  },

  async addReview(review: {
    product_id: string;
    rating: number;
    comment: string | null;
    reviewer_name: string;
  }) {
    const reviewId = uuidv4();
    const reviewDate = new Date().toISOString();

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        review_id: reviewId,
        product_id: review.product_id,
        rating: review.rating,
        comment: review.comment,
        reviewer_name: review.reviewer_name || 'Anonymous',
        review_date: reviewDate,
        valid_from: reviewDate,
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};