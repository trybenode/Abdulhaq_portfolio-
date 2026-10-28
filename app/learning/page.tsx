import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: "Learning log",
  description:
    "An evolving focus on software engineering and defensive security.",
  alternates: { canonical: "/learning" },
};
export default function Learning() {
  return (
    <main id="main-content" className="inner-page section-wrap">
      <header className="page-heading">
        <span className="eyebrow">RESEARCH / CONTINUOUS DEVELOPMENT</span>
        <h1>
          Stay curious.
          <br />
          <em>Keep building.</em>
        </h1>
        <p>
          My learning interests connect practical software engineering with a
          deeper understanding of security. This page records areas of focus,
          without simulated activity or completion statistics.
        </p>
      </header>
      <div className="learning-grid">
        {[
          {
            title: "Application security",
            body: "Exploring secure coding, trust boundaries, authentication and authorization in the applications I build.",
          },
          {
            title: "Systems & backend engineering",
            body: "Deepening my understanding of API design, data consistency, background processing and operational reliability.",
          },
          {
            title: "Defensive security",
            body: "Learning the fundamentals of monitoring, incident response and blue-team operations.",
          },
          {
            title: "Product engineering",
            body: "Continuing to develop web and mobile experiences with attention to performance, accessibility and useful interaction.",
          },
        ].map((item, index) => (
          <section className="learning-card" key={item.title}>
            <span className="eyebrow">FOCUS / 0{index + 1}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </section>
        ))}
      </div>
      <div className="case-links">
        <a
          className="bs-button primary"
          href={site.github}
          target="_blank"
          rel="noreferrer"
        >
          View actual GitHub activity <ArrowUpRight size={16} />
        </a>
        <Link className="text-link" href="/projects">
          Explore the work <ArrowUpRight size={16} />
        </Link>
      </div>
    </main>
  );
}
