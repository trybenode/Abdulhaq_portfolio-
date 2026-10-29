"use client";
import { useEffect } from "react";
export default function Experience() {
  useEffect(() => {
    const fine = matchMedia("(pointer: fine) and (min-width: 1024px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let destroy: (() => void) | undefined;
    let generation = 0;
    const setup = () => {
      const current = ++generation;
      destroy?.();
      destroy = undefined;
      if (
        !fine.matches ||
        reduced.matches ||
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData
      )
        return;
      import("lenis")
        .then(({ default: Lenis }) => {
          if (current !== generation) return;
          const lenis = new Lenis({
            autoRaf: true,
            anchors: true,
            duration: 0.85,
          });
          destroy = () => lenis.destroy();
        })
        .catch(() => {
          /* Native scrolling remains available. */
        });
    };
    setup();
    fine.addEventListener("change", setup);
    reduced.addEventListener("change", setup);
    return () => {
      generation++;
      destroy?.();
      fine.removeEventListener("change", setup);
      reduced.removeEventListener("change", setup);
    };
  }, []);
  return null;
}
