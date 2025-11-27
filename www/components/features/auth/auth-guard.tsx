"use client";

import { useSession, signOut } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/features/auth/auth-form";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <AuthForm />
      </div>
    );
  }

  return (
    <div>
      <nav className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Centralization</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session.user.email}</span>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
