import type { Product } from "../product/type";

export type CartItem = {
  id: string;

  product: Product;
  productId: string;

  quantity: number;

  createdAt: Date;
  updatedAt: Date;
};

export type Cart = {
  id: string;
  userId: string;

  items: CartItem[];

  createdAt: Date;
  updatedAt: Date;
};
