"use client";

import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
};

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint("mobile");
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
