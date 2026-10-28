import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main-content" className="inner-page section-wrap">
      <div className="page-heading">
        <span className="eyebrow">404 / SIGNAL NOT FOUND</span>
        <h1>
          Outside the
          <br />
          <em>known system.</em>
        </h1>
        <p>
          This page could not be found. Return to the command interface or
          explore the mission archive.
        </p>
        <div className="case-links">
          <Link href="/" className="bs-button primary">
            Return home <ArrowUpRight size={16} />
          </Link>
          <Link href="/projects" className="text-link">
            Explore projects <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
