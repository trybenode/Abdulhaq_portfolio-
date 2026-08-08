import type { Metadata } from "next"
import BlogPageClient from "@/components/blog-page-client"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on software engineering, AI integration, web performance, cybersecurity, and product building from Abdulrasheed Olabanji.",
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
