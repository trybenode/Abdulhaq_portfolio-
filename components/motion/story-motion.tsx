"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Enhance visible HTML; no content waits for this controller to run. */
export default function StoryMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const commandAnimations = new Map<HTMLElement, Animation[]>();
    let disposed = false;
    let revealObserver: IntersectionObserver | undefined;
    let frame = 0;
    let hasExplored = false;
    let surface: HTMLElement | null = null;
    let bounds: DOMRect | undefined;
    let pointer = { x: 0.5, y: 0.5 };
    let clientPointer = { x: 0, y: 0 };

    const resetSurface = () => {
      surface?.removeAttribute("data-pointer-active");
      for (const property of [
        "--pointer-x",
        "--pointer-y",
        "--tilt-x",
        "--tilt-y",
      ])
        surface?.style.removeProperty(property);
      surface = null;
      bounds = undefined;
    };

    const renderFrame = () => {
      frame = 0;
      // A scroll invalidates geometry, not the visitor's hover intent.
      if (surface && !bounds) {
        bounds = surface.getBoundingClientRect();
        if (
          !bounds.width ||
          !bounds.height ||
          clientPointer.x < bounds.left ||
          clientPointer.x > bounds.right ||
          clientPointer.y < bounds.top ||
          clientPointer.y > bounds.bottom
        ) {
          resetSurface();
        } else {
          pointer = {
            x: (clientPointer.x - bounds.left) / bounds.width,
            y: (clientPointer.y - bounds.top) / bounds.height,
          };
        }
      }
      if (!surface) return;
      surface.style.setProperty("--pointer-x", `${pointer.x * 100}%`);
      surface.style.setProperty("--pointer-y", `${pointer.y * 100}%`);
      surface.style.setProperty("--tilt-x", `${(0.5 - pointer.y) * 4}deg`);
      surface.style.setProperty("--tilt-y", `${(pointer.x - 0.5) * 5}deg`);
    };
    const scheduleFrame = () => {
      if (!frame) frame = requestAnimationFrame(renderFrame);
    };
    const onScroll = () => {
      hasExplored = true;
      bounds = undefined;
      scheduleFrame();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        reduced.matches ||
        !fine.matches ||
        connection?.saveData
      ) {
        resetSurface();
        return;
      }
      clientPointer = { x: event.clientX, y: event.clientY };
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-tilt]")
          : null;
      if (!target) {
        resetSurface();
        return;
      }
      if (surface !== target) {
        resetSurface();
        surface = target;
        bounds = target.getBoundingClientRect();
        target.setAttribute("data-pointer-active", "true");
      }
      if (!bounds?.width || !bounds.height) return;
      pointer = {
        x: Math.max(
          0,
          Math.min(1, (event.clientX - bounds.left) / bounds.width),
        ),
        y: Math.max(
          0,
          Math.min(1, (event.clientY - bounds.top) / bounds.height),
        ),
      };
      scheduleFrame();
    };
    const onPointerOut = (event: PointerEvent) => {
      if (
        surface &&
        !(
          event.relatedTarget instanceof Node &&
          surface.contains(event.relatedTarget)
        )
      )
        resetSurface();
    };

    const commandHeaders = [
      ...document.querySelectorAll<HTMLElement>("[data-command-sequence]"),
    ];
    const sectionTargets = (header: HTMLElement) => [
      ...(header.closest("section") || header).querySelectorAll<HTMLElement>(
        "[data-motion]",
      ),
    ];
    const directTarget = (header: HTMLElement) => {
      const target = document.getElementById(location.hash.slice(1));
      return !!target && !!header.closest("section")?.contains(target);
    };
    const settleCommand = (header: HTMLElement) => {
      for (const animation of commandAnimations.get(header) || []) {
        animation.cancel();
        animations.delete(animation);
      }
      commandAnimations.delete(header);
      header.dataset.commandState = "static";
      seen.add(header);
      revealObserver?.unobserve(header);
      sectionTargets(header).forEach((element) => {
        seen.add(element);
        revealObserver?.unobserve(element);
      });
    };
    const track = (
      element: HTMLElement,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      const animation = element.animate(keyframes, options);
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
      return animation;
    };
    const playCommand = (header: HTMLElement) => {
      if (!hasExplored || directTarget(header)) {
        settleCommand(header);
        return;
      }
      seen.add(header);
      revealObserver?.unobserve(header);
      header.dataset.commandState = "playing";
      const sequence: Animation[] = [];
      const line = header.querySelector<HTMLElement>(
        ".command-registration-line",
      );
      const code = header.querySelector<HTMLElement>("[data-command-text]");
      if (line)
        sequence.push(
          track(
            line,
            [
              { transform: "scaleX(0)", opacity: 0.4 },
              { transform: "scaleX(1)", opacity: 1 },
            ],
            { duration: 120, easing: "ease-out" },
          ),
        );
      if (code)
        sequence.push(
          track(
            code,
            [
              { clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0% 0 0)" },
            ],
            {
              duration: 200,
              delay: 80,
              easing: `steps(${code.textContent?.length || 1}, end)`,
              fill: "backwards",
            },
          ),
        );
      sectionTargets(header).forEach((element) => {
        seen.add(element);
        revealObserver?.unobserve(element);
        element.dataset.motionReady = "true";
        if (element.dataset.motion === "registration") return;
        const heading = element.dataset.motion === "heading";
        const delay = heading
          ? 240
          : 240 +
            Math.min(
              Math.max(Number(element.dataset.motionDelay) || 40, 0),
              40,
            );
        sequence.push(
          track(
            element,
            [
              {
                opacity: 0.45,
                transform: `translate3d(0, ${element.dataset.motion === "image" ? 18 : 12}px, 0)`,
              },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: heading ? 440 : 400,
              delay,
              easing: "cubic-bezier(.22,1,.36,1)",
              fill: "backwards",
            },
          ),
        );
      });
      commandAnimations.set(header, sequence);
      void Promise.allSettled(
        sequence.map((animation) => animation.finished),
      ).then(() => {
        if (
          !disposed &&
          header.isConnected &&
          header.dataset.commandState === "playing"
        )
          header.dataset.commandState = "complete";
        commandAnimations.delete(header);
      });
    };
    const setupReveals = () => {
      revealObserver?.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
      commandAnimations.clear();
      resetSurface();
      const enabled =
        !reduced.matches &&
        !connection?.saveData &&
        !!Element.prototype.animate;
      commandHeaders.forEach((header) => {
        if (!enabled || seen.has(header)) settleCommand(header);
      });
      document
        .querySelectorAll("[data-motion]")
        .forEach((element) => element.removeAttribute("data-motion-ready"));
      if (!enabled) return;
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || seen.has(entry.target)) continue;
            const element = entry.target as HTMLElement;
            if (element.hasAttribute("data-command-sequence")) {
              playCommand(element);
              continue;
            }
            seen.add(element);
            revealObserver?.unobserve(element);
            if (!hasExplored) continue;
            const offset = element.dataset.motion === "image" ? 34 : 22;
            track(
              element,
              [
                { opacity: 0.3, transform: `translate3d(0, ${offset}px, 0)` },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 500,
                delay: Math.min(Number(element.dataset.motionDelay) || 0, 180),
                easing: "cubic-bezier(.22,1,.36,1)",
              },
            );
            element.dataset.motionReady = "true";
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -32px 0px" },
      );
      commandHeaders.forEach((header) => {
        if (!seen.has(header)) revealObserver?.observe(header);
      });
      document
        .querySelectorAll<HTMLElement>("[data-motion]")
        .forEach((element) => {
          // Command sections are one sequence; never give their atoms competing timelines.
          if (
            element.closest("section")?.querySelector("[data-command-sequence]")
          )
            return;
          if (!seen.has(element)) revealObserver?.observe(element);
        });
    };
    const onHashChange = () =>
      commandHeaders.forEach((header) => {
        if (directTarget(header)) settleCommand(header);
      });
    setupReveals();
    const visibleChapters = new Set<HTMLElement>();
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            visibleChapters.add(entry.target as HTMLElement);
          else visibleChapters.delete(entry.target as HTMLElement);
        }
        const current = [...visibleChapters].sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        )[0];
        const chapter = current?.dataset.story;
        document
          .querySelectorAll<HTMLElement>("[data-chapter-link]")
          .forEach((link) => {
            if (link.dataset.chapterLink === chapter)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("[data-story]")
      .forEach((section) => chapterObserver?.observe(section));
    reduced.addEventListener("change", setupReveals);
    connection?.addEventListener?.("change", setupReveals);
    window.addEventListener("hashchange", onHashChange);
    fine.addEventListener("change", resetSurface);
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("blur", resetSurface);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (scrollY > 0) scheduleFrame();

    return () => {
      disposed = true;
      commandHeaders.forEach(settleCommand);
      revealObserver?.disconnect();
      chapterObserver?.disconnect();
      for (const animation of animations) animation.cancel();
      cancelAnimationFrame(frame);
      resetSurface();
      reduced.removeEventListener("change", setupReveals);
      connection?.removeEventListener?.("change", setupReveals);
      window.removeEventListener("hashchange", onHashChange);
      fine.removeEventListener("change", resetSurface);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", resetSurface);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document
        .querySelectorAll("[data-chapter-link]")
        .forEach((link) => link.removeAttribute("aria-current"));
    };
  }, [pathname]);

  return null;
}
