import { Outlet } from "react-router";

export default function LayoutMain() {
  const year = new Date().getFullYear();
  return (
    <div>
      <nav>
        <img src="/logo.svg" alt="Logo" />
      </nav>

      <Outlet />

      <footer>
        <p>&copy; {year} Ikifurni</p>
      </footer>
    </div>
  );
}
