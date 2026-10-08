"use client";
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";
import { GitBranch, Users, Star, ExternalLink } from "lucide-react";
import { fadeUp, cardReveal, viewport } from "@/lib/motion";
import { useRef } from "react";

/* ===== ANIMATED STAT COUNTER ===== */
function StatCounter({ value, label, icon: Icon }: {
  value: number | null;
  label: string;
  icon: React.ElementType;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || value === null) return;
    let start = 0;
    const duration = 1000;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(t => step(t, startTime));
      else setCount(value);
    };
    requestAnimationFrame(t => step(t, t));
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="bento-card flex items-center gap-5"
    >
      <div className="p-3 bg-[var(--raised)] rounded-lg border border-[rgba(255,255,255,0.06)]">
        <Icon className="w-5 h-5 text-[var(--accent)]" />
      </div>
      <div>
        <div className="text-[2rem] font-bold tracking-[-0.03em] text-[var(--text-main)] leading-none">
          {value !== null ? count : "—"}
        </div>
        <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--muted)] mt-1">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* ===== LANGUAGE BAR ===== */
function LanguageBar({ languages }: { languages: string[] }) {
  const colors = [
    "var(--accent)",
    "var(--secondary-accent)",
    "#ff9580",
    "#d4a6ff",
    "#6ee7b7",
  ];

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="bento-card"
    >
      <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-4">
        Top Languages
      </div>
      <div className="flex gap-2 mb-4 overflow-hidden rounded-full h-2">
        {languages.map((_, i) => (
          <motion.div
            key={i}
            className="h-full rounded-full flex-1"
            style={{ background: colors[i % colors.length] }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang, i) => (
          <div key={lang} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors[i % colors.length] }}
            />
            <span className="font-mono text-[12px] text-[var(--muted)]">{lang}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function GithubActivity() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${siteConfig.apiUrl}/api/github/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => { /* silently fallback — no invented data */ });
  }, []);

  if (!stats) return null;

  return (
    <section className="scroll-mt-24 max-w-[1280px] mx-auto px-6">
      <motion.span
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        GitHub
      </motion.span>

      <div className="flex items-end gap-6 mb-10">
        <div className="overflow-hidden">
          <motion.h2
            className="section-title"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            GitHub Activity
          </motion.h2>
        </div>
        <motion.a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="Open"
          className="mb-3 font-mono text-[12px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          @{siteConfig.githubUsername}
          <ExternalLink className="w-3 h-3" />
        </motion.a>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <StatCounter
          value={stats.publicRepos}
          label="Public Repos"
          icon={GitBranch}
        />
        <StatCounter
          value={stats.followers}
          label="Followers"
          icon={Users}
        />
        {stats.topLanguages && (
          <LanguageBar languages={stats.topLanguages} />
        )}
      </div>
    </section>
  );
}
