"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { ArrowLeft, Calendar, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPageClient() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = searchQuery
    ? blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : blogPosts

  return (
    <main className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/#blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Sharing my thoughts, experiences, and knowledge on software development, AI integration, cybersecurity, and
            tech trends.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12 fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <BlogListing posts={filteredPosts} />
          </div>

          <div className="space-y-8">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}

function BlogListing({ posts }: { posts: typeof blogPosts }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">All Articles</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input type="text" placeholder="Search articles..." className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </TabsContent>

        {['development', 'ai', 'security', 'mobile'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-8">
            {posts.filter((post) => post.category.toLowerCase() === category).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-center mt-12">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <span>...</span>
          <Button variant="outline" size="icon">
            8
          </Button>
        </div>
      </div>
    </div>
  )
}

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-48 md:h-full">
          <Image
            src={post.image || "/placeholder.svg?height=300&width=300"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="md:col-span-2 flex flex-col p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Badge className="bg-primary hover:bg-primary/90">{post.category}</Badge>
            <Separator orientation="vertical" className="h-4" />
            <Calendar size={14} />
            <span>{post.date}</span>
            <Separator orientation="vertical" className="h-4" />
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>

          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Abdulrasheed" />
                <AvatarFallback>AO</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Abdulrasheed Olabanji</span>
            </div>

            <Button variant="ghost" size="sm" asChild>
              <Link href={`/blog/${post.slug}`}>Read more</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function BlogSidebar() {
  const categories = [
    { name: "Web Development", count: 12 },
    { name: "AI & Machine Learning", count: 8 },
    { name: "Cybersecurity", count: 6 },
    { name: "Mobile Development", count: 5 },
    { name: "UI/UX Design", count: 4 },
    { name: "Career Advice", count: 3 },
  ]

  const popularTags = [
    "React",
    "Next.js",
    "AI",
    "Python",
    "JavaScript",
    "Cybersecurity",
    "Mobile",
    "API",
    "UI/UX",
    "TypeScript",
    "Django",
    "Firebase",
    "Node.js",
  ]

  const recentPosts = blogPosts.slice(0, 3)

  return (
    <>
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h3>
        <p className="text-sm text-muted-foreground mb-4">Get notified when I publish new articles and insights.</p>
        <div className="space-y-2">
          <Input type="email" placeholder="Your email address" />
          <Button className="w-full">Subscribe</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.name} className="flex items-center justify-between">
              <Link href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-muted-foreground hover:text-primary">
                {category.name}
              </Link>
              <span className="text-sm text-muted-foreground">{category.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground hover:text-primary"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image src={post.image || "/placeholder.svg?height=64&width=64"} alt={post.title} fill className="object-cover" />
              </div>
              <div>
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium hover:text-primary">
                  {post.title}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
