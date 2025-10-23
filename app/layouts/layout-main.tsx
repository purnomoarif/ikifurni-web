import {
  ArmchairIcon,
  HouseIcon,
  KeyRoundIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";

export default function LayoutMain() {
  const year = new Date().getFullYear();
  return (
    <div>
      <nav>
        <ul className="flex gap-10 items-center">
          <li>
            <Button asChild>
              <Link to="/">
                <HouseIcon />
                Home
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link to="/products">
                <ArmchairIcon />
                Products
              </Link>
            </Button>
          </li>
          <li>
            <Link to="/">
              <img src="/logo.svg" alt="Logo" />
            </Link>
          </li>
          <li>
            <Button asChild>
              <Link to="/cart">
                <ShoppingCartIcon />
                Cart
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link to="login">
                <KeyRoundIcon />
                Login
              </Link>
            </Button>
          </li>
        </ul>
      </nav>

      <Outlet />

      <footer>
        <p>&copy; {year} Ikifurni</p>
      </footer>
    </div>
  );
}
