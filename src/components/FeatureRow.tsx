"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

interface FeatureRowProps {
  tag: string;
  tagColor?: string;
  title: string;
  paragraph: string;
  reverse?: boolean;
  sceneSrc: string;
  mockup: React.ReactNode;
}

export default function FeatureRow({
  tag,
  tagColor = "var(--terracotta)",
  title,
  paragraph,
  reverse = false,
  sceneSrc,
  mockup,
}: FeatureRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const tileImageRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Section batch reveal: fade + yPercent 12 + slight blur(6px to 0), 700ms
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 40, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Tile scenic image inner parallax (d: 0.9)
      gsap.fromTo(
        tileImageRef.current,
        { y: -25 },
        {
          y: 25,
          ease: "none",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Floating card gentle loop (±6px)
      gsap.to(mockupRef.current, {
        y: -7,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rowRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center justify-between gap-12 lg:gap-20`}
    >
      {/* Text Block */}
      <div
        ref={textBlockRef}
        className="w-full lg:w-1/2 flex flex-col items-start space-y-4 max-w-lg"
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: tagColor }}
        >
          {tag}
        </span>
        <h3 className="text-[28px] sm:text-[34px] md:text-[40px] font-[500] tracking-[-0.03em] leading-[1.12] text-[var(--ink)]">
          {title}
        </h3>
        <p className="text-[16px] leading-[1.6] text-[var(--muted)]">
          {paragraph}
        </p>
      </div>

      {/* Scenic Tile Container with Floating Mockup Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        {/* Scenic Tile (rounded 24px) */}
        <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl border border-[var(--line)]/10">
          <div ref={tileImageRef} className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]">
            <Image
              src={sceneSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </div>
        </div>

        {/* Floating UI Mockup Card */}
        <div
          ref={mockupRef}
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] sm:w-[84%] flex justify-center"
        >
          {mockup}
        </div>
      </div>
    </div>
  );
}
