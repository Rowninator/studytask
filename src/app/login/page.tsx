import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <AuthForm mode="login" />
    </main>
  );
}
