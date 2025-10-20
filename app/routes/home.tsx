import type { Route } from "./+types/home";
import type { Products } from "~/modules/product/type";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ikifurni" },
    { name: "description", content: "Simple ecommerce for furniture." },
  ];
}

<<<<<<< HEAD
export async function loader({ params }: Route.ClientLoaderArgs) {
=======
type Product = {
  imageUrl: string | undefined;
  id: string;
  name: string;
  description?: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

type Products = Product[];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
>>>>>>> c2b738d (fix: update API endpoint to use environment variable for product fetching)
  const response = await fetch(`${process.env.BACKEND_API_URL}/products`);
  const products: Products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div>
      <h1>Ikifurni</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>

      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
