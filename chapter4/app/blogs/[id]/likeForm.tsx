"use client";

import Button from "@/components/button";
import { likeIt } from "@/lib/actions/blogs";
import { useActionState } from "react";

export function LikeItForm({ id }: { id: string }) {
  let [state, formAction, pending] = useActionState(likeIt, {
    success: false,
    error: "",
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" disabled={pending}>
        like it
      </Button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
}
