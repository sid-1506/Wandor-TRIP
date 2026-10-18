"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, Filter, Star } from "lucide-react";
import { romeGuideItems } from "@/lib/content";

export default function TripGuideMockup() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Heritage", "Photo", "Architecture"];

  return (
    <div className="w-full max-w-[430px] bg-white/95 backdrop-blur-md rounded-[24px] shadow-2xl border border-black/5 p-5 overflow-hidden flex flex-col space-y-4 text-[var(--ink)] select-none">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div>
          <h4 className="text-[15px] font-semibold tracking-tight text-[var(--ink)]">
            Ultimate Rome Trip Guide
          </h4>
          <p className="text-[11px] text-[var(--muted)]">Curated by Wandor AI • 6 Essential Landmarks</p>
        </div>
        <span className="w-8 h-8 rounded-full bg-[var(--paper)] flex items-center justify-center text-[var(--muted)]">
          <Filter size={14} />
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[11px] px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              activeTab === tab
                ? "bg-[var(--btn)] text-white"
                : "bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 6 Rome Guide Rows */}
      <div className="space-y-2 max-h-[320px] overflow-y-auto no-scrollbar pr-1">
        {romeGuideItems.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[var(--paper-light)] transition-colors group cursor-pointer border border-transparent hover:border-black/5"
          >
            {/* Hand-Authored SVG Vignette Thumbnail */}
            <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-black/5 bg-[var(--paper)]">
              <Image
                src={`/assets/svg/guide-${idx + 1}.svg`}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-[12px] font-semibold text-[var(--ink)] truncate">
                  {item.title}
                </span>
                <span className="text-[9px] font-medium text-[var(--terracotta)] bg-[var(--paper)] px-1.5 py-0.2 rounded-xs">
                  {item.badge}
                </span>
              </div>
              <p className="text-[11px] text-[var(--muted)] truncate">{item.meta}</p>
            </div>

            {/* Chevron */}
            <ChevronRight
              size={15}
              className="text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-transform shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
