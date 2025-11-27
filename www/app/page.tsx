import { AuthGuard } from "@/components/features/auth/auth-guard";

export default function Home() {
  return (
    <AuthGuard>
      <div className="container py-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold">Welcome to Centralization</h1>
          <p className="text-lg text-muted-foreground">
            Your Freelance Management Dashboard
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="font-semibold">Clients</h3>
              <p className="text-sm text-muted-foreground">Manage your clients</p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="font-semibold">Projects</h3>
              <p className="text-sm text-muted-foreground">Track your projects</p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="font-semibold">Tasks</h3>
              <p className="text-sm text-muted-foreground">Organize your tasks</p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
