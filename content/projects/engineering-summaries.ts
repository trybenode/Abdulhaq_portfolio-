export type EngineeringSummary = {
  problem: string;
  approach: string;
  evidence: string;
  layers: { label: string; components: string[] }[];
};
/** Derived only from the existing project records; not a source-code audit. */
export const engineeringSummaries: Record<string, EngineeringSummary> = {
  "1": {
    problem:
      "Help students find goods and services within their campus community.",
    approach:
      "The record describes web and mobile interfaces sharing Firebase services for marketplace workflows.",
    evidence:
      "Screenshots show browsing, listing management and messaging. Backend behavior and outcomes await review.",
    layers: [
      {
        label: "Interfaces",
        components: ["Next.js web", "React Native mobile"],
      },
      { label: "Shared services", components: ["Firebase"] },
      { label: "Data", components: ["Firestore"] },
    ],
  },
  "2": {
    problem:
      "Make finding, booking and coordinating janitorial services easier.",
    approach:
      "The proposed system brings customer bookings, pricing and worker matching into one service experience.",
    evidence:
      "Portfolio description only. Product screenshots, source evidence and delivery status are pending.",
    layers: [
      {
        label: "Proposed interfaces",
        components: ["Next.js web", "React Native mobile"],
      },
      {
        label: "Proposed services",
        components: ["Python / FastAPI", "Pricing & worker matching"],
      },
      { label: "Proposed data", components: ["Supabase / PostgreSQL"] },
    ],
  },
  "3": {
    problem:
      "Connect campus incident reporting with a clearer view for security operators.",
    approach:
      "The record describes reporting interfaces, an operations dashboard and services for location-aware incident handling.",
    evidence:
      "Supplied interface screenshots. Access controls, classification behavior and response improvements remain unverified.",
    layers: [
      {
        label: "Interfaces",
        components: ["React dashboard", "React Native mobile"],
      },
      {
        label: "Services",
        components: ["Node.js", "Python incident classification"],
      },
      { label: "Data", components: ["PostgreSQL / PostGIS"] },
    ],
  },
};
