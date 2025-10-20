export type Product = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Products = Product[];
