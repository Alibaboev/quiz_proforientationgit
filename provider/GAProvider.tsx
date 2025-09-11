"use client";

import { useEffect } from "react";
import { initGA } from "@/utils/analytics";

export function GAProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (gaId) {
      initGA(gaId);
    }
  }, [gaId]);

  return null;
}
