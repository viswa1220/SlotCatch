"use client";

import { useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HowSection from "@/components/HowSection";
import DemoSection from "@/components/DemoSection";
import RoadmapSection from "@/components/RoadmapSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import ApplySection from "@/components/ApplySection";
import { BusinessProvider } from "@/components/BusinessContext";

export default function Page() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <BusinessProvider>
      <Navbar scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <ProblemSection />
      <HowSection />
      <DemoSection />
      <RoadmapSection />
      <FeaturesSection />
      <PricingSection scrollTo={scrollTo} />
      <ApplySection />
    </BusinessProvider>
  );
}
