"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, registerGSAP } from "@/lib/gsap";

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Word reveal scrub animation on intro paragraph
      try {
        const splitText = new SplitText(textRef.current, { type: "words" });

        gsap.fromTo(
          splitText.words,
          { opacity: 0.18, y: 4 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );

        // Heading reveal
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      } catch (err) {
        console.warn("Intro SplitText fallback:", err);
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative z-20 bg-[var(--paper)] rounded-t-[50px] md:rounded-t-[80px] shadow-[0_-20px_50px_rgba(43,33,24,0.06)] pt-24 md:pt-36 pb-20 md:pb-28 px-6 md:px-12 -mt-10"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16 border-b border-[var(--line)]/10 pb-16">
        {/* Left H2 (two lines) */}
        <h2
          ref={headingRef}
          className="text-[36px] sm:text-[44px] md:text-[54px] font-[500] leading-[1.08] tracking-[-0.035em] text-[var(--ink)] max-w-xl"
        >
          A better way to
          <br />
          plan a trip
        </h2>

        {/* Right Muted Paragraph (max 300px) */}
        <p
          ref={textRef}
          className="text-[16px] md:text-[17px] leading-[1.55] font-[400] text-[var(--muted)] max-w-[340px]"
        >
          Wandor takes what you want from your trip and turns it into a plan you can actually follow.
        </p>
      </div>
    </section>
  );
}
