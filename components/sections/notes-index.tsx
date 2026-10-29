import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Note } from "@/lib/notes";
export default function NotesIndex({ notes }: { notes: Note[] }) {
  return (
    <div className="notes-list">
      {notes.map((note, index) => (
        <Link className="note-row" href={`/blog/${note.slug}`} key={note.slug}>
          <span className="note-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <span className="eyebrow">{note.category}</span>
            <h2 className="note-title">{note.title}</h2>
          </div>
          <span className="draft-label">
            {note.status === "draft" ? "IN PREPARATION" : "PUBLISHED"}
          </span>
          <ArrowUpRight size={22} />
        </Link>
      ))}
    </div>
  );
}
