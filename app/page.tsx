"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CareerTracks from "@/components/CareerTracks";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsGalaxy from "@/components/SkillsGalaxy";
import Projects from "@/components/Projects";
import QuantPlayground from "@/components/QuantPlayground";
import SystemsSection from "@/components/SystemsSection";
import Achievements from "@/components/Achievements";
import ResumeDownload from "@/components/ResumeDownload";
import Contact from "@/components/Contact";

export default function Home() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    async function initLenis() {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        const raf = (time: number) => {
          lenis!.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch {
        // Graceful fallback — native scroll still works
      }
    }

    initLenis();
    return () => lenis?.destroy();
  }, []);

  return (
    <main className="relative bg-navy-900 min-h-screen">
      <Navigation />
      <Hero />
      <CareerTracks />
      <About />
      <ExperienceTimeline />
      <SkillsGalaxy />
      <Projects />
      <QuantPlayground />
      <SystemsSection />
      <Achievements />
      <ResumeDownload />
      <Contact />
    </main>
  );
}
