import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { formatPrice } from "~/lib/format";
import type { Products } from "~/modules/product/type";

export function ProductsGrid({ products }: { products: Products }) {
  return (
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
  );
}
