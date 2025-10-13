import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ikifurni" },
    { name: "description", content: "Simple ecommerce for furniture." },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Ikifurni</h1>
    </div>
  );
}
