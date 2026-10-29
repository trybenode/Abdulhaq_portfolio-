import { SectionHeading } from "./section-heading";
import ProcessExplorer from "./process-explorer";
export default function Process() {
  return (
    <section id="process" className="process-section section-wrap">
      <SectionHeading
        command="trace process"
        number="05"
        label="ENGINEERING PROCESS"
        title={
          <>
            Your idea.
            <br />
            <span className="dim">A useful solution.</span>
          </>
        }
      >
        <p>
          You don’t need to speak tech. Here’s how I take a raw problem or an
          idea and turn it into something that works for you.
        </p>
      </SectionHeading>
      <ProcessExplorer />
    </section>
  );
}
