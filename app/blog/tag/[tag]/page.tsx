import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "@/lib/notes";
import NotesIndex from "@/components/sections/notes-index";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag.replace(/-/g, " ")} — Field notes`,
    alternates: { canonical: `/blog/tag/${tag}` },
    robots: { index: false, follow: true },
  };
}
export default async function FilterPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const term = tag.replace(/-/g, " ").toLowerCase();
  const filtered = notes.filter((note) =>
    [note.title, note.excerpt, note.category]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
  if (!filtered.length) notFound();
  return (
    <main id="main-content" className="inner-page section-wrap">
      <Link href="/blog" className="back-link">
        ← FIELD NOTES
      </Link>
      <header className="page-heading">
        <span className="eyebrow">FIELD NOTES / tag</span>
        <h1 className="capitalize">{term}</h1>
        <p>Topics in preparation and published notes, when available.</p>
      </header>
      <NotesIndex notes={filtered} />
    </main>
  );
}
