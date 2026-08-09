"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjectImages } from "@/lib/projects-data";

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

export default function ProjectsListing({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest" | "az" | "za">("newest");

  const filtered = useMemo(() => {
    let list = projects.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === "az")
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za")
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [projects, query, sort]);

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            className="bg-background border rounded-md px-3 py-1 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
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

        <TabsContent value="all" className="mt-6">
          <ProjectGrid projects={filtered} />
        </TabsContent>

        {(["web", "mobile", "ai", "security"] as const).map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <ProjectGrid
              projects={filtered.filter((p) => p.category === category)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground">No projects match your search.</p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const projectImages = getProjectImages(project);

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col border-0 overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={projectImages[0]}
            alt={`${project.title} — screenshot`}
            width={400}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>

        <CardHeader>
          <h2 className="text-xl font-semibold">
            <Link
              href={`/projects/${project.id}`}
              className="hover:text-primary transition-colors"
            >
              {project.title}
            </Link>
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{project.description}</p>
        </CardContent>

        <CardFooter className="flex justify-between pt-2 border-t">
          {project.github && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github size={16} />
                <span>Code</span>
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

          <Button size="sm" asChild>
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center gap-2"
            >
              <ExternalLink size={16} />
              <span>Details</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
