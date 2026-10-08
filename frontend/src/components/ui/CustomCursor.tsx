"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";

export function CustomCursor() {
  const { dotX, dotY, ringX, ringY, isExpanded, label, isVisible } = useCursor();

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{ left: dotX, top: dotY }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        className={`cursor-ring ${isExpanded ? "expanded" : ""}`}
        style={{ left: ringX, top: ringY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isExpanded && (
          <span className="cursor-label">{label}</span>
        )}
      </motion.div>
    </>
  );
}
