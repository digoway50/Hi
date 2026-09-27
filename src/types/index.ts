export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'hoodies' | 'tees' | 'bottoms' | 'outerwear';
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  description: string;
  fabric: string;
  weight: string;
  fit: string;
  sizes: string[];
  colors: {
    name: string;
    hex: string;
    inStock: boolean;
  }[];
  inStock: boolean;
  badge?: string;
  rating: number;
  reviewsCount: number;
  features: string[];
}

export interface CartItem {
  id: string; // unique cart line ID = `${productId}-${size}-${color}`
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export type CategoryFilter = 'all' | 'hoodies' | 'tees' | 'bottoms' | 'outerwear';

export interface FilterState {
  searchQuery: string;
  category: CategoryFilter;
  selectedSize: string | null;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface CustomerOrderInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}
