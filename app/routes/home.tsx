import type { Route } from "./+types/home";
import type { Products } from "~/modules/product/type";
import { ProductsGrid } from "~/modules/product/products-grid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ikifurni" },
    { name: "description", content: "Simple ecommerce for furniture." },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`
  );
  const products: Products = await response.json();
  return products;
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div>
      <section>
        <img src="/hero-section.jpg" alt="hero-section" />
      </section>
      <section id="products" className="max-w-5xl mx-auto px-6 py-16  ">
        <ProductsGrid products={products} />
      </section>
    </div>
  );
}
