import type { ReactNode } from "react";

export type SectionCommand =
  `${"open" | "inspect" | "trace" | "read"} ${string}`;
type RegistrationProps = {
  number: string;
  label: string;
  command?: SectionCommand;
  status?: ReactNode;
};

export function SectionRegistration({
  number,
  label,
  command,
  status,
}: RegistrationProps) {
  return (
    <>
      <div className="section-kicker" data-motion="registration">
        <span>
          {number} / {label}
        </span>
        {status || <span aria-hidden="true">[ {number}—07 ]</span>}
        {command && (
          <span className="command-registration-line" aria-hidden="true" />
        )}
      </div>
      {command && (
        <div className="section-command" aria-hidden="true">
          <span className="command-prompt">&gt;</span>
          <code data-command-text>{command}</code>
        </div>
      )}
    </>
  );
}

export function SectionHeading({
  number,
  label,
  command,
  title,
  children,
}: RegistrationProps & { title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-heading-block" data-command-sequence={command}>
      <SectionRegistration number={number} label={label} command={command} />
      <div className="section-heading-row" data-motion="heading">
        <h2>{title}</h2>
        {children && <div className="section-intro">{children}</div>}
      </div>
    </div>
  );
}
