import { formatPrice } from "~/lib/format";
import type { Route } from "./+types/home";
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
    { title: "Ikifurni" },
    { name: "description", content: "Simple ecommerce for furniture." },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`
  );
  const products: Products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0058A3] mb-4">
              Desain Skandinavia, Kenyamanan Modern
            </h1>
            <p className="text-gray-700 mb-6 max-w-md">
              Temukan inspirasi furnitur minimalis untuk rumahmu dengan sentuhan
              elegan dan harga terjangkau.
            </p>
            <a
              href="#products"
              className="bg-[#FFCC00] text-[#0058A3] font-semibold px-6 py-3 rounded-md shadow hover:bg-[#f5bf00] transition"
            >
              Belanja Sekarang
            </a>
          </div>
          <div className="flex-1 mt-10 lg:mt-0">
            <img
              src="https://www.ikea.co.id/_ui/responsive/theme-ikea/images/homepage/hero-home.jpg"
              alt="Ikifurni hero"
              className="rounded-2xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-[#0058A3] mb-10">
          Produk Pilihan Kami
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                  <button className="w-full bg-[#FFCC00] text-[#0058A3] font-semibold py-2 rounded-md hover:bg-[#f5bf00] transition">
                    Tambah ke Keranjang
                  </button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0058A3] text-white py-8 text-center mt-10">
        <p className="text-sm">© {new Date().getFullYear()} Ikifurni</p>
      </footer>
    </div>
  );
}
