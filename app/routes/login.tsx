import { Form, Link } from "react-router";
import type { Route } from "./+types/login";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Log In" }];
}

export default function LoginRoute({}: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
            Continue to your account
          </CardTitle>
          <CardDescription className="text-center">
            No Account?{" "}
            <Link className="text-primary-foreground font-bold" to="/register">
              Register here
            </Link>
          </CardDescription>
        </CardHeader>

        <Form method="post">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ikifurni@ikifurni.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const email = formData.get("email")?.toString();

  const password = formData.get("password")?.toString();

  const loginBody = {
    email,
    password,
  };

  console.log(loginBody);
  // const project = await someApi.updateProject({ title });

  return null;
}
