import Link from "next/link";
import { fetchAllBlogs, searchByTitle } from "@/lib/actions/blogs";

async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  let { title } = await searchParams;
  let { blogs, success, error } = await fetchAllBlogs(title);
  if (!success) {
    return <p>{error}</p>;
  }
  if (blogs.length === 0) {
    return <p>No blogs found</p>;
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form action={searchByTitle}>
        <input type="text" name="title" />
        <button type="submit">search</button>
      </form>
      <ul className="space-y-2">
        {blogs.map((item) => (
          <li key={item.id}>
            <Link
              href={`/blogs/${item.id}`}
              className="text-blue-600 hover:underline"
            >
              <p>title:{item.title}</p>
            </Link>
            <p>by:{item.author}</p>
            <p>url:{item.url}</p>
            <p>likes:{item.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blogs;
