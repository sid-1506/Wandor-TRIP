"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { getLenisInstance, subscribeScrollState } from "@/lib/scrollStore";

interface NavbarProps {
  onPlanTripClick?: () => void;
}

const NAV_ITEMS = [
  { label: "Discover", href: "#features", targetId: "features" },
  { label: "Pricing", href: "#journey-partner", targetId: "journey-partner" },
  { label: "FAQs", href: "#travel-personal", targetId: "travel-personal" },
];

export default function Navbar({ onPlanTripClick }: NavbarProps) {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(-1); // -1 = hero
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Structural Refs
  const shellRef = useRef<HTMLElement>(null);
  const glowDivRef = useRef<HTMLDivElement>(null);
  const shellInnerWrapperRef = useRef<HTMLDivElement>(null);
  const innerNavRef = useRef<HTMLElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);

  // Parallax Zone Refs
  const logoZoneRef = useRef<HTMLDivElement>(null);
  const centerGroupRef = useRef<HTMLDivElement>(null);
  const ctaZoneRef = useRef<HTMLDivElement>(null);

  // Center links & Sliding Pill Refs
  const linksPillContainerRef = useRef<HTMLDivElement>(null);
  const slidingPillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // CTA & Interactive Refs
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  // Scroll & State tracking
  const isHiddenRef = useRef(false);
  const activeIndexRef = useRef(-1);
  const isHoveringLinksRef = useRef(false);

  // QuickTo helpers for pointer parallax
  const quickSpecularX = useRef<((val: number) => void) | null>(null);
  const quickSpecularY = useRef<((val: number) => void) | null>(null);
  const quickTiltX = useRef<((val: number) => void) | null>(null);
  const quickTiltY = useRef<((val: number) => void) | null>(null);

  // Dispatch open modal event
  const handleOpenPlanClick = useCallback(() => {
    if (onPlanTripClick) {
      onPlanTripClick();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wandor:open-plan-trip"));
    }
  }, [onPlanTripClick]);

  // Position the sliding pressed pill behind a target link
  const movePillToIndex = useCallback((index: number, opacity: number = 1) => {
    const targetLink = linkRefs.current[index];
    const pill = slidingPillRef.current;
    if (!targetLink || !pill) return;

    gsap.to(pill, {
      x: targetLink.offsetLeft,
      width: targetLink.offsetWidth,
      opacity: opacity,
      duration: 0.45,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, []);

  // Update sliding pill when active section changes (unless user is actively hovering over links)
  useEffect(() => {
    activeIndexRef.current = activeSectionIndex;
    if (isHoveringLinksRef.current) return;

    if (activeSectionIndex >= 0) {
      movePillToIndex(activeSectionIndex, 1);
    } else {
      // In hero section: pill rests on first link at 40% opacity
      movePillToIndex(0, 0.4);
    }
  }, [activeSectionIndex, movePillToIndex]);

  // Initial layout and sliding pill placement
  useEffect(() => {
    registerGSAP();

    const timer = setTimeout(() => {
      if (activeSectionIndex >= 0) {
        movePillToIndex(activeSectionIndex, 1);
      } else {
        movePillToIndex(0, 0.4);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [movePillToIndex, activeSectionIndex]);

  // =========================================================================
  // 1. SCROLL PARALLAX + MOTION (ONE ScrollTrigger scrub timeline 0 to 240px)
  // =========================================================================
  useEffect(() => {
    registerGSAP();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // A) INTRO ANIMATION ON MOUNT
      const introTl = gsap.timeline({ delay: 0.25 });

      gsap.set(shellRef.current, { yPercent: -120, opacity: 0 });
      gsap.set(
        [logoZoneRef.current, centerGroupRef.current, ctaZoneRef.current],
        { opacity: 0, y: 12 }
      );
      gsap.set(glowDivRef.current, { opacity: 0.4 });

      introTl.to(shellRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
      });

      introTl.to(
        [logoZoneRef.current, centerGroupRef.current, ctaZoneRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.45"
      );

      // Glow pulse once (opacity 0.4 to 1 to 0.7)
      introTl.to(
        glowDivRef.current,
        {
          opacity: 1,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.to(glowDivRef.current, { opacity: 0.7, duration: 0.3 });
          },
        },
        "-=0.2"
      );

      // B) MASTER SCRUB TIMELINE (0 to 240px)
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=240",
          scrub: 0.6,
          onUpdate: (self) => {
            setIsScrolled(self.progress > 0.1);
          },
        },
      });

      // 1. Shell dimensions tightening: width min(1240px) to min(1000px), top 14px to 10px
      scrubTl.to(
        shellRef.current,
        {
          width: isMobile
            ? "calc(100vw - 24px)"
            : "min(1000px, calc(100vw - 32px))",
          top: 10,
          ease: "none",
        },
        0
      );

      // 2. Inner surface height: 68px to 58px (or 54px on mobile)
      scrubTl.to(
        innerNavRef.current,
        {
          height: isMobile ? 54 : 58,
          ease: "none",
        },
        0
      );

      // 3. Shell background opacity: 0.88 to 0.96 & glow strengthening
      scrubTl.to(
        shellInnerWrapperRef.current,
        {
          backgroundColor: "rgba(239, 230, 210, 0.96)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.7) inset, 0 14px 38px rgba(185,100,58,0.38), 0 0 70px rgba(217,168,119,0.48)",
          ease: "none",
        },
        0
      );

      // 4. Glow div 0.6x scroll speed lag & alpha
      scrubTl.to(
        glowDivRef.current,
        {
          yPercent: -20,
          opacity: 0.95,
          ease: "none",
        },
        0
      );

      // 5. Layer Parallax inside the bar
      scrubTl.to(
        logoZoneRef.current,
        {
          y: -2,
          x: 6,
          scale: 0.85, // 26px to 22px
          ease: "none",
        },
        0
      );

      scrubTl.to(
        centerGroupRef.current,
        {
          y: 1,
          scale: 0.97,
          ease: "none",
        },
        0
      );

      scrubTl.to(
        ctaZoneRef.current,
        {
          y: -2,
          x: -6,
          ease: "none",
        },
        0
      );

      // C) ACTIVE SECTION SCROLLTRIGGERS
      // Hero Trigger
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom 40%",
        onEnter: () => setActiveSectionIndex(-1),
        onEnterBack: () => setActiveSectionIndex(-1),
      });

      // Section triggers for Discover, Pricing, FAQs
      NAV_ITEMS.forEach((item, index) => {
        const el = document.getElementById(item.targetId);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveSectionIndex(index),
          onEnterBack: () => setActiveSectionIndex(index),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // =========================================================================
  // 2. DIRECTION BEHAVIOR (Hide on scroll down past 400px, show on scroll up)
  // =========================================================================
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let lastY = 0;

    const handleScrollUpdate = (scrollY: number, direction: number) => {
      if (mobileMenuOpen || !shellRef.current) return;

      // Always visible within 400px of top
      if (scrollY <= 400) {
        if (isHiddenRef.current) {
          isHiddenRef.current = false;
          gsap.to(shellRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.45,
            ease: "expo.out",
            overwrite: "auto",
          });
        }
        return;
      }

      // Scrolling down past 400px: slide up and fade out
      if (direction > 0 && !isHiddenRef.current) {
        isHiddenRef.current = true;
        gsap.to(shellRef.current, {
          yPercent: -140,
          opacity: 0,
          duration: 0.45,
          ease: "power3.in",
          overwrite: "auto",
        });
      } else if (direction < 0 && isHiddenRef.current) {
        // Scrolling up: slide back in with a tiny overshoot
        isHiddenRef.current = false;
        gsap.to(shellRef.current, {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
      }
    };

    // Subscribe to Lenis scroll store
    const unsubscribe = subscribeScrollState((state) => {
      handleScrollUpdate(state.scrollY, state.direction);
    });

    // Native scroll fallback
    const onNativeScroll = () => {
      const currentY = window.scrollY;
      const dir = currentY > lastY ? 1 : -1;
      lastY = currentY;
      handleScrollUpdate(currentY, dir);
    };

    window.addEventListener("scroll", onNativeScroll, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener("onscroll", onNativeScroll);
    };
  }, [mobileMenuOpen]);

  // =========================================================================
  // 3. POINTER PARALLAX & TILT (Desktop hover devices only)
  // =========================================================================
  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none)").matches || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    if (specularRef.current) {
      quickSpecularX.current = gsap.quickTo(specularRef.current, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      quickSpecularY.current = gsap.quickTo(specularRef.current, "y", {
        duration: 0.4,
        ease: "power3.out",
      });
    }

    if (shellRef.current) {
      quickTiltX.current = gsap.quickTo(shellRef.current, "rotationX", {
        duration: 0.5,
        ease: "power2.out",
      });
      quickTiltY.current = gsap.quickTo(shellRef.current, "rotationY", {
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  const handleShellMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const isTouch = window.innerWidth < 768;
    if (isTouch || !shellRef.current) return;

    const rect = shellRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Specular light follow
    quickSpecularX.current?.(x);
    quickSpecularY.current?.(y);

    // 3D Tilt: rotate max ±1.2deg on Y and ±0.6deg on X
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    quickTiltY.current?.(normX * 1.2);
    quickTiltX.current?.(-normY * 0.6);
  };

  const handleShellMouseEnter = () => {
    if (window.innerWidth < 768 || !specularRef.current) return;
    gsap.to(specularRef.current, { opacity: 0.8, duration: 0.3 });
  };

  const handleShellMouseLeave = () => {
    if (window.innerWidth < 768) return;
    if (specularRef.current) {
      gsap.to(specularRef.current, { opacity: 0, duration: 0.3 });
    }
    quickTiltX.current?.(0);
    quickTiltY.current?.(0);
  };

  // =========================================================================
  // 4. CENTER LINKS HOVER & CLICK LOGIC
  // =========================================================================
  const handleLinkHover = (index: number) => {
    isHoveringLinksRef.current = true;
    movePillToIndex(index, 1);
  };

  const handleNavContainerLeave = () => {
    isHoveringLinksRef.current = false;
    if (activeIndexRef.current >= 0) {
      movePillToIndex(activeIndexRef.current, 1);
    } else {
      movePillToIndex(0, 0.4);
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_ITEMS)[0]
  ) => {
    e.preventDefault();
    const targetEl = document.getElementById(item.targetId);
    if (!targetEl) return;

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(targetEl, { offset: -80, duration: 1.2 });
    } else {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // =========================================================================
  // 5. CTA MAGNETIC EFFECT (max 6px)
  // =========================================================================
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ctaBtnRef.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const maxMove = 6;
    const moveX = Math.max(-maxMove, Math.min(maxMove, distanceX * 0.22));
    const moveY = Math.max(-maxMove, Math.min(maxMove, distanceY * 0.22));

    gsap.to(ctaBtnRef.current, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCtaMouseLeave = () => {
    if (!ctaBtnRef.current) return;
    gsap.to(ctaBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  // =========================================================================
  // 6. MOBILE MENU (Full-screen paper menu + lock scroll)
  // =========================================================================
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      getLenisInstance()?.stop();
      document.body.style.overflow = "hidden";

      // Show header always while menu open
      if (shellRef.current) {
        gsap.to(shellRef.current, { yPercent: 0, opacity: 1, duration: 0.3 });
      }

      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        display: "flex",
      });

      const links = mobileMenuRef.current.querySelectorAll(".mobile-menu-item");
      gsap.fromTo(
        links,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.05,
          ease: "expo.out",
        }
      );
    } else {
      getLenisInstance()?.start();
      document.body.style.overflow = "";

      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = "none";
          }
        },
      });
    }
  }, [mobileMenuOpen]);

  // Escape key listener & focus trap for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
      } else if (e.key === "Tab" && mobileMenuRef.current) {
        const focusables = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* =========================================================================
          MINDLY-STYLE DOUBLE-LAYER SHELL NAVBAR
          ========================================================================= */}
      <header
        id="navbar"
        ref={shellRef}
        onMouseMove={handleShellMouseMove}
        onMouseEnter={handleShellMouseEnter}
        onMouseLeave={handleShellMouseLeave}
        className="navbar-outer-shell fixed top-[14px] left-1/2 -translate-x-1/2 z-[100] will-change-transform"
        style={{
          width: "min(1240px, calc(100vw - 32px))",
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* LAGGING OUTER GLOW DIV (moves at 0.6x scroll speed with yPercent offset) */}
        <div
          ref={glowDivRef}
          aria-hidden="true"
          className="navbar-ambient-glow pointer-events-none absolute -inset-[14px] rounded-[36px] will-change-transform"
        />

        {/* OUTER SHELL BODY (#EFE6D2 paper-dark with warm glow & blur) */}
        <div
          ref={shellInnerWrapperRef}
          className="navbar-shell-body relative w-full rounded-[28px] p-1.5 sm:p-2 border border-[rgba(43,33,24,0.10)] will-change-transform"
          style={{
            backgroundColor: "rgba(239, 230, 210, 0.90)",
            backdropFilter: "blur(18px) saturate(125%)",
            WebkitBackdropFilter: "blur(18px) saturate(125%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.6) inset, 0 10px 30px rgba(185,100,58,0.22), 0 0 60px rgba(217,168,119,0.35)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* INNER SURFACE (#FBF8F2 paper-light with paper grain ::before) */}
          <nav
            aria-label="Primary"
            ref={innerNavRef}
            className="navbar-inner-surface relative w-full h-[68px] rounded-[22px] px-4 sm:px-6 md:px-7 flex items-center justify-between overflow-hidden"
            style={{
              backgroundColor: "#FBF8F2",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(43,33,24,0.05)",
            }}
          >
            {/* SPECULAR LIGHT FOLLOWER (radial highlight following cursor) */}
            <div
              ref={specularRef}
              aria-hidden="true"
              className="pointer-events-none absolute w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-soft-light transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)",
              }}
            />

            {/* ZONE 1: LEFT LOGO "wandor°" */}
            <div
              ref={logoZoneRef}
              className="navbar-zone-logo flex items-center relative z-10 will-change-transform"
            >
              <Link
                href="/"
                className="group flex items-baseline font-[family-name:var(--font-courier-prime)] text-[26px] tracking-[-0.03em] font-bold text-[#151515] lowercase select-none"
              >
                <span>wandor</span>
                <span
                  className="inline-block w-2 h-2 rounded-full border-[1.5px] border-[#B9643A] align-super ml-0.5 relative -top-2"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* ZONE 2: CENTER PILL GROUP (Sentence case: Discover, Pricing, FAQs) */}
            <div
              ref={centerGroupRef}
              className="navbar-zone-center hidden md:flex items-center relative z-10 will-change-transform"
            >
              <div
                ref={linksPillContainerRef}
                onMouseLeave={handleNavContainerLeave}
                className="relative flex items-center rounded-full border border-[rgba(43,33,24,0.10)] bg-[rgba(255,255,255,0.45)] p-1 shadow-[inset_0_1px_2px_rgba(43,33,24,0.04)]"
              >
                {/* ONE SHARED SLIDING PILL (pressed in, with soft inset shadow) */}
                <div
                  ref={slidingPillRef}
                  aria-hidden="true"
                  className="nav-pressed-pill absolute top-1 bottom-1 rounded-full pointer-events-none will-change-transform"
                />

                {/* THE 3 LINKS */}
                {NAV_ITEMS.map((item, idx) => (
                  <a
                    key={item.label}
                    ref={(el) => {
                      linkRefs.current[idx] = el;
                    }}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    onMouseEnter={() => handleLinkHover(idx)}
                    className={`relative z-10 px-3.5 py-2 min-[1100px]:px-[18px] min-[1100px]:py-[10px] text-[14px] font-medium transition-colors duration-200 select-none cursor-pointer ${
                      activeSectionIndex === idx
                        ? "text-[#151515] font-semibold"
                        : "text-[#3B3733] hover:text-[#151515]"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ZONE 3: RIGHT CTA (LOGIN + Plan my trip + ArrowUpRight) */}
            <div
              ref={ctaZoneRef}
              className="navbar-zone-cta flex items-center space-x-4 sm:space-x-5 relative z-10 will-change-transform"
            >
              {/* LOGIN LINK (hidden below 1100px) */}
              <button
                onClick={handleOpenPlanClick}
                className="hidden min-[1100px]:inline-block text-[14px] font-medium text-[#3B3733] hover:text-[#B9643A] transition-colors cursor-pointer select-none"
              >
                Login
              </button>

              {/* PLAN MY TRIP CTA BUTTON with ArrowUpRight */}
              <button
                ref={ctaBtnRef}
                onMouseMove={handleCtaMouseMove}
                onMouseLeave={handleCtaMouseLeave}
                onClick={handleOpenPlanClick}
                className="group relative inline-flex items-center justify-center h-[44px] px-4 sm:px-5 rounded-full bg-[#0B0B0B] text-white text-[14px] font-medium tracking-[0.01em] select-none cursor-pointer overflow-hidden transition-all duration-[250ms] ease-out hover:bg-[#B9643A] hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B9643A] focus-visible:ring-offset-2"
              >
                <span className="hidden min-[420px]:inline">Plan my trip</span>
                <span className="inline min-[420px]:hidden">Plan</span>
                <ArrowUpRight
                  size={16}
                  className="ml-1.5 transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                />
              </button>

              {/* Mobile Hamburger button (< 768px): 40px, circular, hairline border */}
              <button
                ref={hamburgerBtnRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                aria-label="Toggle navigation menu"
                className="flex md:hidden w-10 h-10 rounded-full border border-[rgba(43,33,24,0.12)] bg-white/60 items-center justify-center text-[#151515] hover:text-[#B9643A] hover:bg-white transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* =========================================================================
          FULL-SCREEN PAPER MOBILE DRAWER (< 768px)
          ========================================================================= */}
      <div
        ref={mobileMenuRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className="fixed inset-0 z-[110] bg-[#F6F1E7] flex flex-col justify-between p-6 sm:p-10 pointer-events-auto paper-menu-grain"
        style={{ display: "none", opacity: 0 }}
      >
        {/* Top Header of Mobile Menu */}
        <div className="flex items-center justify-between w-full relative z-10">
          <div className="flex items-baseline font-[family-name:var(--font-courier-prime)] text-[28px] tracking-[-0.03em] font-bold text-[#151515] lowercase">
            <span>wandor</span>
            <span
              className="inline-block w-2 h-2 rounded-full border-[1.5px] border-[#B9643A] align-super ml-0.5 relative -top-2"
              aria-hidden="true"
            />
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[rgba(43,33,24,0.12)] bg-white/60 flex items-center justify-center text-[#151515] hover:text-[#B9643A] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Center Links with GSAP Stagger Reveal (40px, weight 500, letter-spacing -0.03em) */}
        <div
          ref={mobileLinksRef}
          className="flex flex-col items-center justify-center space-y-6 my-auto relative z-10 text-center"
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="overflow-hidden">
              <a
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, item);
                }}
                className="mobile-menu-item block text-[40px] leading-[1.1] font-medium tracking-[-0.03em] text-[#151515] hover:text-[#B9643A] transition-colors"
              >
                {item.label}
              </a>
            </div>
          ))}

          <div className="overflow-hidden">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenPlanClick();
              }}
              className="mobile-menu-item block text-[40px] leading-[1.1] font-medium tracking-[-0.03em] text-[#3B3733] hover:text-[#B9643A] transition-colors cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="w-full max-w-sm mx-auto relative z-10 pb-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleOpenPlanClick();
            }}
            className="w-full h-14 rounded-full bg-[#0B0B0B] text-white text-[15px] font-medium tracking-[0.02em] flex items-center justify-center space-x-2 hover:bg-[#B9643A] transition-colors cursor-pointer shadow-lg"
          >
            <span>Plan my trip</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
