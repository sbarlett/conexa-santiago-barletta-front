"use client";
import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
};

export enum Breakpoint {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(Breakpoint.Desktop);
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint(Breakpoint.Mobile);
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint(Breakpoint.Tablet);
      } else {
        setBreakpoint(Breakpoint.Desktop);
      }
    };
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
