import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import { ExternalLink, GitBranch, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

interface ProjectDetail {
  title: string;
  summary: string;
  description?: string;
  tags?: string[];
  repoUrl?: string;
  liveUrl?: string;
}

async function getProject(slug: string): Promise<ProjectDetail | null> {
  try {
    const res = await fetch(`${siteConfig.apiUrl}/api/projects/${slug}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Not found");
    return res.json();
  } catch {
    // Offline fallback
    const mocks: Record<string, ProjectDetail> = {
      "nexus-ai": {
        title: "Nexus.AI: Smart Library Management System",
        summary: "Full-stack library management system with role-based access and AI-driven catalog insights.",
        description:
          "Role-based access control with Spring Security, separating admin and student permissions for inventory and borrowing\n\nReal-time dashboard tracking total books, active borrows, overdue items, and new member registrations\n\nResponsive, mobile-optimized interface for catalog browsing and borrowing\n\nGoogle Gemini API integration for AI-driven catalog insights\n\nDockerized and deployed on Render with an Aiven-hosted MySQL database",
        tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "Docker", "Gemini API"],
        repoUrl: "https://github.com/pujan-X/smart-library-app",
        liveUrl: "https://nexus-ai-lms.onrender.com",
      },
      "edupredict-ai": {
        title: "EduPredict: AI-Powered Student Academic Performance Dashboard",
        summary: "Academic analytics platform that flags at-risk students from performance data.",
        description:
          "Spring Boot backend integrated with a Python-based ML service\n\nREST APIs with JSON communication between backend and ML service for real-time predictions on the dashboard\n\nContainerized with Docker and deployed to the cloud for a reproducible environment",
        tags: ["Java", "Spring Boot", "Python", "ML", "REST API", "Docker"],
        repoUrl: "https://github.com/pujan-X/edupredict-ai",
        liveUrl: "https://edupredict-ai-swd1.onrender.com",
      },
      "ai-code-mentor": {
        title: "AI Code Mentor: Intelligent AI-Driven Code Analysis Platform",
        summary: "AI developer assistant for contextual code analysis and optimization.",
        description:
          "Spring Boot microservices integrated with the Google Gemini API\n\nInteractive debugging support, code explanations, and optimization suggestions\n\nAutomated Big-O time and space complexity analysis",
        tags: ["Java", "Spring Boot", "Microservices", "Gemini API", "Algorithms"],
        repoUrl: "https://github.com/pujan-X/AI-Code-Mentor",
        liveUrl: "https://ai-code-mentor.netlify.app",
      },
    };
    return mocks[slug] ?? null;
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const highlights = project.description
    ?.split("\n\n")
    .filter(t => t.trim() !== "") ?? [];

  return (
    <div className="max-w-[1280px] mx-auto px-6 pt-32 pb-24">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-12"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to projects
      </Link>

      <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
        {/* Main content */}
        <div>
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[rgba(182,242,74,0.08)] text-[var(--accent)] border border-[rgba(182,242,74,0.2)] rounded-full font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse inline-block" />
                  Live
                </span>
              )}
            </div>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-tight text-[var(--text-main)] mb-4">
              {project.title}
            </h1>
            <p className="text-[18px] text-[var(--muted)] leading-relaxed max-w-[55ch]">
              {project.summary}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-[rgba(255,255,255,0.06)]">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--raised)] border border-[rgba(255,255,255,0.08)] rounded-xl font-mono text-[13px] text-[var(--text-main)] hover:border-[rgba(255,255,255,0.2)] transition-colors"
              >
                <GitBranch className="w-4 h-4 text-[var(--accent)]" />
                View Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-black rounded-xl font-mono text-[13px] font-bold hover:shadow-[0_0_20px_rgba(182,242,74,0.35)] transition-shadow"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>

          {/* Overview */}
          <div className="mb-10">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--accent)] mb-4">
              Overview
            </div>
            <p className="text-[var(--muted)] text-[16px] leading-relaxed">{project.summary}</p>
          </div>

          {/* Key Features */}
          {highlights.length > 0 && (
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--secondary-accent)] mb-6">
                Key Features
              </div>
              <ul className="space-y-4">
                {highlights.map((h, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[var(--muted)] text-[15px] leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-32 space-y-8">
          {/* Tech stack */}
          <div className="bento-card">
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] mb-4">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map(t => (
                <span
                  key={t}
                  className="font-mono text-[12px] text-[var(--secondary-accent)] bg-[rgba(92,200,255,0.08)] px-2.5 py-1 rounded-lg border border-[rgba(92,200,255,0.12)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bento-card space-y-3">
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] mb-4">
              Links
            </div>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-[14px] text-[var(--text-main)] hover:text-[var(--accent)] transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5 text-[var(--accent)]" />
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-[14px] text-[var(--text-main)] hover:text-[var(--accent)] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" />
                Live Demo
              </a>
            )}
          </div>

          {/* Back to projects CTA */}
          <Link
            href="/#projects"
            className="block bento-card text-center group hover:border-[rgba(182,242,74,0.25)] transition-colors"
          >
            <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--muted)] mb-1 group-hover:text-[var(--accent)] transition-colors">
              ← All Projects
            </div>
            <div className="text-[13px] text-[var(--text-main)]">Back to portfolio</div>
          </Link>
        </aside>
      </div>
    </div>
  );
}
