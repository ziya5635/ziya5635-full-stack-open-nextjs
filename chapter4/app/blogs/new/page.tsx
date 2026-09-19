import { auth } from "@/auth";
import { createBlog } from "@/lib/actions/blogs";
import { redirect } from "next/navigation";

async function NewBlog() {
  let session = await auth();
  if (!session) redirect("/login");
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlog}>
        <div>
          <label>
            Title
            <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            author
            <input type="text" name="author" required />
          </label>
        </div>
        <div>
          <label>
            Url
            <input type="text" name="url" required />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewBlog;
