"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { Upload } from "lucide-react";
import { samplePrompts } from "@/lib/content";

interface PromptBoxProps {
  variant?: "glass" | "flat";
  onSubmit?: (prompt: string) => void;
  className?: string;
}

export default function PromptBox({
  variant = "glass",
  onSubmit,
  className = "",
}: PromptBoxProps) {
  const [userInput, setUserInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(18); // Start around "I'm planning a 7-d" for hero visual match
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Typewriter effect loop
  useEffect(() => {
    if (isFocused || userInput.length > 0) return;

    const currentFullText = samplePrompts[promptIndex % samplePrompts.length];
    const typingSpeed = isDeleting ? 30 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentFullText.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          // Pause at end of sentence
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setPromptIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isFocused, promptIndex, userInput]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalPrompt =
      userInput.trim() || samplePrompts[promptIndex % samplePrompts.length].slice(0, charIndex);

    setToastMessage(`Planning your trip... ✨ "${finalPrompt.slice(0, 36)}..."`);
    onSubmit?.(finalPrompt);

    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const currentFullText = samplePrompts[promptIndex % samplePrompts.length];
  const typedText = currentFullText.slice(0, Math.max(0, charIndex - 1));
  const lastChar = charIndex > 0 ? currentFullText.charAt(charIndex - 1) : "";

  const containerClasses =
    variant === "glass"
      ? "glass-prompt"
      : "bg-[#F5F4F1] border border-[rgba(43,33,24,0.12)] rounded-[28px] shadow-sm";

  return (
    <div
      className={`relative w-full max-w-[760px] min-h-[160px] md:min-h-[175px] p-5 md:p-6 flex flex-col justify-between ${containerClasses} ${className}`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 bg-[var(--ink)] text-white text-[13px] font-medium px-5 py-2.5 rounded-full shadow-lg border border-white/20 animate-fade-in flex items-center space-x-2 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden file input for upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.txt"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setToastMessage(`Uploaded "${e.target.files[0].name}" for AI analysis 📎`);
            setTimeout(() => setToastMessage(null), 3500);
          }
        }}
      />

      {/* Textarea with Animated Typewriter Overlay */}
      <div className="relative w-full flex-1">
        <textarea
          ref={textareaRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder=""
          rows={3}
          className="w-full h-full bg-transparent border-0 outline-none resize-none text-[15px] md:text-[16px] leading-[1.5] font-medium text-[var(--ink)] placeholder-[var(--prompt-text)] relative z-10 selection:bg-[var(--terracotta)] selection:text-white"
          aria-label="Trip planning prompt"
        />

        {/* Realistic Typewriter Overlay with Blurred Last Char */}
        {!isFocused && userInput.length === 0 && (
          <div
            onClick={() => {
              textareaRef.current?.focus();
              setIsFocused(true);
            }}
            className="absolute inset-0 pointer-events-none text-[15px] md:text-[16px] leading-[1.5] font-medium text-[var(--prompt-text)] select-none"
          >
            <span>{typedText}</span>
            {lastChar && (
              <span
                className="inline-block transition-all duration-75"
                style={{
                  filter: isDeleting ? "blur(0.5px)" : "blur(1.6px)",
                  opacity: 0.88,
                }}
              >
                {lastChar}
              </span>
            )}
            <span className="inline-block w-[1.5px] h-[16px] bg-[var(--prompt-text)] ml-[2px] align-middle animate-pulse" />
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-4 mt-auto relative z-20">
        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-9 h-9 rounded-full bg-white text-[var(--ink)] shadow-xs hover:shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-black/5 cursor-pointer"
          aria-label="Upload trip inspiration or itinerary file"
          title="Upload inspiration image or notes"
        >
          <Upload size={16} strokeWidth={2.2} />
        </button>

        {/* Submit Plan Button */}
        <Button
          size="hero"
          onClick={() => handleSubmit()}
          className="text-[12px] font-semibold"
        >
          PLAN MY TRIP
        </Button>
      </div>
    </div>
  );
}
