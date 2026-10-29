"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin } from "lucide-react";
import { SectionRegistration } from "./section-heading";
import { site } from "@/config/site";
export default function SecureChannel() {
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus("Email address copied.");
    } catch {
      setStatus(
        "Copy unavailable. Select the email address or use the email link.",
      );
    }
  }
  return (
    <section
      data-story="contact"
      id="contact"
      className="contact-section section-wrap"
    >
      <div
        className="section-heading-block"
        data-command-sequence="open contact"
      >
        <SectionRegistration
          number="07"
          label="SECURE CHANNEL"
          command="open contact"
          status={
            <span className="signal">
              <i /> OPEN TO CONVERSATION
            </span>
          }
        />
      </div>
      <div className="contact-layout" data-motion="copy">
        <div>
          <h2>
            Good systems start
            <br />
            with a <em>conversation.</em>
          </h2>
          <p>
            Hiring an engineer, shaping a product, or exploring an idea?
            <br />
            Let’s build something that matters.
          </p>
          <div className="contact-actions">
            <a className="contact-email" href={`mailto:${site.email}`}>
              Email me <ArrowUpRight />
            </a>
            <a
              className="bs-button secondary"
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="email-row">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <button
              className="icon-control"
              aria-label="Copy email address"
              onClick={copyEmail}
            >
              {status.startsWith("Email") ? (
                <Check size={17} />
              ) : (
                <Copy size={17} />
              )}
            </button>
          </div>
          <p className="copy-status" role="status">
            {status}
          </p>
        </div>
        <div className="contact-aside">
          <span className="eyebrow">FIND ME ELSEWHERE</span>
          <a href={site.github} target="_blank" rel="noreferrer">
            <Github size={19} /> GitHub <ArrowUpRight size={17} />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={19} /> LinkedIn <ArrowUpRight size={17} />
          </a>
          <a href={site.cv} download>
            Curriculum vitae <ArrowUpRight size={17} />
          </a>
          <span className="contact-location">
            BASED IN NIGERIA · BUILDING EVERYWHERE
          </span>
        </div>
      </div>
    </section>
  );
}
