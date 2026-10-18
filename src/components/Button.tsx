"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "nav" | "hero" | "regular";
  magnetic?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "nav",
  magnetic = true,
  className = "",
  children,
  onClick,
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Move max 6px toward cursor
    const maxMove = 6;
    const moveX = Math.max(-maxMove, Math.min(maxMove, distanceX * 0.22));
    const moveY = Math.max(-maxMove, Math.min(maxMove, distanceY * 0.22));

    gsap.to(btnRef.current, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!magnetic || !btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium uppercase transition-colors tracking-[0.03em] select-none cursor-pointer";

  const sizeStyles = {
    nav: "px-[26px] py-[13px] text-[12px] leading-none rounded-full",
    hero: "px-[30px] py-[16px] text-[12px] leading-none rounded-full",
    regular: "px-[24px] py-[12px] text-[12px] leading-none rounded-full",
  }[size];

  const variantStyles = {
    primary:
      "bg-[var(--btn)] text-white hover:bg-[#222222] active:scale-[0.98] shadow-sm hover:shadow-md",
    secondary:
      "bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta-dark)] active:scale-[0.98]",
    outline:
      "bg-transparent text-[var(--ink)] border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white",
    ghost:
      "bg-transparent text-[var(--ink)] hover:bg-black/5",
  }[variant];

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
