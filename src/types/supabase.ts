export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          product_id: string
          name: string
          description: string
          price: number
          stock: number
          categories: string[]
          images: string[]
          herbs: string[]
          ingredients: string[]
          benefits: string[]
          type: 'Featured Product' | 'Best Seller' | 'New Product' | null
          how_to_use: string[]
          valid_from: string
          valid_to: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          description: string
          price: number
          stock?: number
          categories?: string[]
          images?: string[]
          herbs?: string[]
          ingredients?: string[]
          benefits?: string[]
          type?: 'Featured Product' | 'Best Seller' | 'New Product' | null
          how_to_use?: string[]
          valid_from?: string
          valid_to?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          description?: string
          price?: number
          stock?: number
          categories?: string[]
          images?: string[]
          herbs?: string[]
          ingredients?: string[]
          benefits?: string[]
          type?: 'Featured Product' | 'Best Seller' | 'New Product' | null
          how_to_use?: string[]
          valid_from?: string
          valid_to?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          review_id: string
          product_id: string
          rating: number
          comment: string | null
          reviewer_name: string
          review_date: string
          valid_from: string
          valid_to: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          review_id: string
          product_id: string
          rating: number
          comment?: string | null
          reviewer_name: string
          review_date?: string
          valid_from?: string
          valid_to?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          product_id?: string
          rating?: number
          comment?: string | null
          reviewer_name?: string
          review_date?: string
          valid_from?: string
          valid_to?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_id: string
          customer_name: string
          email: string
          phone: string
          shipping_address: Json
          payment_method: string
          status: 'Pending' | 'Fulfilled' | 'Cancelled' | 'Dispatched'
          total_amount: number
          valid_from: string
          valid_to: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          customer_name: string
          email: string
          phone: string
          shipping_address: Json
          payment_method: string
          status?: 'Pending' | 'Fulfilled' | 'Cancelled' | 'Dispatched'
          total_amount: number
          valid_from?: string
          valid_to?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          customer_name?: string
          email?: string
          phone?: string
          shipping_address?: Json
          payment_method?: string
          status?: 'Pending' | 'Fulfilled' | 'Cancelled' | 'Dispatched'
          total_amount?: number
          valid_from?: string
          valid_to?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      brand_reviews: {
        Row: {
          id: string
          review_id: string
          reviewer_name: string
          reviewer_email: string
          rating: number
          comment: string | null
          review_date: string
          valid_from: string
          valid_to: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          review_id: string
          reviewer_name: string
          reviewer_email: string
          rating: number
          comment?: string | null
          review_date?: string
          valid_from?: string
          valid_to?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          reviewer_name?: string
          reviewer_email?: string
          rating?: number
          comment?: string | null
          review_date?: string
          valid_from?: string
          valid_to?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      product_type: 'Featured Product' | 'Best Seller' | 'New Product'
      order_status: 'Pending' | 'Fulfilled' | 'Cancelled' | 'Dispatched'
    }
  }
}