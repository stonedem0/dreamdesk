import "@testing-library/jest-dom/vitest";

// Animations finish at once, so tests don't wait out real durations. Always,
// not only when missing: happy-dom 20.14+ has its own, which runs in real time.
HTMLElement.prototype.animate = function() {
  const anim: any = { finished: Promise.resolve(), cancel: () => {}, onfinish: null };
  queueMicrotask(() => anim.onfinish?.());
  return anim;
};
