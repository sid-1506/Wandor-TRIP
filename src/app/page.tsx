"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import FeatureRow from "@/components/FeatureRow";
import ChatMockup from "@/components/ChatMockup";
import ItineraryChatMockup from "@/components/ItineraryChatMockup";
import TripGuideMockup from "@/components/TripGuideMockup";
import JourneyPartner from "@/components/JourneyPartner";
import TravelPersonal from "@/components/TravelPersonal";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PlanTripModal from "@/components/PlanTripModal";
import { featureRows } from "@/lib/content";

// Dynamically import Three.js background with SSR disabled
const ThreeBackground = dynamic(
  () => import("@/components/ThreeBackground"),
  { ssr: false }
);

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState("");

  const handleOpenPlan = (prompt?: string) => {
    if (prompt) setActivePrompt(prompt);
    setModalOpen(true);
  };

  return (
    <SmoothScroll>
      {/* Three.js R3F Canvas Layer (Paper GLSL Shader + Pollen + 3D Paper Plane) */}
      <ThreeBackground />

      <main className="relative min-h-screen w-full flex flex-col bg-transparent overflow-x-hidden">
        {/* Navigation Bar */}
        <Navbar onPlanTripClick={() => handleOpenPlan()} />

        {/* 1. Hero Section (Pixel-faithful replica with 14 SVG Parallax Layers) */}
        <Hero onPlanTripClick={() => handleOpenPlan()} />

        {/* 2. Intro Row (Curved top slide-over + Scrub word reveal) */}
        <Intro />

        {/* 3. Three Zig-Zag Feature Rows with Scenic SVG Tiles and Floating UI Mockups */}
        <section id="features" className="relative z-20 bg-[var(--paper)] py-8">
          {/* Row 1: PLAN AROUND YOU */}
          <FeatureRow
            tag={featureRows[0].tag}
            tagColor={featureRows[0].tagColor}
            title={featureRows[0].title}
            paragraph={featureRows[0].paragraph}
            reverse={false}
            sceneSrc="/assets/svg/tile-scene-1.svg"
            mockup={<ChatMockup />}
          />

          {/* Row 2: YOUR TRIP FIGURED OUT */}
          <FeatureRow
            tag={featureRows[1].tag}
            tagColor={featureRows[1].tagColor}
            title={featureRows[1].title}
            paragraph={featureRows[1].paragraph}
            reverse={true}
            sceneSrc="/assets/svg/tile-scene-2.svg"
            mockup={<ItineraryChatMockup />}
          />

          {/* Row 3: LESS PLANNING, MORE WANDERING */}
          <FeatureRow
            tag={featureRows[2].tag}
            tagColor={featureRows[2].tagColor}
            title={featureRows[2].title}
            paragraph={featureRows[2].paragraph}
            reverse={false}
            sceneSrc="/assets/svg/tile-scene-3.svg"
            mockup={<TripGuideMockup />}
          />
        </section>

        {/* 4. Journey Partner Dashboard wrapped in Floral Frame */}
        <JourneyPartner onPlanTripClick={() => handleOpenPlan()} />

        {/* 5. Travel is Personal Pinned Window Section */}
        <TravelPersonal />

        {/* 6. Final CTA with Rising Chinese Pagoda */}
        <FinalCTA onPlanTripClick={() => handleOpenPlan()} />

        {/* 7. Footer with Sticker-Style Landmark Collage */}
        <Footer />

        {/* Interactive Trip Planner Modal */}
        <PlanTripModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialPrompt={activePrompt}
        />
      </main>
    </SmoothScroll>
  );
}
