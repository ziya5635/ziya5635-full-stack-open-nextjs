"use client";

import { useActionState, useEffect } from "react";
import { registerUser } from "@/lib/actions/users";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useNotification } from "@/components/providers/notificationProvider";

let initialState = {
  error: "",
  username: "",
  name: "",
  password: "",
  passwordConfirm: "",
};

export default function RegisterPage() {
  let { status } = useSession();
  let router = useRouter();
  let [state, formAction, pending] = useActionState(registerUser, initialState);
  let { showNotification } = useNotification();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/blogs/new");
    }
  }, [status, router]);

  useEffect(() => {
    if (state.error) {
      showNotification(state.error, "error");
    }
  }, [state, showNotification, router]);

  const inputClasses =
    "w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="flex flex-1 items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-2xl sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign up to start writing and sharing blogs.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-200">
              Username
              <input
                type="text"
                name="username"
                required
                defaultValue={state.username}
                disabled={pending}
                placeholder="johnDoe"
                className={inputClasses}
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-200">
              Name
              <input
                type="text"
                name="name"
                required
                defaultValue={state.name}
                disabled={pending}
                placeholder="John Doe"
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
                defaultValue={state.password}
                disabled={pending}
                placeholder="••••••••"
                className={inputClasses}
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-200">
              Confirm Password
              <input
                type="password"
                name="passwordConfirm"
                required
                defaultValue={state.passwordConfirm}
                disabled={pending}
                placeholder="••••••••"
                className={inputClasses}
              />
            </label>
          </div>

          {/* {state.error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {state.error}
            </div>
          )} */}

          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
