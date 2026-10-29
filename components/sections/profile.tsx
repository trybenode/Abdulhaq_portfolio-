import Image from "next/image";
import ProfileTypewriter from "@/components/motion/profile-typewriter";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { education, credentials, experience } from "@/content/profile";
import { site } from "@/config/site";
export default function Profile() {
  return (
    <section
      data-story="about"
      id="about"
      className="section-wrap profile-section"
    >
      <SectionHeading
        command="open profile"
        number="02"
        label="OPERATOR PROFILE"
        title={
          <>
            Complex problems.
            <br />
            <span className="dim">Simple, useful solutions.</span>
          </>
        }
      />
      <div className="profile-layout">
        <figure className="profile-figure" data-motion="image">
          <div className="profile-image" data-tilt>
            <Image
              src="/profile.JPG"
              alt="Abdulrasheed Olabanji Abdulhaq"
              fill
              sizes="(max-width: 767px) 75vw, 320px"
              className="portrait"
            />
          </div>
          <figcaption className="portrait-caption">
            THE PERSON BEHIND THE PROBLEM SOLVING
          </figcaption>
          <a
            className="profile-agency"
            href={site.agencyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>I RUN {site.agencyName.toUpperCase()}</span>
            <span>
              My IT agency <ArrowUpRight size={15} />
            </span>
          </a>
        </figure>
        <div
          className="profile-copy"
          data-motion="copy"
          data-motion-delay="100"
        >
          <ProfileTypewriter text="I’m Abdulhaq, a software engineer and IT geek who turns complex problems into simple, practical solutions." />
          <p>
            I start by understanding what people are trying to achieve and what
            gets in their way. From repetitive tasks to confusing workflows, I
            build useful digital tools that reduce unnecessary manual work and
            help businesses run more smoothly.
          </p>
          <p>
            I also run{" "}
            <a
              className="inline-agency-link"
              href={site.agencyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.agencyName}
            </a>
            , an IT agency helping people and businesses turn ideas, everyday
            challenges and complex processes into practical digital solutions.
          </p>
          <p>
            I’ve been troubleshooting and fixing systems since primary school.
            That hands-on curiosity still shapes how I work: understand the
            problem, simplify what is complicated, and get things working.
          </p>
          <Link className="text-link" href="/#contact">
            Have a problem or an idea? Let’s talk <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="profile-qualifications" data-motion="copy">
        <section className="education-block" aria-labelledby="education-title">
          <h3 id="education-title">EDUCATION</h3>
          <strong>{education.degree}</strong>
          <p>
            {education.institution} · {education.distinction}
          </p>
          <span>{education.period}</span>
        </section>
        <section
          className="credentials-block"
          aria-labelledby="credentials-title"
        >
          <h3 id="credentials-title">CREDENTIALS</h3>
          <ul>
            {credentials.map((credential) => (
              <li key={credential.issuer}>
                <span className="credential-issuer">{credential.issuer}</span>
                <div>
                  <strong>{credential.name}</strong>
                  <span>{credential.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <details className="profile-experience">
        <summary>
          <span>
            <span className="eyebrow">EXPERIENCE / 2024–2026</span>
            <span className="experience-summary-title">
              Hands-on experience, across the stack.
            </span>
          </span>
          <ArrowDownRight size={22} />
        </summary>
        <ol>
          {experience.map((job) => (
            <li key={job.company}>
              <div>
                <h3>{job.company}</h3>
                <span className="experience-period">{job.period}</span>
              </div>
              <div>
                <h4>{job.role}</h4>
                <p>{job.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <a className="text-link" href={site.cv} download>
          Download my current CV <ArrowUpRight size={16} />
        </a>
      </details>
    </section>
  );
}
