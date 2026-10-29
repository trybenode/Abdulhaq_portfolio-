export const INTRO_STORAGE_KEY = "abdulhaq-it-intro:v1";

// Runs in <head>, before body parsing. It never depends on hydration or assets.
export const introBootstrap = `(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  try {
    if (sessionStorage.getItem('${INTRO_STORAGE_KEY}')) return;
    sessionStorage.setItem('${INTRO_STORAGE_KEY}', '1');
  } catch { /* Without storage the intro is limited to this document. */ }
  root.dataset.intro = 'playing';
  let active = true;
  let timer;
  let typingTimer;
  let previewObserver;
  const finish = () => {
    if (!active) return;
    active = false;
    const restoreFocus = document.activeElement?.closest('#brand-intro');
    root.dataset.intro = 'done';
    clearTimeout(timer);
    clearTimeout(typingTimer);
    previewObserver?.disconnect();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('visibilitychange', onVisibility);
    reduced.removeEventListener('change', onPreference);
    if (restoreFocus) document.querySelector('.wordmark')?.focus({preventScroll:true});
  };
  const onClick = (event) => {
    if (event.target instanceof Element && event.target.closest('#skip-brand-intro')) finish();
  };
  const onKey = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); finish(); }
    if (event.key === 'Tab') {
      const skip = document.getElementById('skip-brand-intro');
      if (skip) { event.preventDefault(); skip.focus(); }
    }
  };
  const onVisibility = () => { if (document.hidden) finish(); };
  const onPreference = () => { if (reduced.matches) finish(); };
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKey);
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', onPreference);
  // Basic local presentation only: never persisted, hashed or transmitted.
  const started = performance.now();
  // Capture before body parsing: avoid forcing layout while streamed HTML arrives.
  const viewport = innerWidth + ' × ' + innerHeight;
  const typePreview = () => {
    const target = document.getElementById('intro-device-preview');
    if (!target || !active) return;
    previewObserver?.disconnect();
    const ua = navigator.userAgent || '';
    const browser = /Edg\\//.test(ua) ? 'Edge' : /OPR\\//.test(ua) ? 'Opera' : /Firefox|FxiOS/.test(ua) ? 'Firefox' : /Chrome|CriOS/.test(ua) ? 'Chrome' : /Safari/.test(ua) ? 'Safari' : 'not reported';
    const os = /Android/.test(ua) ? 'Android' : /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Windows/.test(ua) ? 'Windows' : /Macintosh|Mac OS/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'not reported';
    const text = browser + ' / ' + os + ' / ' + viewport + '\\n' + 'You’ve been hacked.';
    const tick = () => {
      if (!active) return;
      const elapsed = performance.now() - started;
      const count = Math.max(0, Math.floor((elapsed - 350) / (1550 / text.length)));
      target.textContent = text.slice(0, count);
      if (count < text.length) typingTimer = setTimeout(tick, 24);
    };
    tick();
  };
  previewObserver = new MutationObserver(typePreview);
  previewObserver.observe(root, {childList:true, subtree:true});
  typePreview();
  timer = setTimeout(finish, 2500);
})();`;
