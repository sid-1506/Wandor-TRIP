# Wandor — AI Travel Itinerary Planner

An editorial, risograph-inspired interactive landing experience for **Wandor**, an AI travel planner concept. The interface blends vintage travel poster aesthetics (textured gouache art, risograph hatching, warm paper tones) with modern creative web engineering — featuring multi-plane parallax depth, real-time WebGL shaders, and smooth momentum scrolling.

---

## Tech Stack & Architecture

This project was built to explore how tactile print aesthetics can be translated into a performant web interface. Here is an overview of the core technologies and why they were chosen:

### Core Framework & Runtime
- **Next.js 16 (App Router)**: Handles routing, font optimization, and server/client boundary management. Pages are prerendered statically with Turbopack for near-instant local HMR and production builds.
- **React 19**: Powers the component hierarchy and state management, taking advantage of modern hooks and client-side lifecycle handling.
- **TypeScript 5**: Strict typing across UI props, GSAP timeline refs, Three.js geometries, and scroll store states.

### Motion, Scroll & Physics
- **GSAP 3 (`gsap`, `@gsap/react`, `ScrollTrigger`)**: Orchestrates all timed and scroll-linked animations. A central timeline coordinates the staggered hero entrance, line-by-line heading reveals, and multi-plane parallax depth. We use `gsap.quickTo` for cursor-depth mouse movement to maintain high frame rates without layout thrashing.
- **Lenis (`lenis`)**: Provides smooth, momentum-based scrolling. Rather than running a separate animation loop, Lenis is bound directly to GSAP's ticker (`gsap.ticker.add`), ensuring that DOM parallax offsets and WebGL elements update in exact lockstep without tearing.

### 3D & Creative Shaders
- **Three.js (`three`)**: Underpins all WebGL rendering on a background canvas.
- **React Three Fiber (`@react-three/fiber`) & Drei (`@react-three/drei`)**: Declarative Three.js scene graph management inside React. Dynamically imported with SSR disabled to prevent hydration mismatches.
- **Custom GLSL Paper Shader (`PaperShader.tsx`)**: A custom fragment shader that generates procedural paper texture using Fractal Brownian Motion (FBM) noise, micro-fiber flecks, subtle vignette, and a soft radial highlight that tracks user mouse coordinates.
- **Procedural 3D Origami Plane (`PaperPlane.tsx`)**: A low-poly paper airplane model assembled from procedural `BufferGeometry` vertices that glides across the screen along a 3D Catmull-Rom spline as the user scrolls.
- **Atmospheric Dust Simulation (`Dust.tsx`)**: An instanced particle field drifting gently across the viewport with drift speed dynamically linked to scroll velocity.

### Styling & Design System
- **Tailwind CSS v4**: Utility-first styling paired with native CSS custom properties for theme colors (`--paper`, `--ink`, `--terracotta`, `--moss`, `--ochre`, `--sand`).
- **Custom Typography**: Loaded via `next/font/google` (`Inter Tight` for display headings and UI body copy, `Courier Prime` for prompt inputs and monospace accents).
- **Lucide React (`lucide-react`)**: Clean, lightweight SVG iconography for interface controls, airport codes, and interactive cues.

---

## Engineering Highlights

### 1. 2.5D Multi-Plane Parallax System
The hero section stacks **14 transparent SVG illustration layers** inside a fixed `1920x1080` coordinate space. Each plane is assigned an independent depth coefficient (from `0.30` for distant sketch clouds up to `1.30` for foreground foliage):
- **Mouse parallax**: Multiplies cursor offset `(x, y)` by each layer's depth factor using `gsap.quickTo` with ease smoothing.
- **Scroll parallax**: As the page scrolls, layers translate upward and outward at varying speeds, creating authentic physical depth.
- **Edge distortion**: Hand-drawn paper edges are simulated via an inline SVG filter definition (`feTurbulence` + `feDisplacementMap`).

### 2. Unified Render Loop
To eliminate micro-stuttering between Lenis and GSAP ScrollTrigger:
- GSAP's internal lag smoothing is zeroed (`gsap.ticker.lagSmoothing(0)`).
- Lenis's `raf` cycle is driven directly by GSAP's ticker.
- Scroll position and velocity are published to a lightweight reactive store (`scrollStore.ts`) that both DOM components and R3F `useFrame` hooks subscribe to without triggering unnecessary React re-renders.

