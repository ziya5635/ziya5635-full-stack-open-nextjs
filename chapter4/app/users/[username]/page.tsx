import { getUserByUsername } from "@/lib/actions/users";
import Link from "next/link";
import { notFound } from "next/navigation";

async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { user, success, error } = await getUserByUsername(username);

  if (!success) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-700 shadow-sm">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-50">
      <div className="w-full max-w-3xl">
        {/* Profile header card */}
        <div className="mb-8 flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Avatar with initials */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-lg font-semibold uppercase text-white shadow-sm">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {user.name}
            </h1>
            <p className="truncate text-sm text-gray-500">@{user.username}</p>
          </div>

          <span className="hidden shrink-0 items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 sm:inline-flex">
            {user.blogs.length} {user.blogs.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {/* Blogs section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Blogs</h2>
            <span className="text-sm text-gray-500 sm:hidden">
              {user.blogs.length} {user.blogs.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {user.blogs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-medium text-gray-700">No blogs yet</p>
              <p className="mt-1 text-sm text-gray-500">
                This user hasn&apos;t published any blogs.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {user.blogs.map((blog) => (
                <li key={blog.id}>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                          {blog.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          By{" "}
                          <span className="font-medium text-gray-700">
                            {blog.author}
                          </span>
                        </p>
                        <p className="mt-3 truncate text-sm text-blue-600 group-hover:underline">
                          {blog.url}
                        </p>
                      </div>

                      <span className="inline-flex shrink-0 items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                        ❤️ {blog.likes}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserPage;
