import Link from "next/link";
import { ArrowDown, ArrowUpRight, CornerDownRight } from "lucide-react";
import { site } from "@/config/site";
import CoreExperience from "@/components/three/core-experience";
export default function Hero() {
  return (
    <section id="home" className="hero section-wrap">
      <div className="hero-topline">
        <span className="eyebrow">
          <i className="tiny-cross" /> SOFTWARE ENGINEER & IT GEEK /
          SECURITY-MINDED BUILDER
        </span>
        <span className="hero-edition">PORTFOLIO — VOL. 026</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-name">
            <span className="short-rule" /> ABDULRASHEED O. ABDULHAQ
          </div>
          <h1>
            Engineering
            <br />
            systems.
            <br />
            <span>Securing</span>
            <br />
            <span className="future-line">
              the future<span className="cyan-period">.</span>
            </span>
          </h1>
          <p className="hero-description">
            Turning complex problems into simple,
            <br className="desktop-break" /> practical digital solutions.
          </p>
          <p className="hero-promise">
            Don’t ask me what I do. Tell me what you want, and I’ll provide the
            solution.
          </p>
          <div className="hero-actions">
            <a
              href={`mailto:${site.email}?subject=Software%20engineering%20opportunity`}
              className="bs-button primary"
            >
              Let’s build together <ArrowUpRight size={18} />
            </a>
            <Link href="#projects" className="text-link">
              Explore my work <ArrowDown size={17} />
            </Link>
          </div>
        </div>
        <CoreExperience />
      </div>
      <div className="hero-bottom">
        <div>
          <CornerDownRight size={17} />
          <span>
            BUILT WITH INTENT.
            <br />
            <b>DESIGNED TO ENDURE.</b>
          </span>
        </div>
        <span className="artifact-caption">
          FIG. 001 — THE ENGINEERING CORE
          <br />
          <span>AN INTERACTIVE STUDY IN SYSTEMS</span>
        </span>
        <Link href="#about" className="scroll-cue">
          SCROLL TO EXPLORE <ArrowDown size={16} />
        </Link>
      </div>
    </section>
  );
}
