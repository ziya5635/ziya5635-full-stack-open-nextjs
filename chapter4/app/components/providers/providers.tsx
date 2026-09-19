"use client";
import AuthSessionProvider from "./authSessionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
