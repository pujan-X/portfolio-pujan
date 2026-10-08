"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [counter, setCounter] = useState(0);
  const [done, setDone] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    // Check if already shown this session
    const shown = sessionStorage.getItem("loader-shown");
    if (shown) {
      onComplete();
      return;
    }

    const duration = 1600; // ms
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setCounter(pct);
      progress.set(pct / 100);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("loader-shown", "1");
          setTimeout(onComplete, 600);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete, progress]);

  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="page-loader"
          exit={{ clipPath: "inset(100% 0 0 0)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="page-loader-counter">
            {String(counter).padStart(3, "0")}
          </div>
          <div className="page-loader-label">initializing portfolio…</div>
          <div className="page-loader-bar">
            <motion.div
              className="page-loader-bar-fill"
              style={{ scaleX }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
