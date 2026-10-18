"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Home,
  Compass,
  Bookmark,
  CalendarCheck,
  MessageSquare,
  Settings,
  Search,
  Star,
  MapPin,
  Wifi,
  Coffee,
  Sparkles,
  Check,
} from "lucide-react";
import { hotels } from "@/lib/content";

export default function DashboardMockup() {
  const [activeCategory, setActiveCategory] = useState("Hotels");
  const [selectedHotelIndex, setSelectedHotelIndex] = useState(0);

  const categories = ["Hotels", "Flights", "Food", "Activities"];
  const currentHotel = hotels[selectedHotelIndex];

  return (
    <div className="w-full max-w-[960px] bg-white/95 backdrop-blur-md rounded-[28px] shadow-2xl border border-black/5 overflow-hidden flex flex-col md:flex-row text-[var(--ink)] select-none">
      {/* 1. Left Sidebar */}
      <aside className="w-full md:w-[72px] bg-[var(--paper-light)] p-3 md:py-6 flex md:flex-col items-center justify-between border-b md:border-b-0 md:border-r border-black/5 shrink-0">
        {/* Logo Monogram */}
        <div className="w-10 h-10 rounded-full bg-[var(--btn)] text-white flex items-center justify-center font-bold text-sm tracking-tighter">
          w
        </div>

        {/* Sidebar Nav Icons */}
        <nav className="flex md:flex-col items-center gap-4 text-[var(--muted)] my-auto">
          <button className="p-2.5 rounded-xl bg-white text-[var(--ink)] shadow-xs">
            <Home size={18} />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-white hover:text-[var(--ink)] transition-colors">
            <Compass size={18} />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-white hover:text-[var(--ink)] transition-colors">
            <Bookmark size={18} />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-white hover:text-[var(--ink)] transition-colors">
            <CalendarCheck size={18} />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-white hover:text-[var(--ink)] transition-colors">
            <MessageSquare size={18} />
          </button>
        </nav>

        {/* Settings */}
        <button className="p-2.5 text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
          <Settings size={18} />
        </button>
      </aside>

      {/* 2. Center Content Area (Search, Chips, 2x2 Hotel Cards) */}
      <div className="flex-1 p-5 md:p-6 flex flex-col space-y-4 overflow-hidden border-b md:border-b-0 md:border-r border-black/5">
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-[var(--paper-light)] px-4 py-2.5 rounded-full border border-black/5">
          <Search size={16} className="text-[var(--muted)]" />
          <input
            type="text"
            readOnly
            value="Rome, Italy • Oct 14 - Oct 21"
            className="bg-transparent text-[13px] font-medium text-[var(--ink)] outline-none flex-1"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                activeCategory === cat
                  ? "bg-[var(--btn)] text-white"
                  : "bg-[var(--paper)] text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2x2 Hotel Cards Grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {hotels.map((hotel, idx) => (
            <div
              key={hotel.name}
              onClick={() => setSelectedHotelIndex(idx)}
              className={`group p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedHotelIndex === idx
                  ? "border-[var(--terracotta)] bg-[var(--paper-light)]/60 shadow-sm"
                  : "border-black/5 bg-white hover:border-black/15"
              }`}
            >
              {/* Illustrated Hotel Facade */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-2 bg-[var(--paper)]">
                <Image
                  src={`/assets/svg/hotel-${idx + 1}.svg`}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {hotel.badge && (
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-[var(--terracotta)] text-white px-2 py-0.5 rounded-full shadow-xs">
                    {hotel.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h5 className="text-[12px] font-semibold text-[var(--ink)] truncate">
                    {hotel.name}
                  </h5>
                  <div className="flex items-center space-x-1 text-[11px] text-[var(--ink)] font-medium">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-[10px] text-[var(--muted)] truncate">{hotel.location}</p>
              </div>

              <div className="pt-1.5 flex items-baseline justify-between border-t border-black/5 mt-1">
                <span className="text-[12px] font-bold text-[var(--ink)]">
                  {hotel.price}{" "}
                  <span className="text-[10px] font-normal text-[var(--muted)]">/ night</span>
                </span>
                <span className="text-[10px] text-[var(--terracotta)] font-medium">Select</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Right Details Panel (Featured Hotel Hassler) */}
      <div className="w-full md:w-[320px] p-5 md:p-6 bg-[var(--paper-light)] flex flex-col justify-between space-y-4 shrink-0">
        <div className="space-y-3.5">
          {/* Main Showcase Image */}
          <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-sm border border-black/5">
            <Image
              src="/assets/svg/hassler-main.svg"
              alt={currentHotel.name}
              fill
              className="object-cover"
            />
            <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full">
              Terrace Panorama
            </span>
          </div>

          {/* 3 Gallery Thumbs */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="relative aspect-[4/3] rounded-lg overflow-hidden border border-black/5 bg-white"
              >
                <Image
                  src={`/assets/svg/hassler-${num}.svg`}
                  alt=""
                  fill
                  className="object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Hotel Meta & Amenities */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-[15px] font-semibold text-[var(--ink)]">{currentHotel.name}</h4>
              <span className="text-[12px] font-medium text-[var(--muted)]">★ 5.0</span>
            </div>
            <p className="text-[11px] text-[var(--muted)] mt-0.5">{currentHotel.location}</p>
            <p className="text-[11px] text-[var(--terracotta)] font-medium mt-1">
              {currentHotel.highlight}
            </p>

            {/* Amenities Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white text-[var(--ink)] flex items-center gap-1 border border-black/5">
                <Wifi size={10} /> Fast WiFi
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white text-[var(--ink)] flex items-center gap-1 border border-black/5">
                <Coffee size={10} /> Rooftop Breakfast
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white text-[var(--ink)] flex items-center gap-1 border border-black/5">
                <Sparkles size={10} /> Spa &amp; Wellness
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Full-Width Terracotta CTA Button */}
        <div className="pt-3 border-t border-black/5 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-[var(--muted)]">Total per night</span>
            <span className="text-[18px] font-bold text-[var(--ink)]">
              {currentHotel.price} <span className="text-[11px] font-normal text-[var(--muted)]">/ night</span>
            </span>
          </div>
          <button className="w-full py-3 rounded-full bg-[var(--terracotta)] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[var(--terracotta-dark)] transition-colors shadow-sm cursor-pointer">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}
