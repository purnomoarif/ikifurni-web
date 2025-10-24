import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatPrice } from "~/lib/format";
import type { Products } from "~/modules/product/type";

export function ProductsGrid({ products }: { products: Products }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link to={`/products/${product.slug}`}>
              <Card className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-end">
                  <p className="text-2xl font-bold text-primary-foreground">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-md text-muted-foreground">
                    Stock: {product.stock}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
