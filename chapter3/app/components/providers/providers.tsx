"use client";

import { Session } from "next-auth";
import AuthSessionProvider from "./authSessionProvider";

export function Providers({
  children,
  session = null,
}: {
  children: React.ReactNode;
  session?: Session | null; // accepts the server‑fetched session
}) {
  return (
    <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
  );
}
