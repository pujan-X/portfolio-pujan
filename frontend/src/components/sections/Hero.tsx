"use client";
import { siteConfig } from "@/config/site";
import { motion, useInView, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLiveClock } from "@/hooks/useUtils";
import { useMagnetic } from "@/hooks/useMagnetic";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

/* ===== CODE PANEL ===== */
type CodeLine = {
  num: number;
  content: React.ReactNode;
};

const CODE_LINES: CodeLine[] = [
  { num: 1, content: <><span className="syn-keyword">public class</span> <span className="syn-class">Developer</span> <span className="syn-brace">{"{"}</span></> },
  { num: 2, content: <>&nbsp;&nbsp;<span className="syn-keyword">String</span> <span className="syn-var">name</span> = <span className="syn-string">"Pujan Suthar"</span>;</> },
  { num: 3, content: <>&nbsp;&nbsp;<span className="syn-keyword">String</span> <span className="syn-var">role</span> = <span className="syn-string">"Backend &amp; Full-Stack"</span>;</> },
  { num: 4, content: <>&nbsp;&nbsp;<span className="syn-keyword">String</span> <span className="syn-var">location</span> = <span className="syn-string">"Mumbai, India"</span>;</> },
  { num: 5, content: <>&nbsp;&nbsp;<span className="syn-keyword">String[]</span> <span className="syn-var">stack</span> = <span className="syn-brace">{"{"}</span><span className="syn-string">"Java"</span>, <span className="syn-string">"Spring Boot"</span>, <span className="syn-string">"MySQL"</span><span className="syn-brace">{"}"}</span>;</> },
  { num: 6, content: <>&nbsp;&nbsp;<span className="syn-keyword">boolean</span> <span className="syn-var">openToWork</span> = <span className="syn-bool">true</span>;</> },
  { num: 7, content: <><span className="syn-brace">{"}"}</span></> },
];

function CodePanel() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= CODE_LINES.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="code-panel w-full max-w-[480px]"
      initial={{ opacity: 0, rotate: 2, y: 20 }}
      animate={{ opacity: 1, rotate: 2, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="code-panel-header">
        <div className="code-panel-dot bg-[#ff5f57]" />
        <div className="code-panel-dot bg-[#febc2e]" />
        <div className="code-panel-dot bg-[#28c840]" />
        <div className="code-panel-tab">Developer.java</div>
      </div>

      {/* Body */}
      <div className="code-panel-body min-h-[180px]">
        {CODE_LINES.map((line, idx) => (
          <motion.div
            key={line.num}
            className="code-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: idx < visibleLines ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          >
            <span className="code-line-num">{line.num}</span>
            <span>{line.content}</span>
            {idx === visibleLines - 1 && idx < CODE_LINES.length - 1 && (
              <span className="code-cursor" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ===== MARQUEE STRIP ===== */
const TECH_STACK = [
  "Java", "Spring Boot", "Spring Security", "JPA", "MySQL",
  "Docker", "Python", "Gemini API", "REST APIs", "Maven", "Git"
];

function Marquee() {
  const items = [...TECH_STACK, ...TECH_STACK]; // doubled for seamless loop
  return (
    <div className="marquee-wrapper py-4 border-y border-[rgba(255,255,255,0.06)]">
      <div className="marquee-track">
        {items.concat(items).map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            <span className="font-mono text-[13px] text-[var(--muted)] uppercase tracking-[0.08em] whitespace-nowrap">
              {item}
            </span>
            <span className="text-[var(--accent)] opacity-40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===== CTA BUTTON ===== */
function CTAButton({ href, children, variant = "primary", dataCursor = "View" }: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  dataCursor?: string;
}) {
  const { ref, x, y } = useMagnetic(0.35);

  return (
    <motion.div ref={ref as any} style={{ x, y }} className="inline-block">
      <Link
        href={href}
        data-cursor={dataCursor}
        className={`magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-[13px] font-bold tracking-[0.06em] uppercase transition-all duration-300 ${
          variant === "primary"
            ? "bg-[var(--accent)] text-black hover:shadow-[0_0_24px_rgba(182,242,74,0.4)]"
            : "border border-[rgba(255,255,255,0.1)] text-[var(--muted)] hover:text-[var(--text-main)] hover:border-[rgba(255,255,255,0.2)]"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

/* ===== HERO SECTION ===== */
export function Hero() {
  const [mounted, setMounted] = useState(false);
  const clock = useLiveClock();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const panelY = useTransform(scrollY, [0, 400], [0, -40]);

  useEffect(() => setMounted(true), []);

  const headline1 = "Pujan";
  const headline2 = "Suthar";
  const subline = "I build backend systems";
  const subline2 = "& AI-powered products.";

  return (
    <div id="hero" className="scroll-mt-0">
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center pt-28 pb-0 overflow-hidden"
      >
        {/* Grid columns background hint */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="max-w-[1280px] mx-auto h-full grid grid-cols-12 gap-4 md:gap-6 px-4 md:px-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full border-x border-[rgba(255,255,255,0.02)]" />
            ))}
          </div>
        </div>

        <div className="relative max-w-[1280px] mx-auto w-full px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Headline */}
          <div className="space-y-6 z-10">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-[rgba(255,255,255,0.08)] bg-[var(--raised)] rounded-full"
            >
              <span className="pulse-dot" />
              <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--muted)] uppercase">
                Open to internships
              </span>
            </motion.div>

            {/* Big headline */}
            <div aria-label={`${headline1} ${headline2}`}>
              <div className="line-reveal-wrapper">
                <motion.h1
                  className="text-[clamp(2.7rem,12vw,8.5rem)] font-bold tracking-[-0.03em] leading-[0.95] text-[var(--text-main)]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {headline1}
                </motion.h1>
              </div>
              <div className="line-reveal-wrapper">
                <motion.span
                  className="block text-[clamp(2.7rem,12vw,8.5rem)] font-bold tracking-[-0.03em] leading-[0.95] text-[var(--accent)]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  {headline2}
                </motion.span>
              </div>
            </div>

            {/* Subheadline */}
            <div className="space-y-0">
              <div className="line-reveal-wrapper">
                <motion.p
                  className="text-[clamp(1.1rem,2.5vw,1.6rem)] text-[var(--muted)] font-light tracking-[-0.01em]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
                >
                  {subline}
                </motion.p>
              </div>
              <div className="line-reveal-wrapper">
                <motion.p
                  className="text-[clamp(1.1rem,2.5vw,1.6rem)] text-[var(--text-main)] font-light tracking-[-0.01em]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
                >
                  {subline2}
                </motion.p>
              </div>
            </div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              <CTAButton href="/#projects" dataCursor="View">View Projects</CTAButton>
              <CTAButton href="/#contact" variant="secondary" dataCursor="Open">Contact Me</CTAButton>
            </motion.div>

            {/* Meta row */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-4 text-[var(--muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <div className="font-mono text-[12px] tracking-[0.06em] flex items-center gap-1.5">
                <span className="text-[var(--accent)]">◎</span>
                Mumbai, India
              </div>
              {mounted && (
                <div className="font-mono text-[12px] tracking-[0.06em]">
                  {clock} IST
                </div>
              )}
              <div className="flex items-center gap-2 font-mono text-[12px] text-[var(--muted)] ml-auto">
                <span>Scroll</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right: Code panel with parallax */}
          <motion.div
            className="hidden lg:flex justify-end items-center"
            style={{ y: panelY }}
          >
            <CodePanel />
          </motion.div>
        </div>
      </section>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Marquee />
      </motion.div>
    </div>
  );
}
