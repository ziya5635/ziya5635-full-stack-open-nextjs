import { getUserByUsername } from "@/lib/actions/users";
import Link from "next/link";
import { notFound } from "next/navigation";

async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  let { username } = await params;
  let user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h2>
        {user.name}({user.username})
      </h2>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>author: {blog.author}</p>
            <p>likes: {blog.likes}</p>
            <p>url: {blog.url}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;
