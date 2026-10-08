"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Menu } from "lucide-react";
import { useTextScramble } from "@/hooks/useUtils";
import { useMagnetic } from "@/hooks/useMagnetic";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const { displayText, scramble, reset } = useTextScramble(label.toLowerCase());

  return (
    <Link
      href={href}
      className="text-[var(--muted)] hover:text-[var(--text-main)] transition-colors font-mono text-[13px] tracking-widest uppercase"
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {displayText}
    </Link>
  );
}

function ResumeButton() {
  const { ref, x, y } = useMagnetic(0.4);

  return (
    <motion.a
      ref={ref as any}
      href={siteConfig.resumeUrl}
      target="_blank"
      rel="noreferrer"
      style={{ x, y }}
      data-cursor="Open"
      className="magnetic-btn text-[11px] font-mono font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-[var(--accent)] text-black rounded-full hover:shadow-[0_0_20px_rgba(182,242,74,0.35)] transition-shadow"
    >
      Resume
    </motion.a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScrollY.current && y > 100);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip to content */}
      <a href="#hero" className="skip-to-content">Skip to content</a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-[200] flex justify-center pt-5 px-4 md:px-6"
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`navbar-pill flex items-center gap-4 md:gap-8 px-4 md:px-6 py-3 transition-all duration-300 ${
            scrolled ? "shadow-[0_8px_40px_rgba(0,0,0,0.5)]" : ""
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-mono font-bold text-[15px] text-[var(--text-main)] hover:text-[var(--accent)] transition-colors shrink-0"
          >
            <Terminal className="h-4 w-4 text-[var(--accent)]" />
            <span>PS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-[var(--raised)] border border-[rgba(255,255,255,0.06)] rounded text-[10px] font-mono text-[var(--muted)] cursor-pointer select-none"
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
                document.dispatchEvent(event);
              }}
            >
              <span>⌘K</span>
            </div>
            <ResumeButton />
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-[var(--muted)] hover:text-[var(--text-main)] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[190] bg-[var(--background)] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-4xl font-bold tracking-tight text-[var(--text-main)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href={siteConfig.resumeUrl}
              target="_blank"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm font-mono text-[var(--accent)] mt-4"
            >
              Resume →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
