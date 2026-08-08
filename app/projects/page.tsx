import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjectImages, projectsData } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Abdulrasheed Olabanji's portfolio of AI, fintech, cybersecurity, and full-stack product projects built with modern technologies.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="w-full lg:container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className=" w-full lg:max-w-full mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Projects Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore my projects showcasing skills in web development, mobile
            applications, AI integration, and cybersecurity solutions.
          </p>
        </div>

        <ProjectsListing />
      </div>
    </main>
  );
}

function ProjectsListing() {
  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="bg-background border rounded-md px-3 py-1 text-sm">
            <option>Newest</option>
            <option>Oldest</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="web">Web Apps</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
          <TabsTrigger value="ai">AI Projects</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-12">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>

        {["web", "mobile", "ai", "security"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-12">
            {projectsData
              .filter((project) => project.category === category)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

type Project = {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  images?: string[] | Record<string, string>;
  category?: string;
  features: string[];
  tags: string[];
  technologies: string[];
  github?: string;
  live?: string;
};

function ProjectCard({ project }: { project: Project }) {
  const projectImages = getProjectImages(project);

  return (
    <Card className="w-full rounded-none overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col">
              {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-6"> */}
        <div className="flex w-full relative h-64 ">
          <Image
            src={projectImages[0]}
            alt={project.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="lg:col-span-3 flex flex-col p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Section: Key Features */}
            <div className="space-y-4 flex-grow">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {project?.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Right Section: Technologies, Tags, Links */}
            <CardFooter className="p-4 border-t lg:border-t-0 lg:border-l flex flex-col justify-center">
              {/* Tags */}
              {project?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Technologies */}
              {project?.technologies?.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-lg font-medium mb-2">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4 border-t pt-4">
                {project?.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View GitHub Code"
                      className="flex items-center gap-2"
                    >
                      <Github size={16} />
                      <span>View Code</span>
                    </a>
                  </Button>
                )}
                {project?.live && (
                  <Button size="sm" asChild>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Demo"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  );
}
