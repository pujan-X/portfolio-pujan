"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cardReveal, fadeUp, viewport } from "@/lib/motion";

interface Skill {
  id: number;
  category: string;
  name: string;
  proficiency: number;
}

/* Skill icons as simple mono text/emoji-free icons */
const CATEGORY_ICONS: Record<string, string> = {
  "Languages": "{ }",
  "Frameworks & Libraries": "⟨/⟩",
  "Databases": "⌬",
  "Tools & Platforms": "⊞",
  "Concepts": "◈",
};

function BentoCard({
  category,
  skills,
  index,
}: {
  category: string;
  skills: Skill[];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Special sizing for some cards
  const isWide = category === "Frameworks & Libraries" || category === "Concepts";

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      custom={index}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-card group relative ${isWide ? "md:col-span-2" : ""}`}
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      } as React.CSSProperties}
    >
      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(182,242,74,0.06), transparent 80%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[16px] text-[var(--accent)] select-none" aria-hidden>
          {CATEGORY_ICONS[category] || "◈"}
        </span>
        <h3 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--muted)]">
          {category}
        </h3>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <motion.div
            key={skill.id}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-3 py-1.5 bg-[var(--raised)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[13px] text-[var(--text-main)] cursor-default hover:border-[rgba(182,242,74,0.3)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            {skill.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const FALLBACK_SKILLS: Skill[] = [
  { id: 1, category: "Languages", name: "Java", proficiency: 85 },
  { id: 2, category: "Languages", name: "Python", proficiency: 85 },
  { id: 3, category: "Languages", name: "SQL", proficiency: 85 },
  { id: 4, category: "Languages", name: "HTML5", proficiency: 85 },
  { id: 5, category: "Languages", name: "CSS3", proficiency: 85 },
  { id: 6, category: "Frameworks & Libraries", name: "Spring Boot", proficiency: 85 },
  { id: 7, category: "Frameworks & Libraries", name: "Spring Security", proficiency: 85 },
  { id: 8, category: "Frameworks & Libraries", name: "Spring Data JPA", proficiency: 85 },
  { id: 9, category: "Frameworks & Libraries", name: "REST APIs", proficiency: 85 },
  { id: 10, category: "Databases", name: "MySQL", proficiency: 80 },
  { id: 11, category: "Databases", name: "Aiven Cloud SQL", proficiency: 80 },
  { id: 12, category: "Tools & Platforms", name: "Git", proficiency: 85 },
  { id: 13, category: "Tools & Platforms", name: "GitHub", proficiency: 85 },
  { id: 14, category: "Tools & Platforms", name: "Docker", proficiency: 85 },
  { id: 15, category: "Tools & Platforms", name: "Maven", proficiency: 85 },
  { id: 16, category: "Tools & Platforms", name: "Render", proficiency: 85 },
  { id: 17, category: "Tools & Platforms", name: "Cloud Deployment", proficiency: 85 },
  { id: 18, category: "Concepts", name: "OOP", proficiency: 90 },
  { id: 19, category: "Concepts", name: "Full-Stack Development", proficiency: 90 },
  { id: 20, category: "Concepts", name: "Microservices", proficiency: 90 },
  { id: 21, category: "Concepts", name: "API Integration", proficiency: 90 },
  { id: 22, category: "Concepts", name: "JSON Communication", proficiency: 90 },
  { id: 23, category: "Concepts", name: "AI/ML Integration", proficiency: 90 },
];

const CATEGORIES = ["Languages", "Frameworks & Libraries", "Databases", "Tools & Platforms", "Concepts"];

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${siteConfig.apiUrl}/api/skills`)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(() => setSkills(FALLBACK_SKILLS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="skills" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 md:px-6">
      <motion.span
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        03 / Skills
      </motion.span>

      <div className="overflow-hidden mb-12">
        <motion.h2
          className="section-title"
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Technical Skills
        </motion.h2>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bento-card animate-pulse min-h-[120px]" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const catSkills = skills.filter(s => s.category === cat);
            if (catSkills.length === 0) return null;
            return (
              <BentoCard
                key={cat}
                category={cat}
                skills={catSkills}
                index={idx}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
