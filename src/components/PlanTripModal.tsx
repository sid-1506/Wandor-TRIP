"use client";

import React, { useState } from "react";
import { X, Sparkles, MapPin, Calendar, Compass, CheckCircle2 } from "lucide-react";
import Button from "./Button";

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export default function PlanTripModal({
  isOpen,
  onClose,
  initialPrompt = "",
}: PlanTripModalProps) {
  const [destination, setDestination] = useState(
    initialPrompt.includes("Japan")
      ? "Tokyo & Kyoto, Japan"
      : initialPrompt.includes("Amalfi")
      ? "Amalfi Coast, Italy"
      : "Rome, Italy"
  );
  const [days, setDays] = useState("7 Days");
  const [styles, setStyles] = useState<string[]>([
    "Architecture",
    "Hidden Cafes",
    "Scenic Hikes",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleStyle = (style: string) => {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsSuccess(true);
    }, 1800);
  };

  const styleOptions = [
    "Architecture",
    "Hidden Cafes",
    "Scenic Hikes",
    "Local Trattorias",
    "Art Museums",
    "Sunset Views",
    "Boutique Stays",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[var(--paper)] rounded-[28px] shadow-2xl border border-[var(--line)]/10 p-6 md:p-8 overflow-hidden text-[var(--ink)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-full bg-[var(--terracotta)] text-white flex items-center justify-center">
                <Sparkles size={16} />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Plan Your Trip with Wandor</h3>
                <p className="text-[12px] text-[var(--muted)]">Personalized AI itinerary in seconds</p>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                Destination
              </label>
              <div className="flex items-center space-x-2 bg-white px-3.5 py-2.5 rounded-xl border border-black/10">
                <MapPin size={16} className="text-[var(--terracotta)] shrink-0" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-sm font-medium bg-transparent outline-none"
                  placeholder="e.g., Tokyo, Japan or Amalfi Coast"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                Trip Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["3 Days", "5 Days", "7 Days", "14 Days"].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`py-2 text-[12px] font-medium rounded-xl border transition-colors cursor-pointer ${
                      days === d
                        ? "bg-[var(--btn)] text-white border-[var(--btn)]"
                        : "bg-white text-[var(--muted)] border-black/10 hover:border-black/30"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Vibe & Interests */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                What do you love?
              </label>
              <div className="flex flex-wrap gap-2">
                {styleOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleStyle(s)}
                    className={`text-[11px] px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                      styles.includes(s)
                        ? "bg-[var(--terracotta)] text-white"
                        : "bg-white text-[var(--muted)] border border-black/10 hover:bg-black/5"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="text-[12px] font-semibold uppercase tracking-wider text-[var(--muted)] px-4 py-2 hover:text-[var(--ink)] cursor-pointer"
              >
                Cancel
              </button>
              <Button
                size="nav"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="min-w-[150px]"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Generating...
                  </span>
                ) : (
                  "Create Itinerary"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight">Your {destination} trip is ready!</h3>
            <p className="text-sm text-[var(--muted)] max-w-sm">
              We&apos;ve crafted a {days} plan tailored to {styles.slice(0, 2).join(" & ")}. Check your inbox or explore below.
            </p>
            <div className="pt-4 flex gap-3">
              <Button size="nav" onClick={onClose}>
                Explore Itinerary
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
