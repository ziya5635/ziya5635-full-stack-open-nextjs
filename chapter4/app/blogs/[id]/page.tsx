import { getBlogById } from "@/lib/actions/blogs";
import { notFound } from "next/navigation";
import { LikeItForm } from "./likeForm";

async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params;
  let { blog, success, error } = await getBlogById(+id);

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

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <article className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <header className="mb-6 border-b border-gray-100 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Blog details
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {blog.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            By <span className="font-medium text-gray-700">{blog.author}</span>
          </p>
        </header>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-500">URL:</span>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-blue-600 hover:text-blue-800 hover:underline"
            >
              {blog.url}
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-500">Likes:</span>
            <span className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
              ❤️ {blog.likes}
            </span>
          </div>
        </div>

        <footer className="mt-8 border-t border-gray-100 pt-6">
          <LikeItForm id={id} />
        </footer>
      </article>
    </div>
  );
}

export default BlogPage;

// import { getBlogById } from "@/lib/actions/blogs";
// import { notFound } from "next/navigation";
// import { LikeItForm } from "./likeForm";

// async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
//   let { id } = await params;
//   let { blog, success, error } = await getBlogById(+id);
//   if (!success) {
//     return <p>{error}</p>;
//   }
//   if (!blog) {
//     notFound();
//   }
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Blog details</h2>
//       <p>title:{blog.title}</p>
//       <p>author: {blog.author}</p>
//       <p>url: {blog.url}</p>
//       <p>likes: {blog.likes}</p>
//       <LikeItForm id={id} />
//     </div>
//   );
// }

// export default BlogPage;
