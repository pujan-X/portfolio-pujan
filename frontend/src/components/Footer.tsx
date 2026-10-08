"use client";
import { siteConfig } from "@/config/site";
import { Mail, GitBranch } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/icons";
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

function Wordmark({ footerRef }: { footerRef: React.RefObject<HTMLElement | null> }) {
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const clipRight = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const motionClipPath = useMotionTemplate`inset(0 ${clipRight} 0 0)`;
  const activeClipPath = shouldReduceMotion ? "inset(0 0% 0 0)" : motionClipPath;

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* 1. Base Outline Layer: 1.5px stroke, lime at ~40% opacity, transparent fill */}
      <div className="w-full">
        {/* Desktop Wordmark (PUJAN SUTHAR) */}
        <svg
          viewBox="0 0 1000 115"
          className="w-full h-auto block hidden md:block"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="800"
            letterSpacing="-0.04em"
            fontSize="106"
            fill="transparent"
            stroke="rgba(182, 242, 74, 0.4)"
            strokeWidth="1.5"
          >
            PUJAN SUTHAR
          </text>
        </svg>

        {/* Mobile Wordmark (PUJAN) */}
        <svg
          viewBox="0 0 450 115"
          className="w-full h-auto block block md:hidden"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="800"
            letterSpacing="-0.04em"
            fontSize="115"
            fill="transparent"
            stroke="rgba(182, 242, 74, 0.4)"
            strokeWidth="1.5"
          >
            PUJAN
          </text>
        </svg>
      </div>

      {/* 2. Scroll-Linked Fill Layer: Lime fill filling left to right */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ clipPath: activeClipPath }}
        aria-hidden="true"
      >
        {/* Desktop Wordmark Filled */}
        <svg
          viewBox="0 0 1000 115"
          className="w-full h-auto block hidden md:block"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="800"
            letterSpacing="-0.04em"
            fontSize="106"
            fill="var(--accent)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          >
            PUJAN SUTHAR
          </text>
        </svg>

        {/* Mobile Wordmark Filled */}
        <svg
          viewBox="0 0 450 115"
          className="w-full h-auto block block md:hidden"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="800"
            letterSpacing="-0.04em"
            fontSize="115"
            fill="var(--accent)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          >
            PUJAN
          </text>
        </svg>
      </motion.div>

      {/* Faint 1px lime baseline glow under the letters */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(182,242,74,0.35)] to-transparent mt-6 shadow-[0_0_8px_rgba(182,242,74,0.3)]" />
    </div>
  );
}

function BackToTop() {
  const { ref, x, y } = useMagnetic(0.25);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <motion.button
      ref={ref as any}
      style={{ x, y }}
      onClick={scrollToTop}
      className="magnetic-btn min-h-[44px] px-2 py-1 font-mono text-[12px] tracking-[0.08em] uppercase text-[#A1A1AA] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:text-[var(--accent)] cursor-pointer select-none"
      aria-label="Back to top"
      title="Back to top"
    >
      <span>↑ BACK TO TOP</span>
    </motion.button>
  );
}

function useMumbaiTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date());
        setTime(formatted);
      } catch {
        const d = new Date();
        const utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const ist = new Date(utc + 3600000 * 5.5);
        let hours = ist.getHours();
        const minutes = ist.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
        setTime(strTime);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const mumbaiTime = useMumbaiTime();

  return (
    <footer
      ref={footerRef}
      className="mt-32 border-t border-[rgba(255,255,255,0.06)] bg-[var(--surface)]"
    >
      {/* Wordmark Container (80-120px above, at least 32px below) */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-24 pb-10">
        <Wordmark footerRef={footerRef} />
      </div>

      {/* IDE Status Bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)] bg-[var(--raised)]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Desktop single row (>= 1024px) */}
          <div className="hidden lg:flex items-center justify-between gap-4 h-12">
            {/* Left */}
            <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[#A1A1AA]">
              <div className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>main</span>
              </div>
              <span className="text-[rgba(255,255,255,0.15)] select-none">|</span>
              <span>Built with Next.js &amp; Spring Boot</span>
            </div>

            {/* Center */}
            <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-[#A1A1AA]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)] shadow-[0_0_8px_rgba(182,242,74,0.8)]" />
              </span>
              <span>OPEN TO INTERNSHIPS</span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[#A1A1AA]">
              <span>{mumbaiTime ? `${mumbaiTime} IST` : "10:30 AM IST"}</span>
              <span className="text-[rgba(255,255,255,0.15)] select-none">|</span>
              <div className="flex items-center gap-1">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A1A1AA] hover:text-[var(--accent)] transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A1A1AA] hover:text-[var(--accent)] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:pujansuthar345@gmail.com"
                  aria-label="Email"
                  title="Email"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A1A1AA] hover:text-[var(--accent)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <span className="text-[rgba(255,255,255,0.15)] select-none">|</span>
              <BackToTop />
            </div>
          </div>

          {/* Mobile two-row layout (< 1024px) */}
          <div className="flex flex-col lg:hidden py-2 text-[12px]">
            {/* Info row */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2 border-b border-[rgba(255,255,255,0.06)] font-mono uppercase tracking-[0.08em] text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>main</span>
                <span className="text-[rgba(255,255,255,0.15)] select-none">|</span>
                <span>Next.js &amp; Spring Boot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)] shadow-[0_0_8px_rgba(182,242,74,0.8)]" />
                </span>
                <span>OPEN TO INTERNSHIPS</span>
              </div>
            </div>

            {/* Actions row with >= 44px tap targets */}
            <div className="flex items-center justify-between gap-2 py-1 font-mono uppercase tracking-[0.08em] text-[#A1A1AA]">
              <div className="flex items-center">
                <span>{mumbaiTime ? `${mumbaiTime} IST` : "10:30 AM IST"}</span>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A1A1AA] hover:text-[var(--accent)] transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A1A1AA] hover:text-[var(--accent)] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:pujansuthar345@gmail.com"
                  aria-label="Email"
                  title="Email"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A1A1AA] hover:text-[var(--accent)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <BackToTop />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
