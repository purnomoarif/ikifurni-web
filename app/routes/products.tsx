import type { Route } from "./+types/products";
import type { Products } from "~/modules/product/type";

import { ProductsGrid } from "~/modules/product/products-grid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products - Ikifurni" },
    { name: "description", content: "All products from Ikifurni." },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`
  );
  const products: Products = await response.json();
  return products;
}

export default function ProductsRoute({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div>
      <section id="products" className="max-w-5xl mx-auto px-6 py-16  ">
        <ProductsGrid products={products} />
      </section>
    </div>
  );
}
