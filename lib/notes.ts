import { blogPosts } from "./blog-data";
export type Note = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  status: "draft" | "published";
  file?: string;
  publishedAt?: string;
};
export const notes: Note[] = blogPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  status: "draft",
  ...(post.slug === "building-secure-web-applications"
    ? { file: "building-secure-web-applications.mdx" }
    : {}),
}));
export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}