### 3. Accessibility & Low-Power Fallbacks
- **Reduced Motion**: Automatically detects `(prefers-reduced-motion: reduce)`. When active, Lenis smooth scrolling and heavy 3D spline animations are bypassed, falling back to instant native scrolling.
- **Mobile Optimization**: Heavy WebGL canvas shaders and floating particles gracefully downgrade on small mobile screens (<768px), replaced by lightweight CSS grain overlays to preserve battery life and high frame rates.

---

## Sections & Interactive Features

1. **Hero & Landmark Panorama**: Layered vintage landmarks (Machu Picchu, Great Wall, Taj Mahal, Colosseum, Chichén Itzá, Christ the Redeemer) framing the central proposition.
2. **Interactive Glassmorphic Prompt Box**: Looping typewriter effect cycling through travel ideas, functional photo attachment triggers, and an expandable planning modal.
3. **Intro Slide-Over**: Curved paper overlap transition with scrubbed word-by-word text reveal.
4. **Scenic Feature Tiles**: Alternating editorial sections featuring bespoke scenic vector plates (Alpine Lake, Amalfi Coast, Tuscan Hills) paired with interactive UI mockups:
   - *Chat Mockup*: Real-time conversational trip planning feed.
   - *Itinerary Chat Mockup*: Multi-day route builder with pacing and flight cards.
   - *Trip Guide Mockup*: Curated neighborhood spots, transit tips, and local packing notes.
5. **Journey Partner Dashboard**: Floral-framed travel overview card (poppies, daisies, and lavender) with day-by-day schedules, weather forecasts, and route maps.
6. **Airplane Window Perspective**: Pinned scroll section featuring an oval aircraft window framing rolling cloudscapes.
7. **Pagoda Call to Action & Stamp Collage Footer**: Rising architectural landmark leading into a sticker-style footer collage (Eiffel Tower, Sydney Opera House, Big Ben, Torii Gate, Pyramids, and Statue of Liberty).

---

## Project Structure

```text
wandor/
├── public/
│   └── assets/
│       └── svg/                # 40+ hand-crafted risograph vector landmarks & scenic tiles
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 configuration, color tokens, and font variables
│   │   ├── layout.tsx          # Root layout with Google font loaders & metadata
│   │   └── page.tsx            # Main landing page orchestrating all sections
│   ├── components/
│   │   ├── Hero.tsx            # Hero section with timeline orchestrator
│   │   ├── HeroLayers.tsx      # 14 SVG depth layers with custom displacement filter
│   │   ├── PromptBox.tsx       # Interactive typewriter input box
│   │   ├── PlanTripModal.tsx   # Trip customization modal dialog
│   │   ├── ThreeBackground.tsx # R3F Canvas wrapper with client-only dynamic loading
│   │   ├── PaperShader.tsx     # Custom GLSL fragment shader for paper grain & mouse lamp
│   │   ├── PaperPlane.tsx      # 3D procedural origami plane flying on a 3D curve
│   │   ├── Dust.tsx            # Particle dust field reacting to scroll velocity
│   │   ├── FeatureRow.tsx      # Reusable editorial feature row with scenic SVG backgrounds
│   │   ├── ChatMockup.tsx      # Interactive chat UI card
│   │   ├── ItineraryChatMockup.tsx # Itinerary generation preview card
│   │   ├── TripGuideMockup.tsx # Curated local guide card
│   │   ├── JourneyPartner.tsx  # Dashboard showcase framed by floral vector illustrations
│   │   ├── DashboardMockup.tsx # Comprehensive travel itinerary dashboard UI
│   │   ├── TravelPersonal.tsx  # Pinned airplane window scroll experience
│   │   ├── FinalCTA.tsx        # Pagoda illustration and final prompt CTA
│   │   ├── Footer.tsx          # Landmark stamp collage & footer navigation
│   │   ├── Navbar.tsx          # Floating double-capsule header with responsive controls
│   │   ├── SmoothScroll.tsx    # Lenis + GSAP ticker synchronization provider
│   │   └── Button.tsx          # Reusable styled button component
│   └── lib/
│       ├── content.ts          # Section copy, feature descriptions, and landmarks data
│       ├── gsap.ts             # Centralized GSAP plugin registration
│       └── scrollStore.ts      # Zero-overhead reactive scroll state listener
├── next.config.ts              # Next.js compiler & build configuration
├── package.json                # Project dependencies and script definitions
├── tsconfig.json               # TypeScript compiler options
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sid-1506/Wandor-TRIP.git
   cd Wandor-TRIP
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Compiles the production build with type checking & static optimization |
| `npm run start` | Runs the built production application locally |
| `npm run lint` | Runs ESLint to check for code quality and convention issues |

---

## License

This project is open-source under the [MIT License](LICENSE).
