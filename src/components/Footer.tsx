"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { footerLinks, footerLandmarks } from "@/lib/content";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !collageRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Parallax rise for each individual sticker landmark in the footer collage
      const items = gsap.utils.toArray<HTMLElement>(".footer-sticker-item");

      items.forEach((item) => {
        const depth = parseFloat(item.getAttribute("data-depth") || "1.0");
        const lift = (depth - 0.75) * 55;

        gsap.fromTo(
          item,
          { y: lift + 40, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      });
    }, footerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative z-20 bg-[var(--paper-dark)] pt-20 pb-0 text-[var(--ink)] overflow-hidden border-t border-black/10 select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16">
          {/* Brand Info (Cols 1 & 2) */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="font-[family-name:var(--font-courier-prime)] text-[30px] font-bold text-[var(--ink)] tracking-tight lowercase inline-block"
            >
              wandor
            </Link>
            <p className="text-[15px] text-[var(--muted)] max-w-sm leading-relaxed">
              Your next trip, planned around you.
            </p>
            <p className="text-[13px] text-[var(--muted)]/80 max-w-xs">
              AI itinerary intelligence built for curious travelers who value moments over checklists.
            </p>
          </div>

          {/* Links Columns (Cols 3, 4, 5) */}
          {Object.entries(footerLinks).map(([sectionTitle, links]) => (
            <div key={sectionTitle} className="space-y-4">
              <h5 className="text-[12px] font-semibold text-[var(--ink)] uppercase tracking-[0.08em]">
                {sectionTitle}
              </h5>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="pt-8 pb-12 border-t border-[var(--line)]/10 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[var(--muted)] gap-4">
          <div>wandor &copy; 2026. All rights reserved.</div>
          <div className="font-medium tracking-wide">Made for travelers</div>
        </div>
      </div>

      {/* Full-Width Sticker-Style Landmark Collage at Bottom */}
      <div
        ref={collageRef}
        className="relative w-full overflow-hidden pt-6 pb-0 flex items-end justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full max-w-[1500px] flex items-end justify-around px-2 translate-y-3 sm:translate-y-4">
          {footerLandmarks.map((lm) => (
            <div
              key={lm.id}
              data-depth={lm.depth}
              className="footer-sticker-item relative shrink-0 transition-transform hover:scale-105 pointer-events-auto"
              style={{
                width: "clamp(68px, 9.5vw, 130px)",
                aspectRatio: "1/1.25",
                marginBottom: `${lm.offset}px`,
              }}
            >
              <Image
                src={`/assets/svg/${lm.id}.svg`}
                alt={lm.name}
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
