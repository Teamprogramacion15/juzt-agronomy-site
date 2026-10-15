/** Shared entrance trigger: start only once the visitor can watch the whole movement. */
export const ENTRANCE_ROOT_MARGIN = "-72px 0px 0px 0px";
export const ENTRANCE_THRESHOLDS = Array.from({ length: 21 }, (_, index) => index / 20);

/**
 * True when most of the element sits inside the viewport (below the fixed header),
 * or, for blocks taller than the screen, when it already fills most of it.
 */
export function isPresented(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting) return false;
  const viewport = entry.rootBounds?.height ?? window.innerHeight - 72;
  const needed = Math.min(entry.boundingClientRect.height * 0.8, viewport * 0.6);
  return entry.intersectionRect.height >= needed - 1;
}

/** Elements that start below the fold stay hidden until their entrance begins. */
export function startsBelowFold(element: Element) {
  return element.getBoundingClientRect().top >= window.innerHeight * 0.92;
}
