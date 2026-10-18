"use client";

import React, { useRef, useEffect } from "react";
import HeroLayers from "./HeroLayers";
import PromptBox from "./PromptBox";
import { gsap, ScrollTrigger, SplitText, registerGSAP } from "@/lib/gsap";

interface HeroProps {
  onPlanTripClick?: () => void;
}

export default function Hero({ onPlanTripClick }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const promptBoxWrapperRef = useRef<HTMLDivElement>(null);
  const layersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // If reduced motion, set final static values and exit
      if (prefersReducedMotion) {
        gsap.set(
          [
            titleRef.current,
            subTextRef.current,
            promptBoxWrapperRef.current,
            ".hero-parallax-layer",
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const mm = gsap.matchMedia();

      // ==========================================
      // A) INTRO TIMELINE (~2.2s, power3.out)
      // ==========================================
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial states
      const layers = gsap.utils.toArray<HTMLElement>(".hero-parallax-layer");
      gsap.set(layers, { yPercent: 24, opacity: 0 });
      gsap.set(promptBoxWrapperRef.current, { scale: 0.95, opacity: 0, y: 20 });
      gsap.set(subTextRef.current, { opacity: 0, y: 15 });
      const navEl = document.getElementById("navbar");
      if (navEl) gsap.set(navEl, { yPercent: -100, opacity: 0 });

      // Split text on H1 title
      let split: SplitText | null = null;
      try {
        split = new SplitText(titleRef.current, { type: "lines,words" });
        gsap.set(split.words, { yPercent: 110, opacity: 0 });
      } catch (err) {
        console.warn("SplitText fallback:", err);
        gsap.set(titleRef.current, { y: 30, opacity: 0 });
      }

      // 2. Illustration layers rise staggered from back to front
      introTl.to(layers, {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.075,
      });

      // 3. H1 reveals line by line / word by word
      if (split && split.words) {
        introTl.to(
          split.words,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.05,
          },
          "-=1.1"
        );
      } else {
        introTl.to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
          },
          "-=1.1"
        );
      }

      // Sub text fades up
      introTl.to(
        subTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
        },
        "-=0.6"
      );

      // Prompt box scales in + fades
      introTl.to(
        promptBoxWrapperRef.current,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.85,
        },
        "-=0.5"
      );

      // Navbar drops in
      if (navEl) {
        introTl.to(
          navEl,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.6"
        );
      }

      // 4. Spark marks pulsing loop
      gsap.to("#layer-spark-marks", {
        scale: 1.15,
        opacity: 0.55,
        transformOrigin: "center center",
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
      });

      // Sketch clouds slow endless drift (±40px, 14-20s, sine.inOut)
      gsap.to("#layer-cloud-left", {
        x: 35,
        repeat: -1,
        yoyo: true,
        duration: 16,
        ease: "sine.inOut",
      });
      gsap.to("#layer-cloud-right", {
        x: -40,
        repeat: -1,
        yoyo: true,
        duration: 18,
        ease: "sine.inOut",
      });

      // ==========================================
      // B) SCROLL PARALLAX (ScrollTrigger scrub: 1)
      // ==========================================
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTabletMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const strength = isDesktop ? 1.0 : 0.5;

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // Text content parallax & fade
          scrollTl.to(
            [titleRef.current, subTextRef.current],
            {
              y: (1 - 0.85) * 450 * strength,
              opacity: 0,
              ease: "none",
            },
            0
          );

          // Prompt box parallax
          scrollTl.to(
            promptBoxWrapperRef.current,
            {
              y: (1 - 0.95) * 350 * strength,
              opacity: 0.4,
              ease: "none",
            },
            0
          );

          // Individual SVG layer depths
          const layerDepthsConfig: Record<string, number> = {
            "#layer-cloud-left": 0.3,
            "#layer-cloud-right": 0.3,
            "#layer-hills-far": 0.5,
            "#layer-mountain-machu-picchu": 0.6,
            "#layer-trees-back": 0.7,
            "#layer-spark-marks": 0.72,
            "#layer-great-wall": 0.75,
            "#layer-taj-mahal": 0.78,
            "#layer-colosseum": 0.8,
            "#layer-chichen-itza": 0.8,
            "#layer-christ-redeemer": 0.85,
            "#layer-ground": 0.95,
            "#layer-plants-foreground-left": 1.3,
            "#layer-plants-foreground-right": 1.3,
          };

          Object.entries(layerDepthsConfig).forEach(([selector, depth]) => {
            const distance = (1 - depth) * 380 * strength;
            scrollTl.to(
              selector,
              {
                y: distance,
                ease: "none",
              },
              0
            );
          });

          // ==========================================
          // C) MOUSE PARALLAX (Desktop only)
          // ==========================================
          if (isDesktop) {
            const quickToX: Record<string, (val: number) => void> = {};
            const quickToY: Record<string, (val: number) => void> = {};

            Object.keys(layerDepthsConfig).forEach((selector) => {
              const el = document.querySelector(selector);
              if (el) {
                quickToX[selector] = gsap.quickTo(el, "x", {
                  duration: 0.8,
                  ease: "power3.out",
                });
                quickToY[selector] = gsap.quickTo(el, "y", {
                  duration: 0.8,
                  ease: "power3.out",
                });
              }
            });

            const onMouseMove = (e: MouseEvent) => {
              const normX = (e.clientX / window.innerWidth - 0.5) * 2;
              const normY = (e.clientY / window.innerHeight - 0.5) * 2;

              Object.entries(layerDepthsConfig).forEach(([selector, depth]) => {
                // Foreground moves opposite to far layers
                const factor = depth > 1.0 ? -(depth - 1.0) * 16 : (1.0 - depth) * 18;
                quickToX[selector]?.(normX * factor);
                quickToY[selector]?.(normY * (factor * 0.45));
              });
            };

            window.addEventListener("mousemove", onMouseMove, { passive: true });

            return () => {
              window.removeEventListener("mousemove", onMouseMove);
            };
          }
        }
      );
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[720px] max-h-[1080px] overflow-hidden flex flex-col items-center justify-start select-none"
    >
      {/* Centered Hero Content */}
      <div
        ref={heroContentRef}
        className="relative z-20 w-full max-w-[1440px] px-6 md:px-12 pt-[16vh] md:pt-[17vh] flex flex-col items-center text-center"
      >
        {/* H1 Heading */}
        <h1
          ref={titleRef}
          className="text-[44px] md:text-[5.2vw] lg:text-[76px] font-[500] tracking-[-0.045em] leading-[1.15] pb-2 text-[var(--ink)] max-w-4xl mx-auto"
          style={{ willChange: "transform, opacity" }}
        >
          Where will you go next?
        </h1>

        {/* Subtitle (2 Lines) */}
        <p
          ref={subTextRef}
          className="mt-4 md:mt-5 text-[15px] md:text-[16px] leading-[1.5] font-[400] text-[var(--muted)] max-w-xl mx-auto"
          style={{ willChange: "transform, opacity" }}
        >
          Tell our AI where you&apos;re going and what you love.
          <br className="hidden sm:inline" /> We&apos;ll create a personalized
          itinerary for you.
        </p>

        {/* Glass Prompt Box (Overlaps top of illustration) */}
        <div
          ref={promptBoxWrapperRef}
          className="mt-8 md:mt-10 w-full flex justify-center z-30"
          style={{ willChange: "transform, opacity" }}
        >
          <PromptBox variant="glass" onSubmit={() => onPlanTripClick?.()} />
        </div>
      </div>

      {/* 14-Layer SVG Parallax Landmark Illustration */}
      <div ref={layersContainerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <HeroLayers />
      </div>
    </section>
  );
}
