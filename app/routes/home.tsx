import { log } from "console";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ikifurni" },
    { name: "description", content: "Simple ecommerce for furniture." },
  ];
}

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

type Products = Product[];

export async function loader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(`http://localhost:3000/products`);
  const products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  console.log({ products });
  return (
    <div>
      <h1>Ikifurni</h1>
    </div>
  );
}
