import Link from "next/link";
import { fetchAllBlogs, searchByTitle } from "@/lib/actions/blogs";

async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  let { title } = await searchParams;
  let blogs = await fetchAllBlogs(title);
  return (
    <>
      <form action={searchByTitle}>
        <input type="text" name="title" />
        <button type="submit">search</button>
      </form>
      <ul>
        {blogs.map((item) => (
          <li key={item.id}>
            <Link href={`/blogs/${item.id}`}>
              <p>title:{item.title}</p>
            </Link>
            <p>by:{item.author}</p>
            <p>url:{item.url}</p>
            <p>likes:{item.likes}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Blogs;
