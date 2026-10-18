"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import PromptBox from "./PromptBox";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

interface FinalCTAProps {
  onPlanTripClick?: () => void;
}

export default function FinalCTA({ onPlanTripClick }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pagodaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Pagoda rises with parallax as user scrolls down
      if (pagodaRef.current) {
        gsap.fromTo(
          pagodaRef.current,
          { y: 80 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Fade & lift content
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative z-20 py-28 md:py-40 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-[var(--paper-light)] select-none border-t border-black/5"
    >
      {/* Background Chinese Pagoda rising with Parallax */}
      <div
        ref={pagodaRef}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[380px] sm:w-[480px] md:w-[560px] aspect-[6/7] opacity-25 pointer-events-none z-0"
      >
        <Image
          src="/assets/svg/pagoda.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-3xl flex flex-col items-center space-y-8"
      >
        <div className="space-y-3">
          <span className="text-[12px] font-semibold text-[var(--terracotta)] uppercase tracking-[0.1em]">
            Start Your Journey
          </span>
          <h2 className="text-[38px] sm:text-[48px] md:text-[56px] font-[500] tracking-[-0.04em] leading-[1.08] text-[var(--ink)]">
            Let&apos;s make this trip yours
          </h2>
          <p className="text-[16px] md:text-[17px] text-[var(--muted)] max-w-md mx-auto">
            Ready to swap generic recommendations for an itinerary curated to your tastes?
          </p>
        </div>

        {/* Reusing PromptBox in Flat Variant (#F5F4F1 bg) */}
        <div className="w-full flex justify-center pt-2">
          <PromptBox variant="flat" onSubmit={() => onPlanTripClick?.()} />
        </div>
      </div>
    </section>
  );
}
