"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import MissionCard from "./mission-card";
export default function Archive() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all");
  const filtered = projectsData.filter(
    (project) =>
      (platform === "all" || project.platforms?.includes(platform)) &&
      [project.title, project.description, ...project.technologies]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="archive-controls">
        <label>
          <Search size={17} />
          <span className="sr-only">Search projects</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, technologies, ideas…"
            type="search"
          />
        </label>
        <label className="sr-only" htmlFor="platform">
          Filter by platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="all">All platforms</option>
          <option value="web">Web systems</option>
          <option value="mobile">Mobile applications</option>
        </select>
      </div>
      <p className="archive-count" role="status">
        {String(filtered.length).padStart(2, "0")} PROJECTS /{" "}
        {platform.toUpperCase()}
      </p>
      <div className="archive-grid">
        {filtered.map((project, index) => (
          <MissionCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>
      {!filtered.length && (
        <p className="empty-state">
          No projects match. Try another keyword or platform.
        </p>
      )}
    </>
  );
}
