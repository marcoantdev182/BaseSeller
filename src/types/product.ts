export type ProductVariation = {
  label: string;
  options: string[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  gallery: string[];
  stock: number;
  featured: boolean;
  variations: ProductVariation[];
};

