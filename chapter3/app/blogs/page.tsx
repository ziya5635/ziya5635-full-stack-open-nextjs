import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { searchByTitle } from "../actions/blogs";

async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  const { title } = await searchParams;
  const blogs = getBlogs();
  let orderedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  if (title) {
    orderedBlogs = orderedBlogs.filter((item) => item.title === title);
  }
  return (
    <>
      <form action={searchByTitle}>
        <input type="text" name="title" />
        <button type="submit">search</button>
      </form>
      <ul>
        {orderedBlogs.map((item) => (
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
