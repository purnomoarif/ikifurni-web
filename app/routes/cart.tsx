import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router";

import type { Route } from "./+types/cart";
import type { Cart } from "~/modules/cart/type";

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
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("token");
    navigate("/login");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">Selected products to buy</p>
      </header>

      <div>{JSON.stringify(cart, null)}</div>
    </div>
  );
}
