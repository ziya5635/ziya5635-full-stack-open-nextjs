"use client";
import { useNotification } from "@/app/components/providers/notificationProvider";
import { createBlog } from "@/lib/actions/blogs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

let initialState = {
  success: false,
  error: "",
  title: "",
  author: "",
  url: "",
};

function NewBlog() {
  let { status } = useSession();
  let [state, formAction, pending] = useActionState(createBlog, initialState);
  let { showNotification } = useNotification();
  let router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  if (status === "loading") return null;

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              defaultValue={state.title || ""}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              name="author"
              required
              defaultValue={state.author || ""}
            />
          </label>
        </div>
        <div>
          <label>
            Url
            <input
              type="text"
              name="url"
              required
              defaultValue={state.url || ""}
            />
          </label>
        </div>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        <button type="submit" disabled={pending}>
          Create
        </button>
      </form>
    </div>
  );
}

export default NewBlog;
