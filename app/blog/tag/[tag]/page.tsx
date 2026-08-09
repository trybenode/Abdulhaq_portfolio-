import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params
  const tagTitle = tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

  return {
    title: `${tagTitle} Articles`,
    description: `Explore articles and insights related to ${tagTitle} by Abdulrasheed Olabanji.`,
    alternates: {
      canonical: `/blog/tag/${tag}`,
    },
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const tagTitle = tag.charAt(0).toUpperCase() + tag.slice(1)

  // In a real application, you would have tags associated with each post
  // For this example, we'll simulate by matching the tag against title, excerpt, and category
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(tag.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(tag.toLowerCase()) ||
      post.category.toLowerCase() === tag.toLowerCase(),
  )

  if (filteredPosts.length === 0) {
    notFound()
  }

  return (
    <main className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <h1 className="text-3xl font-bold mb-6">Tag: {tagTitle}</h1>

        <p className="text-muted-foreground mb-12">Browse all articles tagged with "{tagTitle}".</p>

        <div className="space-y-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="border-b pb-8">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {post.date} • {post.readTime}
                </p>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-primary hover:text-primary/80 font-medium"
                >
                  Read more
                </Link>
              </div>
            ))
          ) : (
            <p>No articles found with this tag.</p>
          )}
        </div>
      </div>
    </main>
  )
}
