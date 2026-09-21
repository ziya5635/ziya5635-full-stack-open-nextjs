import { getBlogById } from "@/lib/actions/blogs";
import { notFound } from "next/navigation";
import { LikeItForm } from "./likeForm";

async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params;
  let { blog, success, error } = await getBlogById(+id);
  if (!success) {
    return <p>{error}</p>;
  }
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
      <LikeItForm id={id} />
    </div>
  );
}

export default BlogPage;
