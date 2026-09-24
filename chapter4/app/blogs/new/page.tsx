"use client";

import { useNotification } from "@/components/providers/notificationProvider";
import { createBlog } from "@/lib/actions/blogs";
import Button from "@/components/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState = {
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
    } else {
      showNotification(state.error);
    }
  }, [state, showNotification, router]);

  if (status === "loading") return null;

  const inputClasses =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-50">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            New post
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Create a new blog
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to publish your blog.
          </p>
        </header>

        {/* Form card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form action={formAction} className="space-y-5">
            <div>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                Title
                <input
                  type="text"
                  name="title"
                  required
                  disabled={pending}
                  defaultValue={state.title || ""}
                  placeholder="A catchy title for your blog"
                  className={inputClasses}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                Author
                <input
                  type="text"
                  name="author"
                  required
                  disabled={pending}
                  defaultValue={state.author || ""}
                  placeholder="Your name"
                  className={inputClasses}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                URL
                <input
                  type="text"
                  name="url"
                  required
                  disabled={pending}
                  defaultValue={state.url || ""}
                  placeholder="https://example.com/my-blog"
                  className={inputClasses}
                />
              </label>
            </div>

            {/* {state.error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {state.error}
              </div>
            )} */}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                action={() => router.back()}
                disabled={pending}
                className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={pending}
                className="w-full sm:w-auto"
              >
                {pending ? "Creating..." : "Create blog"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewBlog;
