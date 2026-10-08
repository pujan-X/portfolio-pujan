"use client";
import { useEffect, useRef } from "react";

interface LenisScrollProps {
  children?: React.ReactNode;
}

export function LenisScroll({ children }: LenisScrollProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;

    let lenis: any;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
          wheelMultiplier: 0.8,
        });

        lenisRef.current = lenis;
        if (typeof window !== "undefined") {
          (window as any).lenis = lenis;
        }

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
      } catch {
        // Lenis not available, fall back to native scroll
      }
    };

    initLenis();

    return () => {
      if (typeof window !== "undefined" && (window as any).lenis === lenisRef.current) {
        (window as any).lenis = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
