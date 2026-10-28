import { site } from "@/config/site";
export default function BrandIntro() {
  return (
    <div
      id="brand-intro"
      className="brand-intro"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-intro-title"
      aria-describedby="intro-explanation"
    >
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-identity">
        <span className="intro-eyebrow">CINEMATIC SIMULATION</span>
        <span id="brand-intro-title" className="intro-wordmark">
          {site.brand.split(".")[0].toLowerCase()}
          <span>.it</span>
        </span>
        <div className="intro-line" aria-hidden="true">
          <i />
        </div>
        <div
          id="intro-device-preview"
          className="intro-device-preview"
          aria-hidden="true"
          suppressHydrationWarning
        />
        <p id="intro-explanation" className="intro-explanation">
          Visual demo only. Your device is unchanged.
        </p>
        <span className="sr-only">
          A fictional opening displays basic browser, operating system and
          viewport hints locally, followed by “You’ve been hacked.” No device
          profile is stored or transmitted.
        </span>
      </div>
      <button id="skip-brand-intro" type="button">
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
