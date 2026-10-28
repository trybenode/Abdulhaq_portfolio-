import type { Metadata } from "next";
import NotesIndex from "@/components/sections/notes-index";
import { notes } from "@/lib/notes";
export const metadata: Metadata = {
  title: "Field notes",
  description:
    "Writing in preparation on software systems, product engineering and application security.",
  alternates: { canonical: "/blog" },
};
export default function Blog() {
  return (
    <main id="main-content" className="inner-page section-wrap">
      <header className="page-heading">
        <span className="eyebrow">06 / FIELD NOTES</span>
        <h1>
          Work in progress.
          <br />
          <em>Thinking included.</em>
        </h1>
        <p>
          A space for technical breakdowns, lessons from building and questions
          worth exploring. Existing article topics are preserved here as drafts
          while their full essays are prepared.
        </p>
      </header>
      <NotesIndex notes={notes} />
    </main>
  );
}
