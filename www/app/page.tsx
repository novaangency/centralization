import { redirect } from "next/navigation";

export default function Home() {
  // Middleware will handle the redirect
  redirect("/auth/login");
}
