import Link from "next/link";
import { getBlogs } from "../services/blogs";

function Blogs() {
  const blogs = getBlogs();
  const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return (
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
  );
}

export default Blogs;
