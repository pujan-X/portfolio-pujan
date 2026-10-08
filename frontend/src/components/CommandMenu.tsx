"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { GitBranch, Mail, Terminal, FileText, User, Code, Zap, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import "./CommandMenu.css";

interface CommandItem {
  label: string;
  group: string;
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (hash: string) => {
    setOpen(false);
    router.push(hash);
  };

  const commands: CommandItem[] = [
    {
      group: "Navigate",
      label: "Home",
      icon: Terminal,
      shortcut: "H",
      action: () => navigate("/"),
    },
    {
      group: "Navigate",
      label: "About",
      icon: User,
      action: () => navigate("/#about"),
    },
    {
      group: "Navigate",
      label: "Skills",
      icon: Code,
      action: () => navigate("/#skills"),
    },
    {
      group: "Navigate",
      label: "Projects",
      icon: Zap,
      action: () => navigate("/#projects"),
    },
    {
      group: "Navigate",
      label: "Contact",
      icon: Mail,
      action: () => navigate("/#contact"),
    },
    {
      group: "Actions",
      label: "View Resume",
      icon: FileText,
      shortcut: "R",
      action: () => {
        window.open(siteConfig.resumeUrl, "_blank");
        setOpen(false);
      },
    },
    {
      group: "Actions",
      label: "GitHub Profile",
      icon: GitBranch,
      action: () => {
        window.open(siteConfig.github, "_blank");
        setOpen(false);
      },
    },
    {
      group: "Actions",
      label: "Copy Email",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(siteConfig.email);
        setOpen(false);
      },
    },
  ];

  const groups = [...new Set(commands.map(c => c.group))];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-start justify-center pt-[18vh] px-4"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Dialog */}
          <motion.div
            className="cmdk-dialog relative"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Command className="cmdk-root" loop>
              <div className="flex items-center border-b border-[rgba(255,255,255,0.06)] px-4">
                <Terminal className="w-4 h-4 text-[var(--accent)] mr-3 shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search…"
                  className="cmdk-input"
                />
              </div>
              <Command.List className="cmdk-list">
                <Command.Empty className="py-8 text-center text-[var(--muted)] font-mono text-[13px]">
                  No results found.
                </Command.Empty>

                {groups.map(group => (
                  <Command.Group key={group} heading={group}>
                    {commands
                      .filter(c => c.group === group)
                      .map(cmd => (
                        <Command.Item
                          key={cmd.label}
                          onSelect={cmd.action}
                        >
                          <cmd.icon className="w-4 h-4 mr-3 shrink-0 text-[var(--accent)]" />
                          <span className="flex-1">{cmd.label}</span>
                          {cmd.shortcut && (
                            <span className="cmdk-shortcut">{cmd.shortcut}</span>
                          )}
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] ml-2 opacity-0 group-data-[selected]:opacity-100 transition-opacity" />
                        </Command.Item>
                      ))}
                  </Command.Group>
                ))}
              </Command.List>

              {/* Footer hint */}
              <div className="border-t border-[rgba(255,255,255,0.06)] px-4 py-2.5 flex items-center gap-4">
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  <kbd className="px-1.5 py-0.5 bg-[var(--raised)] rounded text-[9px] mr-1">↑↓</kbd>
                  navigate
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  <kbd className="px-1.5 py-0.5 bg-[var(--raised)] rounded text-[9px] mr-1">↵</kbd>
                  select
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  <kbd className="px-1.5 py-0.5 bg-[var(--raised)] rounded text-[9px] mr-1">esc</kbd>
                  close
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
