"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { BUSINESS_PRESETS, normalizeBusiness, BusinessPreset } from "@/lib/business";

type Ctx = {
  biz: BusinessPreset;
  bizKey: string;
  setBusiness: (key: string) => void;
};

const BusinessCtx = createContext<Ctx>({
  biz: BUSINESS_PRESETS["car detailing"],
  bizKey: "car detailing",
  setBusiness: () => {},
});

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [bizKey, setBizKey] = useState<string>("car detailing");
  const biz = BUSINESS_PRESETS[bizKey] || BUSINESS_PRESETS["car detailing"];
  return (
    <BusinessCtx.Provider value={{ biz, bizKey, setBusiness: (k) => setBizKey(normalizeBusiness(k)) }}>
      {children}
    </BusinessCtx.Provider>
  );
}

export function useBusiness() {
  return useContext(BusinessCtx);
}
