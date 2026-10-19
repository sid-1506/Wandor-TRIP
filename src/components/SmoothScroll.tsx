"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { updateScrollState } from "@/lib/scrollStore";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP plugins on client
    registerGSAP();

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      updateScrollState({ reducedMotion: true });
      return;
    }

    // Initialize Lenis with lerp 0.08
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      updateScrollState({
        progress: e.progress ?? 0,
        velocity: e.velocity ?? 0,
      });
    });

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
