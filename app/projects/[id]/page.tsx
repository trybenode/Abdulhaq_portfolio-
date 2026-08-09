import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code,
  CheckCircle2,
  Lightbulb,
  Puzzle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectGallery } from "@/components/project-gallery";
import { getProjectImages, projectsData } from "@/lib/projects-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abdulrasheedolabanji.com"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = projectsData.find((item) => item.id.toString() === id)

  if (!project) {
    return {
      title: "Project not found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${siteUrl}/projects/${project.id}`,
      type: "website",
      images: [
        {
          url: getProjectImages(project)[0] || "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${project.title} project preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [getProjectImages(project)[0] || "/og-image.svg"],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params
  const project = projectsData.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  // Find related projects (same category, excluding current project)
  const relatedProjects = projectsData
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return (
    <main className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {project.title}
            <span className=" ml-4 py-2 px-4 text-sm rounded-lg font-bold bg-white text-amber-700">{project.collaborated ? "Collaborated" : ""}</span>
          </h1>
          <p className="text-xl text-muted-foreground">{project.description}</p>
        </div>

        <ProjectGallery project={project} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Code className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Technologies</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Lightbulb className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Challenge</h2>
              </div>
              <p className="text-muted-foreground">{project.challenge}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Puzzle className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Solution</h2>
              </div>
              <p className="text-muted-foreground">{project.solution}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Project Details</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              The {project.title} was developed to address{" "}
              {(project.challenge ?? "").toLowerCase()} This project showcases
              my skills in {project.technologies.slice(0, 3).join(", ")}, and
              other technologies.
            </p>

            <p>
              During development, I focused on creating a solution that would be
              both effective and user-friendly. The approach involved{" "}
              {(project.solution ?? "").toLowerCase()}
            </p>

            <p>
              The application features a clean, intuitive interface that allows
              users to easily navigate and utilize all functionality. Key
              features include {project.features.slice(0, 3).join(", ")}, and
              more.
            </p>

            <p>
              This project demonstrates my ability to understand complex
              problems and develop effective solutions using modern technologies
              and best practices in software development.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild className="flex-1">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              <span>View Live Demo</span>
            </a>
          </Button>

          <Button variant="outline" asChild className="flex-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Github size={18} />
              <span>View Source Code</span>
            </a>
          </Button>
        </div>

        {/* related project section? */}
        {relatedProjects.length > 0 && (
          <div>
            <Separator className="mb-8" />
            <h2 className="text-2xl font-semibold mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Card
                  key={relatedProject.id}
                  className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={getProjectImages(relatedProject)[0]}
                      alt={relatedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-2">{relatedProject.category}</Badge>
                    <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                      <Link href={`/projects/${relatedProject.id}`}>
                        {relatedProject.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {relatedProject.description}
                    </p>
                    <Button variant="ghost" size="sm" asChild className="mt-2">
                      <Link href={`/projects/${relatedProject.id}`}>
                        View project
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
