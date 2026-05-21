export type CartSelections = Record<string, string>;

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
  selections: CartSelections;
};

