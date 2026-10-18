"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { updateScrollState } from "@/lib/scrollStore";

export default function TravelPersonal() {
  const containerRef = useRef<HTMLElement>(null);
  const windowWrapperRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Track journey progress into this section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Progress from 0.6 to 1.0
          updateScrollState({ journeyProgress: 0.6 + self.progress * 0.4 });
        },
      });

      if (prefersReducedMotion) {
        gsap.set(textContainerRef.current, { opacity: 1, y: 0 });
        gsap.set(windowWrapperRef.current, { scale: 1, opacity: 1 });
        return;
      }

      // Pinned timeline with ScrollTrigger
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Airplane window scales from 0.6 to 1.35
      if (windowWrapperRef.current) {
        pinTl.fromTo(
          windowWrapperRef.current,
          { scale: 0.6, opacity: 0.8 },
          { scale: 1.35, opacity: 1, ease: "power1.inOut", duration: 1.2 },
          0
        );
      }

      // 2. Window inner clouds drift horizontally if present
      const cloudsEl = document.getElementById("drifting-clouds-window");
      if (cloudsEl) {
        pinTl.fromTo(
          cloudsEl,
          { x: -50 },
          { x: 50, ease: "none", duration: 1.2 },
          0
        );
      }

      // 3. Text reveals cleanly as the scale peaks
      if (textContainerRef.current) {
        pinTl.fromTo(
          textContainerRef.current,
          { opacity: 0, y: 60, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.8 },
          0.5
        );
      }
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="travel-personal"
      className="relative z-20 w-full h-screen min-h-[720px] bg-[var(--paper)] flex items-center justify-center overflow-hidden px-6 select-none"
    >
      {/* Background Airplane Window SVG */}
      <div
        ref={windowWrapperRef}
        className="relative w-[340px] sm:w-[440px] md:w-[520px] aspect-[3/4] will-change-transform z-10"
      >
        <Image
          src="/assets/svg/airplane-window.svg"
          alt="Airplane window overlooking clouds"
          fill
          className="object-contain"
        />
      </div>

      {/* Floating Personal Text Card Overlay */}
      <div
        ref={textContainerRef}
        className="absolute z-30 max-w-xl mx-auto px-6 py-8 sm:px-10 sm:py-10 rounded-[28px] glass-prompt text-center space-y-4 shadow-2xl"
      >
        <h2 className="text-[34px] sm:text-[44px] md:text-[50px] font-[500] tracking-[-0.04em] text-[var(--ink)] leading-tight">
          Travel is personal.
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.65] font-[400] text-[var(--muted)]">
          No two people experience <span className="inline-block transform hover:scale-125 transition-transform">✈️</span> a
          place the same way. Your trip should feel like yours, shaped around your
          pace, <span className="inline-block transform hover:scale-125 transition-transform">🌸</span> interests,
          little detours, and the <span className="inline-block transform hover:scale-125 transition-transform">📷</span> moments
          you&apos;ll actually remember.
        </p>
      </div>
    </section>
  );
}
