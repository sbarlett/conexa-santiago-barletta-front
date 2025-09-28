import { useEffect, useState } from "react";

export enum Breakpoint {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

const getBreakpoint = (width: number) => (width < 640 ? Breakpoint.Mobile : width < 1024 ? Breakpoint.Tablet : Breakpoint.Desktop);

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(Breakpoint.Desktop);

  useEffect(() => {
    const updateBreakpoint = () => setBreakpoint(getBreakpoint(window.innerWidth));

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
