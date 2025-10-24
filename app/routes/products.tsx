import { formatPrice } from "~/lib/format";
import type { Route } from "./+types/products";
import type { Products } from "~/modules/product/type";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";

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
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <li key={product.id}>
              <Card className="hover:shadow-lg transition bg-white border-none">
                <CardHeader className="p-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-60 object-cover rounded-t-xl"
                  />
                </CardHeader>

                <CardContent className="pt-4">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500 mt-1">
                    {product.description?.slice(0, 60) || "Deskripsi produk"}
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex-col items-start gap-2 mt-2">
                  <p className="text-[#0058A3] font-bold text-xl">
                    {formatPrice(product.price)}
                  </p>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
