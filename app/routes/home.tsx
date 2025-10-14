import { log } from "console";
import type { Route } from "./+types/home";
import type { Products } from "~/modules/product/type";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ikifurni" },
    { name: "description", content: "Simple ecommerce for furniture." },
  ];
}

export async function loader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(`http://localhost:3000/products`);
  const products: Products = await response.json();

  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div>
      <h1>Ikifurni</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
