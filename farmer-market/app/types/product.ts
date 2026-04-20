export interface Product {
  _id: string;
  name: string;
  category: string;
  price?: number;
  quantity?: string;
  location: string;
  phone: string;
  images: string[];
  description?: string;
}
