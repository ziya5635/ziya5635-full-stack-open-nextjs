"use client";
import AuthSessionProvider from "./authSessionProvider";
import { NotificationProvider } from "./notificationProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthSessionProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </AuthSessionProvider>
  );
}
