"use client";
import { siteConfig } from "@/config/site";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Target, Book, Code, ExternalLink } from "lucide-react";
import { fadeUp, cardReveal, viewport } from "@/lib/motion";

/* ===== ANIMATED COUNTER ===== */
function AnimatedCounter({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(t => step(t, startTime));
      else setCount(end);
    };
    requestAnimationFrame(t => step(t, t));
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.03em] text-[var(--text-main)] leading-none">
        {count}
        <span className="text-[var(--accent)]">+</span>
      </div>
      <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)]">
        {label}
      </div>
    </div>
  );
}

/* ===== INFO CARD ===== */
function InfoCard({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      custom={delay}
      className="bento-card group"
    >
      <Icon className="w-4 h-4 text-[var(--accent)] mb-3" />
      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--muted)] mb-1">
        {label}
      </div>
      <div className="text-[var(--text-main)] text-sm font-medium leading-snug">
        {value}
      </div>
    </motion.div>
  );
}

/* ===== SCROLL-BRIGHTENING BIO TEXT ===== */
function BioText({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <p className="text-[17px] leading-[1.75] max-w-[56ch]" aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ color: "var(--muted)" }}
          whileInView={{ color: "var(--text-main)" }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{
            duration: 0.4,
            delay: i * 0.012,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24 max-w-[1280px] mx-auto px-6">
      {/* Section label */}
      <motion.span
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        02 / About
      </motion.span>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left: Bio text with scroll reveal */}
        <div className="space-y-8">
          <div className="overflow-hidden">
            <motion.h2
              className="section-title mb-8"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              About Me
            </motion.h2>
          </div>

          <BioText text={siteConfig.bio} />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={2}
            className="flex items-center gap-6 pt-4"
          >
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] uppercase text-[var(--accent)] hover:opacity-75 transition-opacity"
            >
              Download Resume
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-8 pt-8 border-t border-[rgba(255,255,255,0.06)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={3}
          >
            <AnimatedCounter end={3} label="Live projects" />
            <AnimatedCounter end={3} label="Certifications" />
          </motion.div>
        </div>

        {/* Right: Info cards */}
        <div className="grid grid-cols-2 gap-4">
          <InfoCard icon={MapPin} label="Location" value={siteConfig.location} delay={0} />
          <InfoCard icon={Target} label="Focus" value={siteConfig.stats.focus} delay={1} />
          <InfoCard icon={Book} label="Education" value={siteConfig.stats.education} delay={2} />
          <InfoCard icon={Code} label="Core Stack" value={siteConfig.stats.coreStack} delay={3} />
        </div>
      </div>
    </section>
  );
}
