import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "@/lib/notes";
import NotesIndex from "@/components/sections/notes-index";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category.replace(/-/g, " ")} — Field notes`,
    alternates: { canonical: `/blog/category/${category}` },
    robots: { index: false, follow: true },
  };
}
export default async function FilterPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const term = category.replace(/-/g, " ").toLowerCase();
  const filtered = notes.filter((note) => note.category.toLowerCase() === term);
  if (!filtered.length) notFound();
  return (
    <main id="main-content" className="inner-page section-wrap">
      <Link href="/blog" className="back-link">
        ← FIELD NOTES
      </Link>
      <header className="page-heading">
        <span className="eyebrow">FIELD NOTES / category</span>
        <h1 className="capitalize">{term}</h1>
        <p>Topics in preparation and published notes, when available.</p>
      </header>
      <NotesIndex notes={filtered} />
    </main>
  );
}
