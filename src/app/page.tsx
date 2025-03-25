import { auth0 } from "@/lib/auth0";
import { redirect } from 'next/navigation';
import AuthClient from "@/components/auth/auth-client";

export default async function AuthPage() {
  // Check authentication server-side
  const session = await auth0.getSession();
  
  // Redirect authenticated users to home page
  if (session) {
    redirect("/home");
  }

  return <AuthClient />;
}

