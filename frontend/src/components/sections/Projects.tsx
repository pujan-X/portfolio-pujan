"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import Link from "next/link";
import { fadeUp, viewport } from "@/lib/motion";

interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
}

const FALLBACK_PROJECTS: Project[] = [
  { id: 1, slug: "nexus-ai", title: "Nexus.AI: Smart Library Management System", summary: "Full-stack library management system with role-based access and AI-driven catalog insights.", tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "Docker", "Gemini API"], repoUrl: "https://github.com/pujan-X/smart-library-app", liveUrl: "https://nexus-ai-lms.onrender.com", featured: true },
  { id: 2, slug: "edupredict-ai", title: "EduPredict: AI-Powered Academic Dashboard", summary: "Academic analytics platform that flags at-risk students from performance data.", tags: ["Java", "Spring Boot", "Python", "ML", "REST API", "Docker"], repoUrl: "https://github.com/pujan-X/edupredict-ai", liveUrl: "https://edupredict-ai-swd1.onrender.com", featured: true },
  { id: 3, slug: "ai-code-mentor", title: "AI Code Mentor: Code Analysis Platform", summary: "AI developer assistant for contextual code analysis and optimization.", tags: ["Java", "Spring Boot", "Microservices", "Gemini API", "Algorithms"], repoUrl: "https://github.com/pujan-X/AI-Code-Mentor", liveUrl: "https://ai-code-mentor.netlify.app", featured: true },
  { id: 4, slug: "java-cli-library-manager", title: "Java CLI Library Manager", summary: "Command-line library management system demonstrating OOP and data structures.", tags: ["Java", "CLI", "OOP"], repoUrl: "https://github.com/pujan-X/java-cli-library-manager", liveUrl: "", featured: false },
  { id: 5, slug: "dosha-advisor", title: "Dosha Advisor", summary: "Ayurvedic wellness tool built with TypeScript and React.", tags: ["TypeScript", "React", "Node"], repoUrl: "https://github.com/pujan-X/dosha-advisor", liveUrl: "", featured: false },
  { id: 6, slug: "ai-orchestron", title: "AI Orchestron Selection Engine", summary: "AI model orchestration and selection engine.", tags: ["Python", "AI"], repoUrl: "https://github.com/pujan-X/ai-orchestron", liveUrl: "", featured: false },
];

/* ===== HOVER IMAGE FOLLOWER ===== */
function ProjectPreviewFollower({ isVisible, imgSrc }: { isVisible: boolean; imgSrc: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 22 });
  const springY = useSpring(y, { stiffness: 200, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX + 24);
      y.set(e.clientY - 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[500] overflow-hidden rounded-lg shadow-2xl"
          style={{ left: springX, top: springY, width: 240, height: 150 }}
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full h-full bg-[var(--raised)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="text-center">
              <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--accent)] mb-1">Preview</div>
              <div className="font-mono text-[11px] text-[var(--muted)] px-4 text-center leading-snug">{imgSrc}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===== PROJECT ROW ===== */
function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      <ProjectPreviewFollower isVisible={hovered} imgSrc={project.title} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group border-t border-[rgba(255,255,255,0.06)] py-7 grid grid-cols-[56px_1fr_auto] md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-start cursor-pointer hover:bg-[rgba(255,255,255,0.015)] transition-colors rounded-lg px-2 -mx-2"
      >
        {/* Number */}
        <div className="font-mono text-[13px] text-[var(--muted)] pt-1 tracking-widest">
          {num}
        </div>

        {/* Main content */}
        <div className="space-y-3">
          <div className="flex items-start gap-4">
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="View"
              className="text-[18px] md:text-[22px] font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-all duration-300 leading-snug group-hover:translate-x-3 inline-block"
              style={{ transition: "transform 0.3s ease, color 0.3s ease" }}
            >
              {project.title}
            </Link>
          </div>
          <p className="text-[var(--muted)] text-[14px] leading-relaxed max-w-[55ch]">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span
                key={t}
                className="font-mono text-[11px] text-[var(--secondary-accent)] bg-[rgba(92,200,255,0.08)] px-2 py-0.5 rounded border border-[rgba(92,200,255,0.12)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 items-end pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[rgba(182,242,74,0.08)] text-[var(--accent)] border border-[rgba(182,242,74,0.2)] rounded-full text-[11px] font-mono hover:bg-[rgba(182,242,74,0.15)] transition-colors"
            >
              <span className="pulse-dot scale-75" />
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              onClick={e => e.stopPropagation()}
              className="text-[var(--muted)] hover:text-[var(--text-main)] transition-colors"
              aria-label="GitHub repository"
            >
              <motion.div
                animate={hovered ? { rotate: 45 } : { rotate: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </a>
          )}
        </div>
      </motion.div>
    </>
  );
}

/* ===== OTHER PROJECT LINK ===== */
function OtherProject({ project }: { project: Project }) {
  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
      data-cursor="Open"
      className="group flex items-center justify-between py-4 border-t border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.015)] px-2 -mx-2 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-[var(--muted)] tracking-widest">
          {String(project.id - 3).padStart(2, "0")}
        </span>
        <span className="text-[var(--text-main)] text-[15px] font-medium group-hover:text-[var(--accent)] transition-colors underline-draw">
          {project.title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-wrap justify-end">
          {project.tags.slice(0, 2).map(t => (
            <span key={t} className="font-mono text-[10px] text-[var(--muted)]">{t}</span>
          ))}
        </div>
        <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
      </div>
    </a>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${siteConfig.apiUrl}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects(FALLBACK_PROJECTS));
  }, []);

  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 md:px-6">
      <motion.span
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        04 / Projects
      </motion.span>

      <div className="flex items-end gap-6 mb-12">
        <div className="overflow-hidden">
          <motion.h2
            className="section-title"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Selected Work
          </motion.h2>
        </div>
        <motion.div
          className="h-px flex-1 bg-[rgba(255,255,255,0.06)] mb-3"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Featured project rows */}
      <div>
        {featured.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
        {/* Close the last border */}
        <div className="border-t border-[rgba(255,255,255,0.06)]" />
      </div>

      {/* Others */}
      {others.length > 0 && (
        <div className="mt-16">
          <motion.h3
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--muted)] mb-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            More on GitHub
          </motion.h3>
          {others.map(project => (
            <OtherProject key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
