export type Evidence = {
  label: string;
  href?: string;
  kind: "screenshot" | "repository" | "demo" | "source-note";
};
export type CaseStudy = {
  role: string;
  context: string;
  architecture: string;
  securityControls: string;
  outcomes: string;
  hardeningNotes: string[];
  evidence: Evidence[];
  missing: string[];
};

// Portfolio descriptions are source material; they are not source-code verification.
export const caseStudies: Record<string, CaseStudy> = {
  "1": {
    role: "Collaborative project; individual ownership details pending.",
    context:
      "A campus marketplace connecting student buyers, sellers and service providers across web and mobile.",
    architecture:
      "The existing project record describes Next.js and React Native clients sharing Firebase/Firestore services. Architecture details await source review.",
    securityControls:
      "The project record mentions seller verification and payment workflows. Their implementation has not been verified here; no security assurance is implied.",
    outcomes:
      "Supplied screenshots show marketplace browsing, listing management and a messaging interface. User counts, payment operation and current deployment status are not established.",
    hardeningNotes: [
      "Review server-side authorization for listings, orders and conversations.",
      "Document payment verification and webhook replay protection.",
      "Test Firestore rules against cross-user access.",
    ],
    evidence: [
      { label: "Supplied product screenshots", kind: "screenshot" },
      {
        label: "Project repository",
        href: "https://github.com/trybenode/trybemarket-web",
        kind: "repository",
      },
      {
        label: "Recorded demo URL",
        href: "https://trybemarket.vercel.app/",
        kind: "demo",
      },
    ],
    missing: [
      "Individual role and delivery dates",
      "Source references for security controls",
      "Verified outcomes and current product status",
    ],
  },
  "2": {
    role: "Listed as an individual project; delivery scope and dates pending.",
    context:
      "A proposed service experience for booking and coordinating janitorial work in Nigeria.",
    architecture:
      "The project record describes React Native and Next.js interfaces with a Python/FastAPI backend, Supabase/PostgreSQL, pricing and worker matching. This is a recorded architecture description, not a verified implementation diagram.",
    securityControls:
      "Authentication and worker verification are described in the source record. Implementation evidence has not been supplied.",
    outcomes:
      "A project description is available. Screenshots, repository access, deployment status and measurable outcomes are pending.",
    hardeningNotes: [
      "Document authorization boundaries between customers, workers and operations.",
      "Review location-data retention and access.",
      "Establish payment reconciliation and retry behavior.",
    ],
    evidence: [
      { label: "Existing portfolio project record", kind: "source-note" },
    ],
    missing: [
      "Product screenshots",
      "Repository or reviewed source excerpts",
      "Implemented versus planned feature inventory",
      "Role, timeline and verified outcomes",
    ],
  },
  "3": {
    role: "Listed as an individual project; precise responsibilities pending.",
    context:
      "A campus safety platform connecting incident reporting with a security operations dashboard.",
    architecture:
      "The project record describes React/React Native clients, a Node.js service, PostgreSQL/PostGIS, and a Python incident-classification service. Supplied UI screenshots are available; backend behavior awaits source review.",
    securityControls:
      "JWT authentication and role-based access are described in existing copy. Anonymous reporting, location privacy and authorization guarantees require implementation evidence.",
    outcomes:
      "Supplied screenshots document the product interface. Response-time improvements, usage and operational deployment are not verified.",
    hardeningNotes: [
      "Validate report anonymity across logs and metadata.",
      "Review location sharing, retention and operator access.",
      "Document classifier limitations and human escalation paths.",
    ],
    evidence: [
      { label: "Supplied product screenshots", kind: "screenshot" },
      {
        label: "Project repository",
        href: "https://github.com/Abdul1013/vigalentee",
        kind: "repository",
      },
      {
        label: "Recorded dashboard URL",
        href: "https://vigalentee-web-dashboard.vercel.app/",
        kind: "demo",
      },
    ],
    missing: [
      "Role and timeline",
      "Source references for access controls",
      "Product status and verified outcomes",
    ],
  },
};
