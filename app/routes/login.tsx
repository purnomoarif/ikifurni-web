import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Log In" }];
}

export default function LoginRoute({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Log in to your account</h1>
    </div>
  );
}
