"use client";
import { useEffect, useState, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export function useTextScramble(text: string) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<NodeJS.Timeout | null>(null);
  const iterRef = useRef(0);

  const scramble = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    iterRef.current = 0;
    const totalFrames = text.length * 3;

    const update = () => {
      const progress = iterRef.current / totalFrames;
      const resolvedChars = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolvedChars) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
      iterRef.current++;

      if (iterRef.current <= totalFrames) {
        frameRef.current = setTimeout(update, 30);
      } else {
        setDisplayText(text);
      }
    };

    if (frameRef.current) clearTimeout(frameRef.current);
    update();
  };

  const reset = () => {
    if (frameRef.current) clearTimeout(frameRef.current);
    setDisplayText(text);
  };

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text]);

  return { displayText, scramble, reset };
}

export function useScrollProgress() {
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [progress]);

  return progress;
}

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, [sectionIds]);

  return activeSection;
}

export function useLiveClock(timezone = "Asia/Kolkata") {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: timezone,
        }).format(new Date())
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return time;
}
