"use client";
import { motion, useMotionTemplate } from "framer-motion";
import { useScrollProgress } from "@/hooks/useUtils";
import { useActiveSection } from "@/hooks/useUtils";

const SECTIONS = [
  { id: "hero", label: "01 Hero" },
  { id: "about", label: "02 About" },
  { id: "skills", label: "03 Skills" },
  { id: "projects", label: "04 Projects" },
  { id: "experience", label: "05 Experience" },
  { id: "contact", label: "06 Contact" },
];

export function ScrollProgress() {
  const progress = useScrollProgress();
  const scaleX = progress;

  const activeSection = useActiveSection(SECTIONS.map(s => s.id));

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX, transformOrigin: "left" }}
      />

      {/* Section indicator */}
      <nav
        className="section-indicator"
        aria-label="Section navigation"
        role="navigation"
      >
        {SECTIONS.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`section-indicator-item ${activeSection === section.id ? "active" : ""}`}
            aria-label={section.label}
          >
            <div className="section-indicator-dot" />
            <span className="section-indicator-label">{section.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
