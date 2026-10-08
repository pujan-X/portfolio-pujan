"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { siteConfig, experiences, type ExperienceItem } from "@/config/site";
import { fadeUp, viewport } from "@/lib/motion";

function TimelineNodeItem({
  nodeRef,
  isReached,
}: {
  nodeRef: React.RefObject<HTMLDivElement | null>;
  isReached: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      ref={nodeRef}
      className="absolute left-0 top-6 w-3 h-3 -translate-x-[5.25px] flex items-center justify-center z-10"
      aria-hidden="true"
    >
      <motion.div
        className="w-3 h-3 rounded-full border-2 transition-colors duration-300"
        animate={
          isReached
            ? {
                backgroundColor: "var(--accent)",
                borderColor: "var(--accent)",
                scale: shouldReduceMotion ? 1 : [1, 1.35, 1],
                boxShadow: "0 0 10px rgba(182, 242, 74, 0.6)",
              }
            : {
                backgroundColor: "var(--background)",
                borderColor: "rgba(255, 255, 255, 0.25)",
                scale: 1,
                boxShadow: "none",
              }
        }
        transition={{
          duration: shouldReduceMotion ? 0.01 : 0.35,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

function ExperienceEntry({
  exp,
  index,
  firstNodeRef,
  lastNodeRef,
  isFirst,
  isLast,
}: {
  exp: ExperienceItem;
  index: number;
  firstNodeRef: React.RefObject<HTMLDivElement | null>;
  lastNodeRef: React.RefObject<HTMLDivElement | null>;
  isFirst: boolean;
  isLast: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const nodeRef = isFirst ? firstNodeRef : isLast ? lastNodeRef : useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-10% 0px -20% 0px" });
  const shouldReduceMotion = useReducedMotion();

  const [reached, setReached] = useState(false);
  useEffect(() => {
    if (isInView) setReached(true);
  }, [isInView]);

  return (
    <motion.div
      ref={itemRef}
      className="relative pl-6 sm:pl-9 pb-10 sm:pb-14 last:pb-0"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Timeline Node */}
      <TimelineNodeItem nodeRef={nodeRef} isReached={reached} />

      {/* LinkedIn-inspired Experience Card */}
      <div className="flex flex-col sm:flex-row items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-colors duration-300">
        {/* 40px rounded-square monogram tile */}
        <div className="w-10 h-10 min-w-10 min-h-10 rounded-xl bg-[var(--raised)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center font-mono font-bold text-[13px] text-[var(--accent)] shrink-0 select-none shadow-sm">
          {exp.initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Tag & Date row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <span className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--accent)]">
              {exp.type}
            </span>
            <span className="text-[rgba(255,255,255,0.15)] text-xs select-none">•</span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#A1A1AA]">
              {exp.duration}
            </span>
            {exp.location && (
              <>
                <span className="text-[rgba(255,255,255,0.15)] text-xs select-none">•</span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--muted)]">
                  {exp.location}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-main)] leading-snug">
            {exp.role}
          </h3>

          {/* Company · Type */}
          <div className="text-[14px] text-[var(--muted)] mt-0.5">
            {exp.company}
          </div>

          {/* Bullets */}
          {exp.bullets && exp.bullets.length > 0 && (
            <ul className="mt-3.5 space-y-2 text-[15px] sm:text-[16px] text-[#A1A1AA] leading-[1.6] max-w-[65ch]">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[var(--accent)] mt-1.5 text-xs select-none shrink-0">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Description paragraph if no bullets */}
          {!exp.bullets && exp.description && (
            <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#A1A1AA] leading-[1.6] max-w-[65ch]">
              {exp.description}
            </p>
          )}

          {/* Skill chips */}
          {exp.skills && exp.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-[rgba(255,255,255,0.1)] bg-[var(--raised)] text-[var(--text-main)] hover:border-[rgba(182,242,74,0.3)] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const [exps, setExps] = useState<ExperienceItem[]>(experiences);
  const containerRef = useRef<HTMLDivElement>(null!);
  const firstNodeRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [trackTop, setTrackTop] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);

  useEffect(() => {
    fetch(`${siteConfig.apiUrl}/api/experience`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = data.map((apiItem, i) => {
            const fallback =
              experiences.find(
                (e) =>
                  e.role.toLowerCase() === apiItem.role?.toLowerCase() ||
                  e.id === apiItem.id
              ) || experiences[i] || experiences[0];
            return {
              ...fallback,
              ...apiItem,
              type: fallback.type,
              initials: fallback.initials,
              location: fallback.location,
              skills: fallback.skills,
              bullets:
                fallback.bullets ||
                (apiItem.description?.includes("•")
                  ? apiItem.description
                      .split("\n")
                      .map((b: string) => b.replace(/^[•\s*-]+/, "").trim())
                      .filter(Boolean)
                  : undefined),
            };
          });
          setExps(merged);
        }
      })
      .catch(() => {
        setExps(experiences);
      });
  }, []);

  // Compute exact line start and end between the first and last node
  useEffect(() => {
    const measureTrack = () => {
      if (firstNodeRef.current && lastNodeRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const firstRect = firstNodeRef.current.getBoundingClientRect();
        const lastRect = lastNodeRef.current.getBoundingClientRect();

        const top = firstRect.top + firstRect.height / 2 - containerRect.top;
        const height = lastRect.top + lastRect.height / 2 - (firstRect.top + firstRect.height / 2);

        setTrackTop(top);
        setTrackHeight(Math.max(0, height));
      }
    };

    measureTrack();
    window.addEventListener("resize", measureTrack);
    const ro = new ResizeObserver(measureTrack);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", measureTrack);
      ro.disconnect();
    };
  }, [exps]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 55%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 md:px-6">
      <motion.span
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        05 / Experience
      </motion.span>

      <div className="overflow-hidden mb-12">
        <motion.h2
          className="section-title"
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Experience &amp; Education
        </motion.h2>
      </div>

      <div ref={containerRef} className="relative ml-1 sm:ml-4">
        {/* Background inactive line segment starting at first node and ending at last node */}
        {trackHeight > 0 && (
          <div
            className="absolute w-[1.5px] bg-[rgba(255,255,255,0.08)] pointer-events-none"
            style={{
              left: "0px",
              top: `${trackTop}px`,
              height: `${trackHeight}px`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Continuous scroll-linked animated lime line finishing exactly at the last node */}
        {trackHeight > 0 && (
          <motion.div
            className="absolute w-[1.5px] bg-[var(--accent)] shadow-[0_0_8px_rgba(182,242,74,0.5)] origin-top pointer-events-none"
            style={{
              left: "0px",
              top: `${trackTop}px`,
              height: `${trackHeight}px`,
              scaleY: shouldReduceMotion ? 1 : scaleY,
            }}
            aria-hidden="true"
          />
        )}

        {/* Experience Entries */}
        {exps.map((exp, i) => (
          <ExperienceEntry
            key={exp.id || i}
            exp={exp}
            index={i}
            firstNodeRef={firstNodeRef}
            lastNodeRef={lastNodeRef}
            isFirst={i === 0}
            isLast={i === exps.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
