"use client";

import { useNotification } from "./providers/notificationProvider";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      className={`px-4 py-2.5 mb-2.5 rounded text-white ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}
