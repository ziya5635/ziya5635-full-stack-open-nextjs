"use client";

import Button from "@/components/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  let router = useRouter();
  let [error, setError] = useState("");
  let [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    let formData = new FormData(e.currentTarget);

    let result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
      setIsSubmitting(false);
    } else {
      router.push("/");
      // to force the Server Components in the tree to re-render with the new session
      router.refresh();
    }
  }

  const inputClasses =
    "w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="flex flex-1 items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-2xl sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-400">
            Log in to continue reading and writing blogs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-200">
              Username
              <input
                type="text"
                name="username"
                required
                disabled={isSubmitting}
                placeholder="johndoe"
                className={inputClasses}
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-200">
              Password
              <input
                type="password"
                name="password"
                required
                disabled={isSubmitting}
                placeholder="••••••••"
                className={inputClasses}
              />
            </label>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
