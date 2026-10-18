"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import DashboardMockup from "./DashboardMockup";
import Button from "./Button";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { updateScrollState } from "@/lib/scrollStore";

interface JourneyPartnerProps {
  onPlanTripClick?: () => void;
}

export default function JourneyPartner({ onPlanTripClick }: JourneyPartnerProps) {
  const containerRef = useRef<HTMLElement>(null);
  const floralTopRef = useRef<HTMLDivElement>(null);
  const floralBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Track scroll progress for 3D paper plane spline flight
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom top",
        onUpdate: (self) => {
          // Progress from 0 to 0.6 through this section
          updateScrollState({ journeyProgress: self.progress * 0.6 });
        },
      });

      if (prefersReducedMotion) return;

      // Parallax on floral frame layers (d 0.8 top, d 1.2 bottom)
      gsap.fromTo(
        floralTopRef.current,
        { y: -30 },
        {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        floralBottomRef.current,
        { y: 35 },
        {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="journey-partner"
      className="relative z-20 py-24 md:py-36 px-6 md:px-12 flex flex-col items-center select-none overflow-hidden"
    >
      {/* Centered H2 + Sub */}
      <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20 space-y-4">
        <h2 className="text-[34px] sm:text-[42px] md:text-[50px] font-[500] tracking-[-0.035em] leading-[1.1] text-[var(--ink)]">
          Your Journey Partner
        </h2>
        <p className="text-[16px] md:text-[17px] leading-[1.6] text-[var(--muted)]">
          From smarter planning to real-time pictures, Wandor keeps the important parts of your trip in one place.
        </p>
      </div>

      {/* Dashboard Mockup in Floral Frame */}
      <div className="relative w-full max-w-[960px] flex justify-center items-center my-6">
        {/* Top Floral Garland (Overlapping top edge, d 0.8) */}
        <div
          ref={floralTopRef}
          className="absolute -top-16 md:-top-20 -left-6 -right-6 h-28 md:h-36 z-20 pointer-events-none"
        >
          <Image
            src="/assets/svg/floral-top.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* The Dashboard Mockup */}
        <div className="relative z-10 w-full">
          <DashboardMockup />
        </div>

        {/* Bottom Floral Garland (Overlapping bottom edge, d 1.2) */}
        <div
          ref={floralBottomRef}
          className="absolute -bottom-16 md:-bottom-20 -left-6 -right-6 h-28 md:h-36 z-20 pointer-events-none"
        >
          <Image
            src="/assets/svg/floral-bottom.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Centered Black Pill Button */}
      <div className="mt-20 md:mt-24 z-30">
        <Button size="hero" onClick={onPlanTripClick}>
          PLAN MY TRIP
        </Button>
      </div>
    </section>
  );
}
