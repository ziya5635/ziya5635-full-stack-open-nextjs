import { getBlogById } from "@/lib/actions/blogs";
import { likeIt } from "@/lib/actions/blogs";
import { notFound } from "next/navigation";

async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogById(+id);

  if (!blog) {
    notFound();
  }
  return (
    <div>
      <h2>Blog details</h2>
      <p>title:{blog.title}</p>
      <p>author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <form action={likeIt}>
        <input type="hidden" name="id" value={id} />
        <button type="submit">like it</button>
      </form>
    </div>
  );
}

export default BlogPage;
