import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
const chapters = [
  { id: "about", label: "Meet the builder", detail: "THE MINDSET" },
  {
    id: "capabilities",
    label: "Explore the disciplines",
    detail: "THE TOOLKIT",
  },
  { id: "projects", label: "Inspect the work", detail: "THE EVIDENCE" },
  { id: "contact", label: "Start a conversation", detail: "WHAT’S NEXT" },
];
export default function Journey() {
  return (
    <nav
      className="journey-strip section-wrap"
      aria-label="Explore the engineering story"
    >
      {chapters.map((chapter, index) => (
        <Link
          key={chapter.id}
          href={`#${chapter.id}`}
          data-chapter-link={chapter.id}
        >
          <span className="journey-number">0{index + 1}</span>
          <span>
            <small>{chapter.detail}</small>
            <strong>{chapter.label}</strong>
          </span>
          <ArrowDownRight size={17} aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}
