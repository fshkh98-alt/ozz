import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  async function login(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await signIn("credentials", { email, password, redirectTo: "/admin" });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect("/admin/login?error=1");
      }
      throw error;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form
        action={login}
        className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-surface p-8"
      >
        <h1 className="text-xl font-semibold text-text">Admin Login</h1>
        {params.error && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            Invalid email or password.
          </p>
        )}
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-md border border-border bg-bg px-3 py-2 text-text"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="w-full rounded-md border border-border bg-bg px-3 py-2 text-text"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-accent px-4 py-2 font-medium text-bg"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
