import type { Metadata } from "next";
import { Inter_Tight, Courier_Prime, Cutive_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cutiveMono = Cutive_Mono({
  variable: "--font-cutive-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wandor — AI Travel Itinerary Planner",
  description:
    "Tell our AI where you're going and what you love. We'll create a personalized itinerary for you.",
  openGraph: {
    title: "Wandor — AI Travel Itinerary Planner",
    description:
      "Tell our AI where you're going and what you love. We'll create a personalized itinerary for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${courierPrime.variable} ${cutiveMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans selection:bg-[var(--terracotta)] selection:text-white">
        {children}
      </body>
    </html>
  );
}
