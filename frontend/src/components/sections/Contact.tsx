"use client";
import { useState, useRef } from "react";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Copy, Check, Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/icons";
import { fadeUp, viewport } from "@/lib/motion";
import { useMagnetic } from "@/hooks/useMagnetic";

/* ===== FLOATING LABEL INPUT ===== */
function FloatingInput({
  name,
  type = "text",
  label,
  required,
}: {
  name: string;
  type?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="floating-label-group">
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder=" "
        className="w-full"
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "off"}
      />
      <label htmlFor={`contact-${name}`}>{label}</label>
    </div>
  );
}

function FloatingTextarea({
  name,
  label,
  rows = 4,
  required,
}: {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="floating-label-group">
      <textarea
        id={`contact-${name}`}
        name={name}
        rows={rows}
        required={required}
        placeholder=" "
        className="w-full"
      />
      <label htmlFor={`contact-${name}`}>{label}</label>
    </div>
  );
}

/* ===== TOAST ===== */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Check className="w-3.5 h-3.5" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===== EMAIL COPY BUTTON ===== */
function EmailCopyButton() {
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setToastVisible(true);
    setTimeout(() => {
      setCopied(false);
      setToastVisible(false);
    }, 2500);
  };

  return (
    <>
      <button
        onClick={copy}
        data-cursor="Copy"
        className="group flex items-center gap-3 text-[clamp(1rem,2vw,1.25rem)] font-mono text-[var(--text-main)] hover:text-[var(--accent)] transition-colors"
        aria-label="Copy email address"
      >
        <span>{siteConfig.email}</span>
        <span className="p-2 bg-[var(--raised)] border border-[rgba(255,255,255,0.06)] rounded-lg group-hover:border-[var(--accent)] transition-colors">
          {copied ? <Check className="w-4 h-4 text-[var(--accent)]" /> : <Copy className="w-4 h-4" />}
        </span>
      </button>
      <Toast message="Email copied!" visible={toastVisible} />
    </>
  );
}

/* ===== SOCIAL LINK ===== */
function SocialLink({ href, icon: Icon, label }: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  const { ref, x, y } = useMagnetic(0.4);

  return (
    <motion.a
      ref={ref as any}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-cursor="Open"
      style={{ x, y }}
      className="magnetic-btn p-3 bg-[var(--raised)] border border-[rgba(255,255,255,0.06)] rounded-xl text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(182,242,74,0.3)] transition-colors"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}

/* ===== SUBMIT BUTTON ===== */
function SubmitButton({ loading }: { loading: boolean }) {
  const { ref, x, y } = useMagnetic(0.3);

  return (
    <motion.button
      ref={ref as any}
      type="submit"
      disabled={loading}
      style={{ x, y }}
      data-cursor="Open"
      className="magnetic-btn w-full py-4 bg-[var(--accent)] text-black font-bold font-mono text-[13px] tracking-[0.08em] uppercase rounded-xl hover:shadow-[0_0_30px_rgba(182,242,74,0.35)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          Sending…
        </span>
      ) : (
        <>
          <Send className="w-4 h-4" />
          Send Message
        </>
      )}
    </motion.button>
  );
}

/* ===== SUCCESS STATE ===== */
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bento-card text-center py-12 space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="mx-auto w-14 h-14 bg-[rgba(182,242,74,0.1)] border border-[rgba(182,242,74,0.3)] rounded-full flex items-center justify-center"
      >
        <Check className="w-6 h-6 text-[var(--accent)]" />
      </motion.div>
      <div className="font-mono text-[13px] tracking-[0.06em] text-[var(--accent)]">Message sent successfully!</div>
      <div className="text-[var(--muted)] text-[14px]">I'll get back to you soon.</div>
    </motion.div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${siteConfig.apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 max-w-[1280px] mx-auto px-6">
      <motion.span
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        06 / Contact
      </motion.span>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left: CTA + email */}
        <div className="space-y-8">
          <div className="overflow-hidden">
            <motion.h2
              className="section-title"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s build
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-none text-[var(--accent)]"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              something.
            </motion.span>
          </div>

          <motion.p
            className="text-[var(--muted)] text-[16px] leading-relaxed max-w-[45ch]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={1}
          >
            Currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll get back to you!
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={2}
          >
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] mb-3">
              Email
            </div>
            <EmailCopyButton />
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={3}
          >
            <SocialLink href={siteConfig.github} icon={Github} label="GitHub" />
            <SocialLink href={siteConfig.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialLink href={`mailto:${siteConfig.email}`} icon={Mail} label="Email" />
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={1}
        >
          {status === "success" ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot */}
              <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

              <div className="grid md:grid-cols-2 gap-4">
                <FloatingInput name="name" label="Name" required />
                <FloatingInput name="email" type="email" label="Email" required />
              </div>
              <FloatingTextarea name="message" label="Message" rows={5} required />

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-[13px] font-mono"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}

              <SubmitButton loading={status === "loading"} />
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
