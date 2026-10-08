"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSpring, useMotionValue } from "framer-motion";

type CursorLabel = "View" | "Open" | "Copy" | "Drag" | "";

export function useCursor() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.5 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [label, setLabel] = useState<CursorLabel>("");
  const [isVisible, setIsVisible] = useState(false);

  const rawRingX = useRef(0);
  const rawRingY = useRef(0);

  const updatePosition = useCallback((e: MouseEvent) => {
    dotX.set(e.clientX);
    dotY.set(e.clientY);
    rawRingX.current = e.clientX;
    rawRingY.current = e.clientY;
    ringX.set(e.clientX);
    ringY.set(e.clientY);
    setIsVisible(true);
  }, [dotX, dotY, ringX, ringY]);

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    const handleHover = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const cursorLabel = target.dataset.cursor as CursorLabel || "View";
      setIsExpanded(true);
      setLabel(cursorLabel);
    };

    const handleUnhover = () => {
      setIsExpanded(false);
      setLabel("");
    };

    // Attach to interactive elements
    const selector = "a, button, [data-cursor], [role='button']";
    const attachCursorListeners = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach(el => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleUnhover);
      });
    };

    attachCursorListeners();

    // Re-attach on DOM mutations
    const observer = new MutationObserver(attachCursorListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.querySelectorAll<HTMLElement>(selector).forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
      observer.disconnect();
    };
  }, [updatePosition]);

  return { dotX, dotY, ringX, ringY, isExpanded, label, isVisible };
}
