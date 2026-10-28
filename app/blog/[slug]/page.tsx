import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getNote, notes } from "@/lib/notes";
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  return note
    ? {
        title: note.title,
        description: note.excerpt,
        alternates: { canonical: `/blog/${slug}` },
        robots: { index: note.status === "published", follow: true },
      }
    : { title: "Note not found", robots: { index: false } };
}
export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  let source: string | undefined;
  if (note.status === "published" && note.file) {
    source = await readFile(
      path.join(process.cwd(), "content/notes", path.basename(note.file)),
      "utf8",
    );
  }
  return (
    <main id="main-content" className="inner-page section-wrap">
      <Link href="/blog" className="back-link">
        <ArrowLeft size={14} /> FIELD NOTES
      </Link>
      <header className="page-heading">
        <span className="eyebrow">
          {note.category.toUpperCase()} /{" "}
          {note.status === "draft" ? "DRAFT" : "FIELD NOTE"}
        </span>
        <h1>{note.title}</h1>
        <p>{note.excerpt}</p>
        {note.status === "published" && note.publishedAt && (
          <time dateTime={note.publishedAt}>{note.publishedAt}</time>
        )}
      </header>
      {source ? (
        <article className="prose-content">
          <MDXRemote source={source} />
        </article>
      ) : (
        <section className="draft-panel">
          <span className="eyebrow">IN PREPARATION</span>
          <h2>
            The idea is here.
            <br />
            The essay is still taking shape.
          </h2>
          <p>
            This topic was listed in the previous portfolio. A full, reviewed
            article has not been supplied, so the original summary is preserved
            without presenting a generated article as published work.
          </p>
          <Link href="/projects" className="text-link">
            Explore the project archive instead <ArrowUpRight size={17} />
          </Link>
        </section>
      )}
    </main>
  );
}
