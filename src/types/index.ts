
export interface Product {
  id: string;
  product_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  images: string[];
  herbs: string[];
  ingredients: string[];
  benefits: string[];
  type: 'Featured Product' | 'Best Seller' | 'New Product' | null;
  how_to_use: string[];
  rating?: number;
  reviews?: number;
  valid_from: string;
  valid_to: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category: string;
  discount: number;
  image : string;
  isNew : boolean;
  howToUse : string;
}

export interface Review {
  id: string;
  review_id: string;
  product_id: string;
  rating: number;
  comment: string | null;
  reviewer_name: string;
  review_date: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_id: string;
  quantity: number;
  order_date: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled' | 'Dispatched';
  total_amount: number;
  city: string;
  state: string;
  zip_code: string;
  payment_method: string;
  created_at : string;
  address:string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}