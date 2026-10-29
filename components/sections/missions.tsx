import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import MissionCard from "@/components/projects/mission-card";
import { SectionHeading } from "./section-heading";
export default function Missions() {
  return (
    <section
      data-story="projects"
      id="projects"
      className="missions-section section-wrap"
    >
      <SectionHeading
        command="inspect projects"
        number="04"
        label="MISSION ARCHIVE"
        title={
          <>
            Ideas made <em>operational.</em>
          </>
        }
      >
        <p>
          A selection of products across marketplaces, services and campus
          safety.
        </p>
      </SectionHeading>
      <div className="featured-missions">
        {projectsData.slice(0, 3).map((project, index) => (
          <MissionCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <Link href="/projects" className="archive-link">
        <span>THERE’S MORE IN THE ARCHIVE</span>Explore all projects{" "}
        <ArrowUpRight size={24} />
      </Link>
    </section>
  );
}
