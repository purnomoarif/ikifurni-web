import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { formatDateTime } from "~/lib/format";
import type { MeResponse } from "~/modules/user/type";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export async function clientLoader() {
  const token = Cookies.get("token");
  if (!token) return redirect("/login");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }

  const meResponse: MeResponse = await response.json();
  return { meResponse };
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { meResponse } = loaderData;
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("token");
    navigate("/login");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Your account overview</p>
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>
            Basic information about your account
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <section>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{meResponse.fullName}</p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-medium">{meResponse.username}</p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{meResponse.email}</p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-mono text-sm break-all">{meResponse.id}</p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium">
                {formatDateTime(meResponse.createdAt as unknown as string)}
              </p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground">Updated At</p>
              <p className="font-medium">
                {formatDateTime(meResponse.updatedAt as unknown as string)}
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
