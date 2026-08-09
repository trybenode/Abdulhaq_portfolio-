import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Twitter, Facebook, Linkedin, Copy, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts } from "@/lib/blog-data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abdulrasheedolabanji.com"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) {
    return {
      title: "Article not found",
      description: "The requested blog article could not be found.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.image || "/og-image.svg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/og-image.svg"],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 2)

  return (
    <main className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Abdulrasheed" />
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">Abdulrasheed Olabanji</p>
                  <p className="text-xs">Software Engineer</p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span className="text-sm">{post.date}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span className="text-sm">{post.readTime}</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg?height=800&width=1200"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <p>
              In today's rapidly evolving technological landscape, staying ahead of the curve is essential for software
              engineers. This article explores {post.title.toLowerCase()} and provides practical insights for
              implementation.
            </p>

            <h2>Understanding the Fundamentals</h2>
            <p>
              Before diving into advanced concepts, it's important to establish a solid foundation.
              {post.category === "Security" &&
                "Security in web applications starts with understanding potential vulnerabilities and attack vectors."}
              {post.category === "AI" &&
                "AI integration requires a good understanding of both the AI models you're working with and the application you're enhancing."}
              {post.category === "Mobile" &&
                "Mobile development in Africa presents unique challenges and opportunities, from connectivity issues to market potential."}
              {post.category === "React" &&
                "React performance optimization begins with understanding how React renders components and manages state."}
            </p>

            <h2>Key Considerations</h2>
            <p>When implementing {post.title.split(":")[0].toLowerCase()}, consider these important factors:</p>
            <ul>
              <li>Scalability and performance implications</li>
              <li>User experience and accessibility</li>
              <li>Security considerations and best practices</li>
              <li>Maintenance and future-proofing</li>
              <li>Integration with existing systems</li>
            </ul>

            <h2>Implementation Approach</h2>
            <p>A step-by-step approach to implementation ensures thorough coverage of all aspects:</p>
            <ol>
              <li>Analysis and planning</li>
              <li>Architecture design</li>
              <li>Development and testing</li>
              <li>Deployment and monitoring</li>
              <li>Continuous improvement</li>
            </ol>

            <h2>Best Practices</h2>
            <p>Following industry best practices will help ensure success:</p>
            <ul>
              <li>Document your code and processes thoroughly</li>
              <li>Implement comprehensive testing strategies</li>
              <li>Follow security guidelines relevant to your domain</li>
              <li>Optimize for performance from the beginning</li>
              <li>Consider scalability in your initial design</li>
            </ul>

            <h2>Conclusion</h2>
            <p>
              {post.excerpt} This article has provided an overview of key concepts and implementation strategies. By
              following these guidelines, you can ensure a successful implementation that meets both current needs and
              future requirements.
            </p>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Software Development", post.category, "Best Practices", "Tutorial"].map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Share this article</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image || "/placeholder.svg?height=300&width=500"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-2">{relatedPost.category}</Badge>
                    <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <Button variant="ghost" size="sm" asChild className="mt-2">
                      <Link href={`/blog/${relatedPost.slug}`}>Read article</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Subscribe to my newsletter</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Get notified when I publish new articles and insights. No spam, just valuable content.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-l-md border border-input bg-background"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
