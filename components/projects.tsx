"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, } from "@/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProjectImages, projectsData } from "@/lib/projects-data";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = projectsData.slice(0, 3);


  return (
    <section id="projects" className="section-container">
      <h2 className="section-heading fade-in">Featured Projects</h2>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto fade-in">
        Here are some of the exciting projects I've worked on, showcasing my
        skills in web development, mobile applications, AI integration, and
        cybersecurity.
      </p>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full fade-in"
      >
      

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const projectImages = getProjectImages(project);

              return (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col border-0 overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={projectImages[0]}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader>
                    <h3 className="text-xl font-semibold">
                      <Link
                        href={`/projects/${project.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-between pt-2 border-t">
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
            })}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center mt-12 fade-in">
        <Button variant="outline" size="lg" asChild>
          <Link href="/projects" className="flex items-center gap-2">
            <span>View All Projects</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
