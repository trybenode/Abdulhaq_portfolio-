import {
  ArrowDownRight,
  Braces,
  Database,
  Workflow,
  Smartphone,
  ShieldCheck,
  GitBranch,
  Radar,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
export type CapabilitySkillGroup = { label: string; skills: string[] };
type Capability = {
  title: string;
  tag: string;
  icon: LucideIcon;
  description: string;
  tools: string[];
  skillGroups?: CapabilitySkillGroup[];
};
const capabilities: Capability[] = [
  {
    title: "Frontend systems",
    tag: "INTERFACE → EXPERIENCE",
    icon: Braces,
    description:
      "Clear interfaces, responsive layouts and thoughtful interactions for the web.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend & APIs",
    tag: "LOGIC → RELIABILITY",
    icon: Database,
    description:
      "Data models and API boundaries that make product workflows understandable and maintainable.",
    tools: [
      "Java",
      "Spring Boot",
      "Python / FastAPI",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Firebase",
    ],
    skillGroups: [
      {
        label: "Architecture",
        skills: ["Service boundaries", "API contracts"],
      },
      {
        label: "Async & reliability",
        skills: [
          "Asynchronous jobs",
          "Queues",
          "State machines",
          "Retries",
          "Idempotency",
          "Transactional outbox",
        ],
      },
      {
        label: "Performance",
        skills: [
          "Caching",
          "Streaming",
          "Backpressure",
          "Rate limiting",
          "Concurrency",
        ],
      },
    ],
  },
  {
    title: "AI-native backends",
    tag: "DATA + TOOLS → USEFUL AI",
    icon: Workflow,
    description:
      "Backend systems that connect AI models with application data and tools to answer questions and support useful workflows.",
    tools: [
      "Spring AI",
      "LLM integration",
      "RAG",
      "Embeddings",
      "Vector search",
      "Tool calling",
    ],
    skillGroups: [
      {
        label: "Retrieval",
        skills: [
          "Document ingestion",
          "Chunking",
          "Metadata/versioning",
          "Source traceability",
          "Hybrid retrieval",
          "Query rewriting",
          "Reranking",
          "Grounded answers",
          "Citation checks",
        ],
      },
      {
        label: "Agents & tools",
        skills: [
          "Agent workflows",
          "Tool registries",
          "MCP concepts",
          "Human approval",
        ],
      },
      {
        label: "Model integration",
        skills: ["Provider abstraction", "Model fallback"],
      },
    ],
  },
  {
    title: "Mobile engineering",
    tag: "IDEA → EVERYDAY UTILITY",
    icon: Smartphone,
    description:
      "Cross-platform product experiences built around real mobile constraints.",
    tools: ["React Native", "Expo", "TypeScript"],
  },
  {
    title: "Application security",
    tag: "TRUST → BY DESIGN",
    icon: ShieldCheck,
    description:
      "A developing security practice focused on authentication, authorization and secure coding.",
    tools: ["Access control", "Input validation", "Threat modeling · learning"],
    skillGroups: [
      {
        label: "AI security",
        skills: [
          "AI threat modeling",
          "Prompt-injection defense",
          "Sensitive-data protection",
          "PII redaction",
          "Source-trust policies",
        ],
      },
      {
        label: "Tool & output safety",
        skills: [
          "Tool permissions",
          "Sandboxing",
          "Output validation",
          "Abuse testing",
        ],
      },
    ],
  },
  {
    title: "DevSecOps & infrastructure",
    tag: "BUILD → OPERATE",
    icon: GitBranch,
    description:
      "Repeatable delivery, controlled releases and observable infrastructure for software and AI-backed services.",
    tools: ["Docker", "GitHub Actions", "Cloud deployment"],
    skillGroups: [
      {
        label: "Delivery controls",
        skills: [
          "Docker Compose",
          "Deployment configuration",
          "Secrets management",
          "Migration safety",
          "Feature flags",
          "Staged releases",
          "Prompt/model rollout and rollback",
          "Kubernetes deployment concepts",
        ],
      },
      {
        label: "Observability stack",
        skills: ["Spring Boot Actuator", "Micrometer", "OpenTelemetry"],
      },
    ],
  },
  {
    title: "Security operations",
    tag: "OBSERVE → UNDERSTAND",
    icon: Radar,
    description:
      "Building knowledge of defensive security, monitoring and incident-response fundamentals.",
    tools: [
      "Blue team · learning",
      "Monitoring concepts",
      "Incident response · learning",
    ],
  },
  {
    title: "Engineering tools",
    tag: "ITERATE → IMPROVE",
    icon: Terminal,
    description:
      "Practical tools for collaborating, investigating problems and delivering software.",
    tools: ["Git / GitHub", "API tooling", "Python automation"],
    skillGroups: [
      {
        label: "Design & decisions",
        skills: ["Architecture decision records", "Data-flow diagrams"],
      },
      {
        label: "Quality & evaluation",
        skills: [
          "Golden datasets",
          "Retrieval/answer evaluation",
          "Regression testing",
          "CI quality gates",
          "Load testing",
        ],
      },
      {
        label: "Observability & operations",
        skills: [
          "Tracing",
          "Latency/token/cost monitoring",
          "Troubleshooting runbooks",
        ],
      },
    ],
  },
];
export default function Capabilities() {
  return (
    <section
      data-story="capabilities"
      id="capabilities"
      className="capability-section section-wrap"
    >
      <SectionHeading
        command="inspect capabilities"
        number="03"
        label="CAPABILITY MATRIX"
        title={
          <>
            Different disciplines.
            <br />
            <span className="dim">One engineering mindset.</span>
          </>
        }
      >
        <p>
          From the first interaction to the systems behind it. Select a
          discipline to look closer.
        </p>
      </SectionHeading>
      <div className="capability-list">
        {capabilities.map((item, i) => (
          <details
            key={item.title}
            className="capability"
            data-motion="row"
            data-motion-delay={(i % 3) * 45}
            open={i === 0}
          >
            <summary>
              <span className="capability-number">0{i + 1}</span>
              <item.icon size={23} strokeWidth={1.3} />
              <h3>{item.title}</h3>
              <span className="capability-tag">{item.tag}</span>
              <ArrowDownRight className="capability-arrow" size={22} />
            </summary>
            <div
              className={`capability-content ${item.skillGroups ? "capability-content-grouped" : ""}`}
            >
              {item.skillGroups ? (
                <>
                  <div className="capability-intro">
                    <p>{item.description}</p>
                    <div className="tech-tags capability-tools">
                      {item.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </div>
                  <div className="capability-skill-groups">
                    {item.skillGroups.map((group) => (
                      <div className="capability-skill-group" key={group.label}>
                        <h4>{group.label}</h4>
                        <div className="tech-tags">
                          {group.skills.map((skill) => (
                            <span key={skill}>{skill}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p>{item.description}</p>
                  <div className="tech-tags capability-tools">
                    {item.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
