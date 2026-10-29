import type { EngineeringSummary } from "@/content/projects/engineering-summaries";
export default function DescribedArchitecture({
  summary,
}: {
  summary: EngineeringSummary;
}) {
  return (
    <figure className="architecture-diagram">
      <figcaption>
        <span className="eyebrow">DESCRIBED ARCHITECTURE</span>
        <p>
          Components recorded in the portfolio. Implementation and connections
          await source review.
        </p>
      </figcaption>
      <ol>
        {summary.layers.map((layer, index) => (
          <li key={layer.label}>
            <span className="architecture-index" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{layer.label}</h3>
            {layer.components.map((component) => (
              <span className="architecture-node" key={component}>
                {component}
              </span>
            ))}
          </li>
        ))}
      </ol>
    </figure>
  );
}
