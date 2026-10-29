"use client";
import { Component, type ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { observeReading } from "@/lib/reading-progress";
import CorePoster from "./core-poster";
const Scene = dynamic(() => import("./core-scene"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function CoreExperience() {
  const wrapper = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const [eligible, setEligible] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const small = matchMedia("(max-width: 767px)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => {
      setMobile(small.matches);
      const canEnhance =
        !reduced.matches &&
        !connection?.saveData &&
        !(
          navigator.hardwareConcurrency > 0 &&
          navigator.hardwareConcurrency <= 2
        );
      if (!canEnhance) setReady(false);
      setEligible(canEnhance);
    };
    // Defer the enhancement until after the first content paint.
    const timer = window.setTimeout(update, 300);
    reduced.addEventListener("change", update);
    small.addEventListener("change", update);
    return () => {
      clearTimeout(timer);
      reduced.removeEventListener("change", update);
      small.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    const element = wrapper.current;
    const slot = anchor.current;
    const hero = slot?.closest<HTMLElement>("#home");
    if (!element || !slot || !hero) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let geometry = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      heroEnd: 0,
      footer: 0,
      header: 0,
    };
    let chapters: { top: number; label: string }[] = [];
    const measure = () => {
      const rect = slot.getBoundingClientRect();
      geometry = {
        x: rect.left,
        y: rect.top + scrollY,
        width: rect.width,
        height: rect.height,
        heroEnd: hero.offsetTop + hero.offsetHeight,
        footer:
          document.querySelector<HTMLElement>(".site-footer")?.offsetTop ||
          document.documentElement.scrollHeight,
        header:
          document.querySelector<HTMLElement>(".site-header")?.offsetHeight ||
          110,
      };
      chapters = [
        ...document.querySelectorAll<HTMLElement>("[data-story]"),
      ].map((section) => ({
        top: section.offsetTop,
        label: section.id.replaceAll("-", " ").toUpperCase(),
      }));
    };
    let needsMeasure = true;
    const invalidateGeometry = () => {
      needsMeasure = true;
    };
    const resize = new ResizeObserver(invalidateGeometry);
    resize.observe(slot);
    resize.observe(document.querySelector("main")!);
    const syncVisibility = () =>
      setActive(!document.hidden && element.dataset.visible !== "false");
    const unobserve = observeReading(({ y, height }) => {
      if (reduced.matches || y === 0) {
        element.removeAttribute("data-travelling");
        element.removeAttribute("style");
        element.dataset.docked = "false";
        element.dataset.visible = "true";
        scroll.current = 0;
        setActive(!reduced.matches && !document.hidden);
        return;
      }
      if (needsMeasure) {
        measure();
        needsMeasure = false;
      }
      const {
        x,
        width,
        height: slotHeight,
        heroEnd,
        footer,
        header,
      } = geometry;
      const small = innerWidth < 768;
      const size = small ? 48 : 112;
      // Let the mobile hero artifact enter naturally before it becomes fixed.
      // Native focus/scrollIntoView can then reach its activation control.
      const start = small ? Math.max(0, geometry.y - header - 80) : 0;
      if (small && y <= start) {
        element.removeAttribute("data-travelling");
        element.removeAttribute("style");
        element.dataset.docked = "false";
        element.dataset.visible = String(
          geometry.y - y < innerHeight && geometry.y + slotHeight - y > header,
        );
        scroll.current = 0;
        syncVisibility();
        return;
      }
      const travel = Math.max(
        0,
        Math.min(1, (y - start) / Math.max(1, heroEnd - header - 90 - start)),
      );
      const ease = travel * travel * (3 - 2 * travel);
      const remaining = Math.max(
        0,
        Math.min(1, (y - heroEnd) / Math.max(1, height - heroEnd)),
      );
      const railTop = header + 28;
      const railBottom = Math.max(railTop, innerHeight - size - 82);
      const dockY = Math.min(
        railTop + remaining * (railBottom - railTop),
        footer - y - size - 64,
      );
      const targetX = innerWidth - size - (small ? 8 : 16);
      const targetY = (geometry.y - y) * (1 - ease) + dockY * ease;
      element.dataset.travelling = "true";
      element.dataset.docked = String(travel > 0.98);
      element.dataset.visible = String(
        targetY + size > header && targetY < innerHeight,
      );
      element.style.left = `${x + (targetX - x) * ease}px`;
      element.style.top = `${targetY}px`;
      element.style.width = `${width + (size - width) * ease}px`;
      element.style.height = `${slotHeight + (size - slotHeight) * ease}px`;
      scroll.current = travel;
      const current = chapters
        .filter((chapter) => chapter.top <= y + innerHeight * 0.45)
        .at(-1);
      const label = element.querySelector(".core-section-label");
      if (label && label.textContent !== (current?.label || "ENGINEERING CORE"))
        label.textContent = current?.label || "ENGINEERING CORE";
      syncVisibility();
    });
    const preference = () => {
      invalidateGeometry();
      window.dispatchEvent(new Event("scroll"));
    };
    window.addEventListener("resize", invalidateGeometry);
    document.addEventListener("visibilitychange", syncVisibility);
    reduced.addEventListener("change", preference);
    return () => {
      unobserve();
      resize.disconnect();
      window.removeEventListener("resize", invalidateGeometry);
      document.removeEventListener("visibilitychange", syncVisibility);
      reduced.removeEventListener("change", preference);
    };
  }, []);
  const showScene = eligible && engaged && !failed;
  return (
    <div ref={anchor} className="core-anchor">
      <div
        ref={wrapper}
        className="core-experience"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setEngaged(true);
        }}
        data-render-mode={showScene && ready ? "webgl" : "static"}
        data-animation-state={
          showScene && ready && active && !paused ? "running" : "paused"
        }
      >
        <div className="artifact-grid" aria-hidden="true" />
        <div className="artifact-orbit orbit-one" aria-hidden="true" />
        <div className="artifact-orbit orbit-two" aria-hidden="true" />
        <div className="artifact-coordinates" aria-hidden="true">
          SYS / 001
          <br />
          ENGINEERING CORE
        </div>
        <div
          className={`poster-layer ${showScene && ready ? "poster-hidden" : ""}`}
        >
          <CorePoster />
        </div>
        {showScene && (
          <SceneBoundary onFailure={() => setFailed(true)}>
            <div
              className={`canvas-layer ${ready ? "canvas-ready" : ""}`}
              aria-hidden="true"
            >
              <Scene
                active={active && !paused}
                mobile={mobile}
                scroll={scroll}
                onReady={() => setReady(true)}
                onFailure={() => setFailed(true)}
              />
            </div>
          </SceneBoundary>
        )}
        <div className="artifact-label label-top" aria-hidden="true">
          <span>01</span> ARCHITECTURE
          <i />
        </div>
        <div className="artifact-label label-bottom" aria-hidden="true">
          <span>02</span> DEFENSE IN DEPTH
          <i />
        </div>
        <span className="core-section-label" aria-hidden="true">
          ENGINEERING CORE
        </span>
        <div className="artifact-footer">
          <span>
            <i /> PROCEDURAL ARTIFACT
          </span>
          {showScene && ready ? (
            <button
              onClick={() => setPaused(!paused)}
              aria-label={
                paused
                  ? "Resume artifact animation"
                  : "Pause artifact animation"
              }
            >
              <span className="core-control-label">
                {paused ? "RESUME ↗" : "PAUSE Ⅱ"}
              </span>
              <span className="core-control-icon" aria-hidden="true">
                {paused ? "▶" : "Ⅱ"}
              </span>
            </button>
          ) : eligible && !failed ? (
            <button
              onClick={() => setEngaged(true)}
              disabled={engaged}
              aria-label={
                engaged ? "Loading interactive core" : "Interact with core"
              }
            >
              <span className="core-control-label">
                {engaged ? "LOADING INTERACTIVE CORE" : "INTERACT WITH CORE ↗"}
              </span>
              <span className="core-control-icon" aria-hidden="true">
                ↗
              </span>
            </button>
          ) : (
            <span>STATIC VIEW</span>
          )}
        </div>
      </div>
    </div>
  );
}
