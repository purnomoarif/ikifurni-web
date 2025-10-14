export type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Products = Product[];
