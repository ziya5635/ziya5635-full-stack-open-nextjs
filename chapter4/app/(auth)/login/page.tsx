import { Suspense } from "react";
import LoginForm from "./loginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center text-white">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
