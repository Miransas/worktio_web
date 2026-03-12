import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogDirectory = path.join(process.cwd(), "content/blog")

export function getBlogPosts() {
  const files = fs.readdirSync(blogDirectory)

  return files.map((file) => {
    const slug = file.replace(".mdx", "")
    const fullPath = path.join(blogDirectory, file)

    const fileContent = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContent)

    return {
      slug,
      ...data,
    }
  })
}