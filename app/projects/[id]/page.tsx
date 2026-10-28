import DescribedArchitecture from "@/components/projects/described-architecture";
import { engineeringSummaries } from "@/content/projects/engineering-summaries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projectsData, getProjectImages } from "@/lib/projects-data";
import { caseStudies } from "@/content/projects/case-studies";
import EvidenceGallery from "@/components/projects/evidence-gallery";
import { site } from "@/config/site";
export function generateStaticParams() {
  return projectsData.map((project) => ({ id: String(project.id) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => String(p.id) === id);
  return project
    ? {
        title: project.title,
        description: project.description,
        alternates: { canonical: `/projects/${id}` },
        openGraph: {
          title: project.title,
          description: project.description,
          url: `${site.url}/projects/${id}`,
          images: ["/opengraph-image"],
        },
      }
    : { title: "Project not found", robots: { index: false } };
}
const sections = [
  ["briefing", "Mission briefing"],
  ["problem", "Problem / threat model"],
  ["architecture", "Architecture"],
  ["execution", "Engineering execution"],
  ["security", "Security controls"],
  ["outcomes", "Outcomes"],
  ["hardening", "Hardening notes"],
  ["evidence", "Evidence"],
];
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData.find((p) => String(p.id) === id);
  if (!project) notFound();
  const study = caseStudies[id];
  const images = getProjectImages(project).filter(
    (image) => !image.includes("placeholder"),
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${site.url}/projects/${id}`,
  };
  return (
    <main id="main-content" className="inner-page section-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <Link className="back-link" href="/projects">
        <ArrowLeft size={14} /> ALL MISSIONS
      </Link>
      <header className="page-heading">
        <span className="eyebrow">MISSION / {id.padStart(3, "0")}</span>
        <h1>
          {project.title}
          <em>.</em>
        </h1>
        <p>{project.description}</p>
        <div className="case-meta">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="case-links">
          {project.github && (
            <a
              className="bs-button"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              Repository <ArrowUpRight size={16} />
            </a>
          )}
          {project.live && (
            <a
              className="bs-button"
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              Recorded demo URL <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </header>
      {images.length ? (
        <EvidenceGallery images={images} title={project.title} />
      ) : (
        <div className="draft-panel">
          <span className="eyebrow">EVIDENCE PENDING</span>
          <h2>Product imagery is being prepared.</h2>
          <p>
            This case study preserves the recorded project concept. Screenshots
            and implementation evidence have not been supplied.
          </p>
        </div>
      )}
      <div className="case-body">
        <nav aria-label="Case study sections" className="case-toc">
          {sections.map(([anchor, title]) => (
            <a key={anchor} href={`#${anchor}`}>
              {title}
            </a>
          ))}
        </nav>
        <div>
          <div className="evidence-notice">
            Evidence note: screenshots support the visible interface.
            Architecture, features and controls below are descriptions from the
            existing project record unless otherwise stated. Linked repositories
            and demos have not been verified for current availability.
          </div>
          <section className="case-section" id="briefing">
            <h2>Mission briefing</h2>
            <p>{study?.context || project.description}</p>
            <p>
              <strong>Role:</strong>{" "}
              {study?.role ||
                (project.collaborated
                  ? "Collaborative project. Individual responsibilities and timeline pending."
                  : "Recorded as an individual project. Responsibilities and timeline pending.")}
            </p>
          </section>
          <section className="case-section" id="problem">
            <h2>Problem / threat model</h2>
            <p>{project.challenge || "Detailed problem statement pending."}</p>
            <p>
              Threat-model review is pending. Relevant questions include who can
              access each resource, which data needs protection, and how the
              system behaves when requests fail or are repeated. These are
              review questions, not findings from an audit.
            </p>
          </section>
          <section className="case-section" id="architecture">
            <h2>Architecture</h2>
            <p>
              {study?.architecture ||
                project.solution ||
                "Architecture details pending source review."}
            </p>
          </section>
          {engineeringSummaries[id] && (
            <DescribedArchitecture summary={engineeringSummaries[id]} />
          )}
          <section className="case-section" id="execution">
            <h2>Engineering execution</h2>
            <p>{project.solution || "Implementation details pending."}</p>
            <h3 className="eyebrow">
              FEATURES DESCRIBED IN THE PROJECT RECORD
            </h3>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          <section className="case-section" id="security">
            <h2>Security controls</h2>
            <p>
              {study?.securityControls ||
                "The portfolio source does not provide sufficient implementation evidence to substantiate security controls. Details pending source review."}
            </p>
          </section>
          <section className="case-section" id="outcomes">
            <h2>Outcomes</h2>
            <p>
              {study?.outcomes ||
                "The project record and available assets are preserved here. Current product status and measurable outcomes have not been verified."}
            </p>
          </section>
          <section className="case-section" id="hardening">
            <h2>Hardening notes</h2>
            <p>Proposed review areas for a future iteration:</p>
            <ul>
              {(
                study?.hardeningNotes || [
                  "Document authorization and data-validation boundaries.",
                  "Establish failure/retry behavior and observability.",
                  "Review accessibility and deployment configuration.",
                ]
              ).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <section className="case-section" id="evidence">
            <h2>Evidence</h2>
            <div className="case-evidence">
              {study?.evidence.map((evidence, i) =>
                evidence.href ? (
                  <a
                    key={i}
                    href={evidence.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {evidence.label}
                    <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <span key={i}>{evidence.label}</span>
                ),
              )}
              {!study && (
                <span>
                  {images.length
                    ? `${images.length} supplied product images`
                    : "No product screenshots supplied."}
                </span>
              )}
            </div>
          </section>
          <aside className="case-missing">
            <h3>Details still to document</h3>
            <ul>
              {(
                study?.missing || [
                  "Individual role and delivery dates",
                  "Implementation evidence",
                  "Verified outcomes and product status",
                ]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
          <div className="case-links">
            <Link className="bs-button primary" href="/#contact">
              Discuss a similar project <ArrowUpRight size={16} />
            </Link>
            <Link className="text-link" href="/projects">
              Back to the archive <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
