"use client";
import { useEffect, useRef } from "react";
export default function ProfileTypewriter({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const element = ref.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (
      !element ||
      reduced.matches ||
      connection?.saveData ||
      location.hash === "#about" ||
      scrollY > 0
    )
      return;
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      element.dataset.typing = "done";
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (
          reduced.matches ||
          connection?.saveData ||
          location.hash === "#about"
        )
          return;
        const visual = element.querySelector<HTMLElement>(".profile-typed");
        if (!visual) return;
        element.dataset.typing = "playing";
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 2100);
          visual.textContent = text.slice(0, Math.ceil(text.length * progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else finish();
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    reduced.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", finish);
      finish();
    };
  }, [text]);
  return (
    <p className="profile-lead profile-typewriter" ref={ref}>
      <span className="profile-full">{text}</span>
      <span className="profile-typed" aria-hidden="true" />
    </p>
  );
}
