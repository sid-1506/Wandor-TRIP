"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/content";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface NavbarProps {
  onPlanTripClick?: () => void;
}

export default function Navbar({ onPlanTripClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile menu with GSAP
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        display: "flex",
      });
      gsap.fromTo(
        mobileLinksRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, delay: 0.1, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = "none";
          }
        },
      });
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo "wandor" */}
          <Link
            href="/"
            className="font-[family-name:var(--font-courier-prime)] text-[28px] md:text-[32px] tracking-[-0.03em] font-bold text-[var(--ink)] lowercase select-none"
          >
            wandor
          </Link>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right: Login + Plan My Trip */}
          <div className="hidden md:flex items-center space-x-7">
            <button
              onClick={onPlanTripClick}
              className="text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--ink)] hover:opacity-70 transition-opacity cursor-pointer"
            >
              LOGIN
            </button>
            <Button size="nav" onClick={onPlanTripClick}>
              PLAN MY TRIP
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button size="regular" className="text-[11px] px-4 py-2" onClick={onPlanTripClick}>
              PLAN TRIP
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--ink)] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[var(--paper)] hidden flex-col justify-center items-center px-8"
        style={{ display: "none", opacity: 0 }}
      >
        <div ref={mobileLinksRef} className="flex flex-col items-center space-y-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium tracking-wide text-[var(--ink)] uppercase"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-6 flex flex-col space-y-4 w-full max-w-xs">
            <Button
              size="hero"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanTripClick?.();
              }}
            >
              PLAN MY TRIP
            </Button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanTripClick?.();
              }}
              className="text-sm font-medium tracking-wider uppercase text-[var(--muted)] py-2"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
