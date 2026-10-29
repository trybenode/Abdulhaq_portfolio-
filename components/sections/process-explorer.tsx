"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CornerDownRight } from "lucide-react";
import { processStory } from "@/content/process-story";

export default function ProcessExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const step = processStory[active];
  const select = (index: number) => {
    setActive(index);
    tabs.current[index]?.focus();
  };
  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % processStory.length;
    else if (event.key === "ArrowLeft")
      next = (index + processStory.length - 1) % processStory.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = processStory.length - 1;
    else return;
    event.preventDefault();
    select(next);
  };
  return (
    <div className="process-explorer" data-motion="copy">
      <div className="process-story-caption">
        <span>YOUR IDEA / A PRACTICAL PATH FORWARD</span>
        <span>SELECT A STEP TO SEE HOW IT WORKS ↓</span>
      </div>
      <div
        className="process-stages"
        role="tablist"
        aria-label="From problem to solution"
      >
        {processStory.map((item, index) => (
          <button
            key={item.id}
            id={`stage-${item.id}`}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="engineering-story-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span className="stage-index">0{index + 1}</span>
            <span>{item.title}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        className="process-story"
        id="engineering-story-panel"
        role="tabpanel"
        aria-labelledby={`stage-${step.id}`}
        tabIndex={0}
      >
        <div className="process-diagram" aria-hidden="true">
          <span className="eyebrow">FROM PROBLEM TO SOLUTION</span>
          <svg viewBox="0 0 300 280" className="engineering-loop">
            <defs>
              <radialGradient id="story-core-light">
                <stop stopColor="#00f0ff" stopOpacity=".13" />
                <stop offset="1" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="150" cy="135" r="110" fill="url(#story-core-light)" />
            <circle
              cx="150"
              cy="135"
              r="91"
              fill="none"
              stroke="#29414f"
              strokeWidth="1"
            />
            <circle
              className="engineering-loop-progress"
              cx="150"
              cy="135"
              r="91"
              fill="none"
              stroke="#00d6e5"
              strokeWidth="1.5"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={
                100 - (active / (processStory.length - 1)) * 100
              }
              transform="rotate(-90 150 135)"
            />
            <path
              d="M150 88 191 112 191 159 150 183 109 159 109 112Z"
              fill="#0b1c25"
              stroke="#426472"
            />
            {processStory.map((item, index) => {
              const angle =
                (index / processStory.length) * Math.PI * 2 - Math.PI / 2;
              const x = 150 + Math.cos(angle) * 91;
              const y = 135 + Math.sin(angle) * 91;
              return (
                <g key={item.id}>
                  <path
                    d={`M150 135 L${x} ${y}`}
                    stroke={index === active ? "#00d6e5" : "#233844"}
                    strokeDasharray="3 6"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={index === active ? 8 : 4}
                    fill={index <= active ? "#00d6e5" : "#203541"}
                  />
                  {index === active && (
                    <circle
                      className="stage-node-ring"
                      key={`ring-${index}`}
                      cx={x}
                      cy={y}
                      r="13"
                      fill="none"
                      stroke="#00f0ff"
                    />
                  )}
                </g>
              );
            })}
            <text
              x="150"
              y="137"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#eaf6ff"
              fontSize="28"
              fontFamily="monospace"
            >
              0{active + 1}
            </text>
            <text
              x="150"
              y="266"
              textAnchor="middle"
              fill="#a4b3c2"
              fontSize="9"
              letterSpacing="2"
            >
              {step.title.toUpperCase()}
            </text>
          </svg>
          <span className="diagram-footnote">
            UNDERSTAND → CREATE → KEEP IMPROVING
          </span>
        </div>
        <div className="process-narrative">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={step.id}
              initial={reduced ? false : { opacity: 0.25, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: reduced ? 1 : 0 }}
              transition={{
                duration: reduced ? 0 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="eyebrow">
                0{active + 1} / {step.label}
              </span>
              <h3>{step.question}</h3>
              <p>{step.approach}</p>
              <div className="process-result">
                <CornerDownRight size={18} aria-hidden="true" />
                <p>{step.result}</p>
              </div>
              <span className="process-deliverable">
                You receive: {step.deliverable}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="process-story-footer">
        <span>A CLEAR PROBLEM. A PRACTICAL PLAN. A USEFUL SOLUTION.</span>
        <button onClick={() => select((active + 1) % processStory.length)}>
          {active === processStory.length - 1
            ? "Back to the beginning"
            : "Next step"}
          <ArrowRight size={16} />
        </button>
      </div>
      <noscript>
        <div className="process-no-script">
          {processStory.slice(1).map((item) => (
            <section key={item.id}>
              <h3>
                {item.title}: {item.question}
              </h3>
              <p>{item.approach}</p>
              <p>{item.result}</p>
            </section>
          ))}
        </div>
      </noscript>
    </div>
  );
}
