import { Form, Link } from "react-router";
import type { Route } from "./+types/register";
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
  return [{ title: "Register" }];
}

export default function RegisterRoute({}: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
            Create New Account
          </CardTitle>
          <CardDescription className="text-center">
            Have Account?{" "}
            <Link className="text-primary-foreground font-bold" to="/login">
              Log in here
            </Link>
          </CardDescription>
        </CardHeader>

        <Form method="post">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Ikifurni"
                required
              />
            </div>

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
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Ikifurni"
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
              Register User
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const fullName = formData.get("fullName")?.toString();
  const password = formData.get("password")?.toString();

  const registerBody = {
    username,
    email,
    fullName,
    password,
  };

  console.log(registerBody);
  // const project = await someApi.updateProject({ title });

  return null;
}
