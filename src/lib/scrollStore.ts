// Shared state for high-frequency animations (scroll, velocity, mouse)
// This avoids React re-render overhead while letting R3F and GSAP read current values smoothly.

import type Lenis from "lenis";

export interface ScrollState {
  progress: number;       // 0 to 1 overall page scroll
  velocity: number;       // Lenis scroll velocity
  journeyProgress: number;// 0 to 1 progress through journey / airplane sections
  mouseX: number;         // Normalized -1 to 1
  mouseY: number;         // Normalized -1 to 1
  isMobile: boolean;
  reducedMotion: boolean;
  scrollY: number;
  direction: number;      // 1 = down, -1 = up
}

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
  journeyProgress: 0,
  mouseX: 0,
  mouseY: 0,
  isMobile: false,
  reducedMotion: false,
  scrollY: 0,
  direction: 0,
};

let activeLenis: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  activeLenis = lenis;
  if (typeof window !== "undefined") {
    (window as unknown as { __lenis?: Lenis | null }).__lenis = lenis;
  }
}

export function getLenisInstance(): Lenis | null {
  if (activeLenis) return activeLenis;
  if (typeof window !== "undefined") {
    return (window as unknown as { __lenis?: Lenis | null }).__lenis || null;
  }
  return null;
}

type Listener = (state: ScrollState) => void;
const listeners = new Set<Listener>();

export function updateScrollState(partial: Partial<ScrollState>) {
  Object.assign(scrollState, partial);
  listeners.forEach((listener) => listener(scrollState));
}

export function subscribeScrollState(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
