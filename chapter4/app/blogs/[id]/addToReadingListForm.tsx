"use client";

import Button from "@/components/button";
import { useNotification } from "@/components/providers/notificationProvider";
import { addToReadingListAction } from "@/lib/actions/readingLists";
import { useActionState, useEffect } from "react";

export function AddToReadingListForm({ id }: { id: string }) {
  let [state, formAction, pending] = useActionState(addToReadingListAction, {
    success: false,
    error: "",
  });
  let { showNotification } = useNotification();

  useEffect(() => {
    if (state.error) {
      showNotification(state.error, "error");
    }
  }, [state, showNotification]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" disabled={pending}>
        Add to reading list
      </Button>
    </form>
  );
}
