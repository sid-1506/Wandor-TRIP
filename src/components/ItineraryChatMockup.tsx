"use client";

import React from "react";
import { ArrowUpRight, Clock, MapPin, Sparkles } from "lucide-react";

export default function ItineraryChatMockup() {
  return (
    <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-md rounded-[24px] shadow-2xl border border-black/5 p-5 overflow-hidden flex flex-col space-y-4 text-[var(--ink)] select-none">
      {/* Grey User Prompt Bubble */}
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-[#EFEBE4] text-[var(--ink)] text-[13px] py-2.5 px-4 rounded-2xl rounded-tr-xs leading-relaxed font-normal">
          Plan our first day in Rome. We love morning markets, quiet courtyards, and a great dinner view.
        </div>
      </div>

      {/* AI Reply Bubble */}
      <div className="flex items-start space-x-3">
        <div className="w-7 h-7 rounded-full bg-[var(--olive-dark)] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles size={14} />
        </div>

        <div className="flex-1 bg-[var(--paper-light)] p-4 rounded-2xl rounded-tl-xs border border-black/5 space-y-3.5">
          {/* Day Header */}
          <div className="flex items-center justify-between pb-2 border-b border-black/5">
            <span className="font-semibold text-[13px] text-[var(--ink)] tracking-tight">
              Day 1 • Arrival &amp; Old Town
            </span>
            <span className="text-[11px] font-medium text-[var(--terracotta)] bg-[var(--paper)] px-2 py-0.5 rounded-full">
              4 Stops
            </span>
          </div>

          {/* Timed Itinerary Timeline */}
          <div className="space-y-3">
            {/* 09:00 */}
            <div className="flex items-start space-x-2.5 text-[12px]">
              <span className="font-mono text-[11px] text-[var(--muted)] font-semibold shrink-0 pt-0.5">
                09:00
              </span>
              <div className="flex-1">
                <span className="font-semibold text-[var(--ink)]">Campo de&apos; Fiori</span>
                <p className="text-[11px] text-[var(--muted)]">Espresso at Roscioli &amp; morning bakery stroll</p>
                <div className="flex gap-1 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[var(--olive-dark)] border border-black/5">
                    Coffee
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[var(--muted)] border border-black/5">
                    Market
                  </span>
                </div>
              </div>
            </div>

            {/* 13:00 */}
            <div className="flex items-start space-x-2.5 text-[12px]">
              <span className="font-mono text-[11px] text-[var(--muted)] font-semibold shrink-0 pt-0.5">
                13:00
              </span>
              <div className="flex-1">
                <span className="font-semibold text-[var(--ink)]">Piazza Navona &amp; Chiostro</span>
                <p className="text-[11px] text-[var(--muted)]">Bramante cloister patio lunch &amp; Bernini fountains</p>
                <div className="flex gap-1 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[var(--terracotta)] border border-black/5">
                    Architecture
                  </span>
                </div>
              </div>
            </div>

            {/* 19:00 */}
            <div className="flex items-start space-x-2.5 text-[12px]">
              <span className="font-mono text-[11px] text-[var(--muted)] font-semibold shrink-0 pt-0.5">
                19:00
              </span>
              <div className="flex-1">
                <span className="font-semibold text-[var(--ink)]">Aperitivo on the Janiculum Hill</span>
                <p className="text-[11px] text-[var(--muted)]">Sunset panoramic terrace facing St. Peter&apos;s</p>
                <div className="flex gap-1 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[var(--olive-dark)] border border-black/5">
                    Golden Hour
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Olive View Full Itinerary Link */}
          <div className="pt-2 border-t border-black/5 flex justify-end">
            <button className="text-[11px] font-semibold text-[var(--olive-dark)] hover:text-[var(--olive)] uppercase tracking-wider flex items-center gap-1 group cursor-pointer">
              <span>View full itinerary</span>
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
