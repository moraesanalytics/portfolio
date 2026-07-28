"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Database, Lightbulb, MonitorCheck } from "lucide-react";
import { EASE, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { IconComponent } from "@/types";

interface Highlight {
  icon: IconComponent;
  label: string;
}

const highlights: Highlight[] = [
  { icon: MonitorCheck, label: "Dashboards" },
  { icon: Database, label: "Data & Modeling" },
  { icon: Lightbulb, label: "Business Intelligence" },
];

const ROTATE_MS = 3500;

// Slot 0 = center (highlighted), 1 = right, 2 = left.
const slots = [
  { x: 0, scale: 1.12, opacity: 1, zIndex: 2 },
  { x: 160, scale: 0.6, opacity: 0.25, zIndex: 1 },
  { x: -160, scale: 0.6, opacity: 0.25, zIndex: 1 },
];

export function HeroHighlights() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((current) => (current + 1) % highlights.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0.55}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative hidden h-80 items-center justify-center lg:flex"
    >
      {highlights.map((highlight, index) => {
        const slot = slots[(index - active + highlights.length) % highlights.length];
        const isCenter = slot.zIndex === 2;

        return (
          <motion.button
            key={highlight.label}
            type="button"
            aria-label={highlight.label}
            onClick={() => setActive(index)}
            animate={{ x: slot.x, scale: slot.scale, opacity: slot.opacity }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ zIndex: slot.zIndex }}
            className={cn("absolute", !isCenter && "cursor-pointer")}
          >
            <highlight.icon
              strokeWidth={1.1}
              className={cn(
                "size-36 text-accent transition-[filter] duration-500",
                isCenter &&
                  "drop-shadow-[0_16px_32px_rgb(78_102_93_/_0.25)]"
              )}
            />
          </motion.button>
        );
      })}

      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute bottom-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted"
        >
          {highlights[active].label}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
