"use client";
import { useActionState, useEffect } from "react";
import Button from "@/components/button";
import { useNotification } from "@/components/providers/notificationProvider";
import { makeAsReadAction } from "@/lib/actions/readingLists";

let initialState = { error: "", success: false };

function MakeAsRead({ blogId }: { blogId: number }) {
  let [state, formAction, isPending] = useActionState(
    makeAsReadAction,
    initialState,
  );
  let { showNotification } = useNotification();

  useEffect(() => {
    if (state.error) {
      showNotification(state.error, "error");
    }
  }, [showNotification, state]);

  return (
    <form action={formAction}>
      <input defaultValue={blogId} name="blogId" type="hidden" />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Applying..." : "Make as read"}
      </Button>
    </form>
  );
}

export default MakeAsRead;
