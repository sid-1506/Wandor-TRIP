"use client";

import React from "react";
import { Compass, Sparkles, MapPin, Send, Bookmark, Calendar } from "lucide-react";

export default function ChatMockup() {
  return (
    <div className="w-full max-w-[380px] bg-white/95 backdrop-blur-md rounded-[24px] shadow-2xl border border-black/5 overflow-hidden flex flex-col text-[var(--ink)] select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-black/5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--paper)] flex items-center justify-center text-[var(--terracotta)]">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="text-[13px] font-semibold tracking-tight">Wandor AI Concierge</div>
            <div className="text-[11px] text-[var(--muted)] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active Trip Planner
            </div>
          </div>
        </div>
        <div className="flex space-x-2 text-[var(--muted)]">
          <Bookmark size={16} className="cursor-pointer hover:text-[var(--ink)]" />
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 flex-1 flex flex-col justify-between min-h-[280px]">
        {/* Greeting Area */}
        <div className="space-y-4">
          <div className="text-[18px] font-medium tracking-tight text-[var(--ink)]">
            Where to today, Ravi?
          </div>
          <p className="text-[13px] text-[var(--muted)] leading-relaxed">
            Tell me about the mood you want, who you&apos;re traveling with, or a dream stop you&apos;ve always wanted to explore.
          </p>

          {/* Quick prompt suggestions */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-semibold text-[var(--terracotta)] uppercase tracking-wider">
              Popular starting points
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] px-3 py-1.5 rounded-full bg-[var(--paper)] text-[var(--ink)] border border-black/5">
                ☕ Hidden espresso bars in Trastevere
              </span>
              <span className="text-[11px] px-3 py-1.5 rounded-full bg-[var(--paper)] text-[var(--ink)] border border-black/5">
                🌊 Amalfi coastal hike at sunset
              </span>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="mt-6 flex items-center gap-2 bg-[var(--paper-light)] p-2 rounded-full border border-black/5">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[var(--muted)]">
            <Compass size={14} />
          </div>
          <span className="text-[12px] text-[var(--muted)] flex-1 truncate">
            Ask Wandor anything about your trip...
          </span>
          <button
            aria-label="Send"
            className="w-8 h-8 rounded-full bg-[var(--btn)] text-white flex items-center justify-center hover:bg-black transition-transform active:scale-95 cursor-pointer"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
