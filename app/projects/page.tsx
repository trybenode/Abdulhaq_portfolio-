import type { Metadata } from "next";
import Archive from "@/components/projects/archive";
export const metadata: Metadata = {
  title: "Mission archive",
  description: "Selected web, mobile and backend projects by Abdulhaq.",
  alternates: { canonical: "/projects" },
};
export default function Projects() {
  return (
    <main id="main-content" className="inner-page section-wrap">
      <div className="page-heading">
        <span className="eyebrow">04 / MISSION ARCHIVE</span>
        <h1>
          Built to solve
          <br />
          <em>real problems.</em>
        </h1>
        <p>
          Product interfaces, backend systems and mobile experiences. Explore
          the work and the engineering decisions behind it.
        </p>
      </div>
      <Archive />
    </main>
  );
}
