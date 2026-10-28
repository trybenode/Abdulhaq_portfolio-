"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { observeReading, readingCode } from "@/lib/reading-progress";
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    let previous = -1;
    return observeReading(({ percent }) => {
      if (previous === percent || !ref.current) return;
      previous = percent;
      ref.current.setAttribute("aria-valuenow", String(percent));
      ref.current.style.setProperty("--page-progress", String(percent / 100));
      const code = ref.current.querySelector("code");
      if (code) code.textContent = readingCode(percent);
    });
  }, [pathname]);
  return (
    <div
      ref={ref}
      className="reading-progress"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <code aria-hidden="true">{readingCode(0)}</code>
      <span className="reading-rail" aria-hidden="true">
        <i />
      </span>
    </div>
  );
}
