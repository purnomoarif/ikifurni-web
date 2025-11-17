import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Route } from "./+types/products-slug";
import type { Product } from "~/modules/product/type";
import { formatPrice } from "~/lib/format";
import { Form, redirect } from "react-router";

import Cookies from "js-cookie";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products Name - Ikifurni" },
    { name: "description", content: "Product description." },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const slug = params.slug;
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products/${slug}`
  );
  const product: Product = await response.json();
  return product;
}

export default function ProductsSlugRoute({
  loaderData,
}: Route.ComponentProps) {
  const product = loaderData;

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* === Product Image === */}
        <CardHeader className="p-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
          />
        </CardHeader>

        {/* === Product Info === */}
        <CardContent className="flex flex-col py-6">
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </CardTitle>
            <CardDescription className="text-gray-600 mb-4">
              {product.description}
            </CardDescription>

            <p className="text-[#0058A3] text-2xl font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* === Add to Cart Form === */}
          <CardFooter className="flex flex-col gap-4 mt-8 px-0">
            <Form
              method="PUT"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full"
            >
              <input type="hidden" name="productId" value={product.id} />

              <div className="flex items-center gap-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  defaultValue={1}
                  className="w-20 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0058A3]"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#0058A3] text-white rounded-lg px-6 py-2 font-medium hover:bg-[#004b8f] transition-all"
              >
                Add to Cart
              </button>
            </Form>
          </CardFooter>
        </CardContent>
      </div>
    </section>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const token = Cookies.get("token");
  if (!token) return redirect("/login");

  const formData = await request.formData();

  const addToCartBody = {
    productId: formData.get("productId")?.toString(),

    quantity: Number(formData.get("quantity") || 1),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/cart/items`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addToCartBody),
    }
  );
  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }
  await response.json();

  return redirect("/cart");
}
