# Wandor — AI Travel Itinerary Planner ✈️🌍

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-green?style=flat-square&logo=greensock)](https://greensock.com/)

A pixel-faithful, award-level scroll-driven **Parallax Landing Page** for **Wandor**, an AI travel-itinerary planner. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP, Lenis, and Three.js (React Three Fiber / Drei).

---

## ✨ Features & Architecture

- **Pixel-Faithful Hero Replica**:
  - Recreated in earthy risograph gouache style with custom warm paper textures (`#FBF8F2` to `#F3EADB`).
  - **14 Hand-Authored Transparent SVG Layers** stacked at `viewBox="0 0 1920 1080"` with custom risograph hatching, displacement filters, and depth mappings:
    - `sketch-cloud-left.svg` & `sketch-cloud-right.svg` (d: 0.30)
    - `hills-far.svg` (d: 0.50)
    - `mountain-machu-picchu.svg` (d: 0.60)
    - `trees-back.svg` (d: 0.70)
    - `spark-marks.svg` (d: 0.72)
    - `great-wall.svg` (d: 0.75)
    - `taj-mahal.svg` (d: 0.78)
    - `colosseum.svg` & `chichen-itza.svg` (d: 0.80)
    - `christ-redeemer.svg` (d: 0.85)
    - `ground.svg` (d: 0.95)
    - `plants-foreground-left.svg` & `plants-foreground-right.svg` (d: 1.30)
- **Glassmorphism Prompt Box**:
  - Backdrop blur, frosted highlights, and realistic looping typewriter effect with blurred active-letter focus.
  - Interactive file upload and Enter-to-submit mock planner flow.
- **GSAP Motion & Parallax System**:
  - **Intro Timeline (~2.2s)**: Staggered back-to-front illustration rise, SplitText line-by-line reveal, scaling prompt box, and dropping navbar.
  - **Scroll Parallax**: Lenis smooth scroll (`lerp: 0.08`) synced with GSAP `ScrollTrigger`.
  - **Mouse Parallax**: Multi-plane cursor depth movement with `gsap.quickTo`.
- **Three.js Layer (React Three Fiber)**:
  - Custom GLSL paper shader with procedural fbm fibers, sparse dark speckles, vignette, and mouse-following warm lamp highlight.
  - Organic dust/pollen particle drift responding to scroll velocity.
  - Procedural low-poly folded origami paper plane flying along a 3D Catmull-Rom spline trajectory.
  - Automatically disabled on mobile (<768px) and `prefers-reduced-motion` with seamless CSS paper-grain fallback.
- **Sections Below the Hero**:
  - **Intro Row**: Curved top paper slide-over with scrub word reveal.
  - **3 Zig-Zag Feature Rows**: Hand-authored scenic SVG tiles (Alpine Lake, Amalfi Coast, Tuscan Countryside) with floating interactive UI mockups (`ChatMockup`, `ItineraryChatMockup`, `TripGuideMockup`).
  - **Your Journey Partner**: HTML/CSS Dashboard mockup framed by a hand-illustrated floral garland (poppies, daisies, lavender) with multi-depth parallax.
  - **Travel is Personal**: Pinned section with scaling airplane window and animated copy.
  - **Final CTA**: Rising Chinese pagoda with flat prompt box.
  - **Footer**: Sticker-style landmark collage (Sagrada Família, Sydney Opera House, Eiffel Tower, Pyramids, Taj Mahal, Colosseum, Big Ben, Torii Gate, Statue of Liberty) rising with parallax.

---

## 📂 Project Structure

```text
WANDOR/
├── public/
│   └── assets/
│       └── svg/           # 40+ hand-authored risograph landmarks, scenic tiles & overlays
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout & font definitions (Inter Tight, Courier Prime)
│   │   ├── page.tsx       # Landing page composing all parallax sections
│   │   └── globals.css    # Tailwind v4 directives & color variables
│   ├── components/
│   │   ├── Hero.tsx       # Multi-depth parallax hero section
│   │   ├── HeroLayers.tsx # 14 SVG illustration depth planes
│   │   ├── PromptBox.tsx  # Interactive AI prompt input with typewriter effect
│   │   ├── PaperPlane.tsx # 3D origami paper plane simulation (R3F)
│   │   ├── ThreeBackground.tsx # GLSL custom paper texture & dust particle field
│   │   ├── Navbar.tsx     # Floating dual-capsule responsive navigation
│   │   ├── SmoothScroll.tsx # Lenis smooth scrolling orchestrator
│   │   └── ...            # Feature rows, mockups, modals & footer
│   └── lib/
│       ├── gsap.ts        # GSAP & ScrollTrigger registration helper
│       ├── scrollStore.ts # Lightweight reactive scroll & resize state store
│       └── content.ts     # Content copy & copy tokens
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Vanilla CSS Variables
- **Animations**: GSAP 3 (ScrollTrigger, QuickTo)
- **Smooth Scroll**: Lenis
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Icons**: Lucide React
- **Typography**: Google Fonts (`Inter Tight`, `Courier Prime`, `Cutive Mono`)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
