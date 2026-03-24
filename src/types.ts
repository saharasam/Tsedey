export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  size: string;
  image: string;
  description: string;
  isNew?: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'shop' | 'product' | 'cart';
