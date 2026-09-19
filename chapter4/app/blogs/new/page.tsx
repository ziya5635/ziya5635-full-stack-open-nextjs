"use client";
import { createBlog } from "@/lib/actions/blogs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useActionState } from "react";

let initialState = { error: "", title: "", author: "", url: "" };
function NewBlog() {
  let { data: session } = useSession();
  let [state, formAction, pending] = useActionState(createBlog, initialState);
  if (!session) redirect("/login");

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
              defaultValue={state.title}
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
              defaultValue={state.author}
            />
          </label>
        </div>
        <div>
          <label>
            Url
            <input type="text" name="url" required defaultValue={state.url} />
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
