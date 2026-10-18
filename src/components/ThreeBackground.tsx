"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PaperShader } from "./PaperShader";
import { Dust } from "./Dust";
import { PaperPlane } from "./PaperPlane";
import { updateScrollState } from "@/lib/scrollStore";

export default function ThreeBackground() {
  const [enabled, setEnabled] = useState(false);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    // Check screen size and reduced motion
    const checkEnabled = () => {
      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      updateScrollState({ isMobile, reducedMotion: prefersReduced });
      setEnabled(!isMobile && !prefersReduced);
    };

    checkEnabled();
    window.addEventListener("resize", checkEnabled);

    // Pause frameloop when tab is hidden to save battery & GPU
    const handleVisibility = () => {
      setFrameloop(document.hidden ? "never" : "always");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Mouse tracking for paper shader lamp highlight
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      updateScrollState({ mouseX, mouseY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", checkEnabled);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!enabled) {
    return <div className="paper-grain-overlay" aria-hidden="true" />;
  }

  return (
    <>
      <div className="paper-grain-overlay" aria-hidden="true" />
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          frameloop={frameloop}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 8, 4]} intensity={1.5} />
          <directionalLight position={[-4, -2, -2]} intensity={0.5} color="#D9A877" />

          {/* Paper Texture Shader Background */}
          <PaperShader />

          {/* Dust / Pollen Floating Particles */}
          <Dust />

          {/* Procedural Low-Poly Folded Paper Plane */}
          <PaperPlane />
        </Canvas>
      </div>
    </>
  );
}
