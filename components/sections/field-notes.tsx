import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { SectionHeading } from "./section-heading";
export default function FieldNotes() {
  return (
    <section id="blog" className="notes-section section-wrap">
      <SectionHeading
        command="read notes"
        number="06"
        label="FIELD NOTES"
        title={
          <>
            Thinking in <em>public.</em>
          </>
        }
      >
        <p>
          Notes on building software, understanding systems and learning
          security. The first essays are in preparation.
        </p>
      </SectionHeading>
      <div className="notes-list">
        {blogPosts.slice(0, 3).map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="note-row"
            data-motion="row"
            data-motion-delay={i * 60}
          >
            <span className="note-index">0{i + 1}</span>
            <div>
              <span className="eyebrow">{post.category}</span>
              <h3>{post.title}</h3>
            </div>
            <span className="draft-label">IN PREPARATION</span>
            <ArrowUpRight size={23} />
          </Link>
        ))}
      </div>
      <Link className="text-link" href="/blog">
        Visit field notes <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
