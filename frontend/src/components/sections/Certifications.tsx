"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Award } from "lucide-react";
import { cardReveal, fadeUp, viewport } from "@/lib/motion";

interface Cert {
  id: number;
  name: string;
  issuer: string;
}

const FALLBACK_CERTS: Cert[] = [
  { id: 1, name: "Claude 101", issuer: "Anthropic" },
  { id: 2, name: "Claude Code in Action", issuer: "Anthropic" },
  { id: 3, name: "Git Training Completion", issuer: "EduPyramids, SINE, IIT Bombay" },
];

export function Certifications() {
  const [certs, setCerts] = useState<Cert[]>([]);

  useEffect(() => {
    fetch(`${siteConfig.apiUrl}/api/certifications`)
      .then(res => res.json())
      .then(data => setCerts(data))
      .catch(() => setCerts(FALLBACK_CERTS));
  }, []);

  if (certs.length === 0) return null;

  return (
    <section id="certifications" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 md:px-6">
      <motion.span
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        Certifications
      </motion.span>

      <div className="overflow-hidden mb-8">
        <motion.h2
          className="section-title"
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Certifications
        </motion.h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={i}
            className="bento-card flex items-start gap-4"
          >
            <div className="p-2.5 bg-[var(--raised)] rounded-lg shrink-0 border border-[rgba(255,255,255,0.06)]">
              <Award className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div>
              <div className="font-semibold text-[14px] text-[var(--text-main)] mb-1 leading-snug">
                {cert.name}
              </div>
              <div className="font-mono text-[11px] text-[var(--muted)] tracking-[0.04em]">
                {cert.issuer}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
