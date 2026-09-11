import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await signIn("credentials", { email, password, redirect: false });
    } catch {
      redirect("/admin/login?error=1");
    }
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form
        action={login}
        className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-surface p-8"
      >
        <h1 className="text-xl font-semibold text-text">Admin Login</h1>
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
