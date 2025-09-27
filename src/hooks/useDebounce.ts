"use client";

import { useState, useEffect } from "react";

export function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  useEffect(() => {
    if (debouncedValue === value) return;
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);
  useEffect(() => {
    setDebouncedValue(value);
  }, []);

  return debouncedValue;
}
