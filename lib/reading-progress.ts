export type ReadingState = {
  y: number;
  percent: number;
  progress: number;
  height: number;
};
export function readingPercent(y: number, height: number) {
  return height > 0
    ? Math.round(Math.max(0, Math.min(1, y / height)) * 100)
    : 0;
}
export function readingCode(percent: number) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));
  return `read() 0b${value.toString(2).padStart(7, "0")} // ${String(value).padStart(3, "0")}%`;
}
const listeners = new Set<(state: ReadingState) => void>();
let stop: (() => void) | undefined;
let scheduleUpdate: (() => void) | undefined;
/** One RAF-batched source for the code indicator and travelling artifact. */
export function observeReading(listener: (state: ReadingState) => void) {
  listeners.add(listener);
  if (!stop) {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = Math.max(
        0,
        document.documentElement.scrollHeight - innerHeight,
      );
      const y = Math.max(0, scrollY);
      const state = {
        y,
        height,
        percent: readingPercent(y, height),
        progress: height > 0 ? Math.min(1, y / height) : 0,
      };
      listeners.forEach((callback) => callback(state));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    scheduleUpdate = schedule;
    const resize = new ResizeObserver(schedule);
    resize.observe(document.documentElement);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("pageshow", schedule);
    schedule();
    stop = () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      stop = undefined;
      scheduleUpdate = undefined;
    };
  } else scheduleUpdate?.();
  return () => {
    listeners.delete(listener);
    if (!listeners.size) stop?.();
  };
}
