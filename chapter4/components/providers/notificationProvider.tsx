"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type NotificationType = "success" | "error";

type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotification: (message: string, type?: NotificationType) => void;
};

let NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [message, setMessage] = useState("");
  let [type, setType] = useState<NotificationType>("success");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // function showNotification(msg: string, type: NotificationType = "success") {
  //   setMessage(msg);
  //   setType(type);
  //   setTimeout(() => setMessage(""), 5000);
  // }

  const showNotification = useCallback(
    (msg: string, t: NotificationType = "success") => {
      setMessage(msg);
      setType(t);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMessage(""), 5000);
    },
    [],
  );

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
