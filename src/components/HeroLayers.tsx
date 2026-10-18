"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

interface HeroLayersProps {
  className?: string;
}

export interface HeroLayersRefs {
  cloudLeft: HTMLDivElement | null;
  cloudRight: HTMLDivElement | null;
  hillsFar: HTMLDivElement | null;
  mountainMachuPicchu: HTMLDivElement | null;
  treesBack: HTMLDivElement | null;
  sparkMarks: HTMLDivElement | null;
  greatWall: HTMLDivElement | null;
  tajMahal: HTMLDivElement | null;
  colosseum: HTMLDivElement | null;
  chichenItza: HTMLDivElement | null;
  christRedeemer: HTMLDivElement | null;
  ground: HTMLDivElement | null;
  plantsFgLeft: HTMLDivElement | null;
  plantsFgRight: HTMLDivElement | null;
}

export const heroLayerDepths = {
  cloudLeft: 0.3,
  cloudRight: 0.3,
  hillsFar: 0.5,
  mountainMachuPicchu: 0.6,
  treesBack: 0.7,
  sparkMarks: 0.72,
  greatWall: 0.75,
  tajMahal: 0.78,
  colosseum: 0.8,
  chichenItza: 0.8,
  christRedeemer: 0.85,
  ground: 0.95,
  plantsFgLeft: 1.3,
  plantsFgRight: 1.3,
};

const HeroLayers = forwardRef<HTMLDivElement, HeroLayersProps>(function HeroLayers(
  { className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      id="hero-illustration-wrapper"
      className={`absolute bottom-0 left-0 w-full h-[115%] pointer-events-none select-none z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* SVG Hand-Drawn Edge Displacement Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="handdrawn-filter" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Sketch Cloud Left (d: 0.30) */}
      <div
        id="layer-cloud-left"
        data-depth="0.30"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/sketch-cloud-left.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 2: Sketch Cloud Right (d: 0.30) */}
      <div
        id="layer-cloud-right"
        data-depth="0.30"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/sketch-cloud-right.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 3: Far Sage Hills (d: 0.50) */}
      <div
        id="layer-hills-far"
        data-depth="0.50"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/hills-far.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 4: Machu Picchu Mountain (d: 0.60) */}
      <div
        id="layer-mountain-machu-picchu"
        data-depth="0.60"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/mountain-machu-picchu.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 5: Trees Back (d: 0.70) */}
      <div
        id="layer-trees-back"
        data-depth="0.70"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/trees-back.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 6: Spark Marks (d: 0.72) */}
      <div
        id="layer-spark-marks"
        data-depth="0.72"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/spark-marks.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 7: Great Wall of China (d: 0.75) */}
      <div
        id="layer-great-wall"
        data-depth="0.75"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/great-wall.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 8: Taj Mahal (d: 0.78) */}
      <div
        id="layer-taj-mahal"
        data-depth="0.78"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/taj-mahal.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 9: Colosseum (d: 0.80) */}
      <div
        id="layer-colosseum"
        data-depth="0.80"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/colosseum.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 10: Chichen Itza Pyramid (d: 0.80) */}
      <div
        id="layer-chichen-itza"
        data-depth="0.80"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/chichen-itza.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 11: Christ the Redeemer (d: 0.85) */}
      <div
        id="layer-christ-redeemer"
        data-depth="0.85"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/christ-redeemer.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 12: Ground & Steps Path (d: 0.95) */}
      <div
        id="layer-ground"
        data-depth="0.95"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/assets/svg/ground.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 13: Plants Foreground Left (d: 1.30) */}
      <div
        id="layer-plants-foreground-left"
        data-depth="1.30"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform z-30"
      >
        <Image
          src="/assets/svg/plants-foreground-left.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Layer 14: Plants Foreground Right (d: 1.30) */}
      <div
        id="layer-plants-foreground-right"
        data-depth="1.30"
        className="hero-parallax-layer absolute inset-0 w-full h-full will-change-transform z-30"
      >
        <Image
          src="/assets/svg/plants-foreground-right.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>
    </div>
  );
});

export default HeroLayers;
