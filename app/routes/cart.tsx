import Cookies from "js-cookie";

import type { Route } from "./+types/cart";
import { redirect } from "react-router";
import type { Cart } from "~/modules/cart/type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { formatPrice } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Shopping Cart" }];
}

export async function clientLoader() {
  const token = Cookies.get("token");
  if (!token) return redirect("/login");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }

  const cart: Cart = await response.json();

  return { cart };
}

export default function CartRoute({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">Selected products to buy</p>
      </header>

      {cart.items.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-16 w-16 shrink-0 rounded-md object-cover border"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatPrice(item.product.price)} each
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Qty</div>
                        <div className="font-medium">{item.quantity}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-right text-sm">
                      Subtotal:{" "}
                      <span className="font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Items</span>
                <span>
                  {cart.items.reduce((acc, it) => acc + it.quantity, 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-semibold">
                  {formatPrice(
                    cart.items.reduce(
                      (acc, it) => acc + it.product.price * it.quantity,
                      0
                    )
                  )}
                </span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
