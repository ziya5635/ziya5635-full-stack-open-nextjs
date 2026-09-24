import Link from "next/link";
import { fetchAllBlogs, searchByTitle } from "@/lib/actions/blogs";
import Button from "@/components/button";

async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  const { title } = await searchParams;
  const { blogs, success, error } = await fetchAllBlogs(title);

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

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-50">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            All posts
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Blogs</h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse and search through our collection of blogs.
          </p>
        </header>

        {/* Search form */}
        <form
          action={searchByTitle}
          className="mb-8 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
        >
          <input
            type="text"
            name="title"
            placeholder="Search by title..."
            defaultValue={title ?? ""}
            className="w-full flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <Button type="submit">Search</Button>
        </form>

        {/* Empty state */}
        {blogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-medium text-gray-700">No blogs found</p>
            <p className="mt-1 text-sm text-gray-500">
              Try a different search term.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {blogs.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/blogs/${item.id}`}
                  className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        By{" "}
                        <span className="font-medium text-gray-700">
                          {item.author}
                        </span>
                      </p>
                      <p className="mt-3 truncate text-sm text-blue-600 group-hover:underline">
                        {item.url}
                      </p>
                    </div>

                    <span className="inline-flex shrink-0 items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                      ❤️ {item.likes}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Blogs;
