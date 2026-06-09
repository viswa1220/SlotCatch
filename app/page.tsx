"use client";

import { useCallback } from "react";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HowSection from "@/components/HowSection";
import GapsSection from "@/components/GapsSection";
import FeaturesSection from "@/components/FeaturesSection";
import RoadmapSection from "@/components/RoadmapSection";
import PricingSection from "@/components/PricingSection";
import ApplySection from "@/components/ApplySection";
import { BusinessProvider } from "@/components/BusinessContext";

export default function Page() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = 90;
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, []);

  return (
    <BusinessProvider>
      <Navbar scrollTo={scrollTo} />

      <main>
        <HeroSection scrollTo={scrollTo} />
        <ProblemSection />
        <HowSection />
        <GapsSection />
        <FeaturesSection />
        <RoadmapSection />
        <PricingSection scrollTo={scrollTo} />
        <ApplySection />
      </main>
    </BusinessProvider>
  );
}