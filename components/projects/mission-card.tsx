import Link from "next/link";
import { engineeringSummaries } from "@/content/projects/engineering-summaries";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getProjectImages, type ProjectRecord } from "@/lib/projects-data";
export default function MissionCard({
  project,
  index = 0,
}: {
  project: ProjectRecord;
  index?: number;
}) {
  const summary = engineeringSummaries[String(project.id)];
  const image = getProjectImages(project)[0];
  const missing = image.includes("placeholder");
  return (
    <article
      className={`mission-card mission-${index % 3}`}
      data-motion="image"
      data-motion-delay={(index % 2) * 90}
    >
      <Link
        className={`mission-visual ${missing ? "mission-visual-pending" : ""}`}
        href={`/projects/${project.id}`}
        data-tilt
      >
        {missing ? (
          <div className="mission-blueprint">
            <span className="eyebrow">CONCEPT / SERVICE ARCHITECTURE</span>
            <div className="blueprint-flow">
              <span>CUSTOMER</span>
              <i>↔</i>
              <strong>{project.title.toUpperCase()}</strong>
              <i>↔</i>
              <span>OPERATIONS</span>
            </div>
            <span className="eyebrow">PRODUCT IMAGERY PENDING</span>
          </div>
        ) : (
          <Image
            src={image}
            alt={`${project.title} — supplied product interface`}
            fill
            sizes={
              index === 0
                ? "(max-width: 767px) 100vw, 1200px"
                : "(max-width: 767px) 100vw, 650px"
            }
          />
        )}
        <span className="mission-invitation" aria-hidden="true">
          Explore the engineering <ArrowUpRight size={16} />
        </span>
        <span className="mission-corner" aria-hidden="true">
          ↗
        </span>
        <span className="mission-id">
          MISSION / {String(project.id).padStart(3, "0")}
        </span>
      </Link>
      <div className="mission-info">
        <div>
          <span className="eyebrow">
            {project.platforms?.join(" + ").toUpperCase() || "SOFTWARE PROJECT"}
          </span>
          <h3>
            <Link href={`/projects/${project.id}`}>
              {project.title}
              <ArrowUpRight size={26} />
            </Link>
          </h3>
          <p>{project.description}</p>
          {summary && (
            <dl className="engineering-summary">
              <div>
                <dt>Problem</dt>
                <dd>{summary.problem}</dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>{summary.approach}</dd>
              </div>
              <div>
                <dt>Evidence</dt>
                <dd>{summary.evidence}</dd>
              </div>
            </dl>
          )}
        </div>
        <div className="mission-tech">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
