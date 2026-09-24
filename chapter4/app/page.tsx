import Link from "next/link";

function Home() {
  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {/* Hero section */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Welcome
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            The Blogs App
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            A simple place to write, share, and discover blogs. Add your own
            posts, browse what others have written, and show some love with
            likes.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/blogs"
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Browse blogs
            </Link>
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="pb-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              ✍️
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              Write
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Share your thoughts by adding new blog posts in seconds.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              🔍
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              Discover
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Search and browse blogs from the whole community.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              ❤️
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">Like</h3>
            <p className="mt-1 text-sm text-gray-500">
              Show appreciation for the posts that resonate with you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
