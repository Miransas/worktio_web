import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BlogEditor from "@/components/blog/blog-editor";

export default async function NewBlogPage() {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div className="py-8 px-6 max-w-4xl mx-auto">
      <BlogEditor />
    </div>
  );
}