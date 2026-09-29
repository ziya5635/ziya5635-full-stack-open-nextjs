"use client";

import Button from "@/components/button";
import { useNotification } from "@/components/providers/notificationProvider";
import { generateUserToken } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState = { error: "", token: "" };

export function GenerateTokenForm() {
  let [state, formAction, isPending] = useActionState(
    generateUserToken,
    initialState,
  );
  let router = useRouter();
  let { showNotification } = useNotification();

  useEffect(() => {
    if (state?.error) {
      showNotification(state.error, "error");
    }
  }, [state, showNotification]);

  useEffect(() => {
    if (state.token) {
      router.refresh(); //re-fetches the current force-dynamic route
    }
  }, [state.token, router]);

  return (
    <form action={formAction} className="space-y-4">
      <Button type="submit" disabled={isPending}>
        {isPending ? "Generating..." : "Generate Token"}
      </Button>
    </form>
  );
}
