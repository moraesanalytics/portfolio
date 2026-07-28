"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Lightbulb, MonitorCheck } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { IconComponent } from "@/types";

interface Highlight {
  icon: IconComponent;
  title: string;
  description: string;
  offset: string;
}

const highlights: Highlight[] = [
  {
    icon: MonitorCheck,
    title: "Dashboards",
    description: "Executive views that read in seconds.",
    offset: "",
  },
  {
    icon: Database,
    title: "Data & Modeling",
    description: "Clean models, SQL and reliable pipelines.",
    offset: "lg:translate-x-10",
  },
  {
    icon: Lightbulb,
    title: "Business Intelligence",
    description: "Numbers that turn into decisions.",
    offset: "lg:translate-x-3",
  },
];

export function HeroHighlights() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0.55}
      onMouseLeave={() => setActive(null)}
      className="hidden flex-col gap-4 lg:flex"
    >
      {highlights.map((highlight, index) => {
        const isActive = active === index;
        const isDimmed = active !== null && !isActive;

        return (
          <div
            key={highlight.title}
            onMouseEnter={() => setActive(index)}
            className={cn(
              "flex cursor-default items-center gap-5 rounded-2xl border border-line bg-surface p-5 transition-all duration-300",
              highlight.offset,
              isActive && "-translate-y-0.5 border-accent/40 shadow-soft-lg",
              isDimmed && "opacity-40"
            )}
          >
            <div
              className={cn(
                "flex size-12 flex-none items-center justify-center rounded-xl transition-colors duration-300",
                isActive ? "bg-accent text-white" : "bg-accent-soft text-accent"
              )}
            >
              <highlight.icon className="size-[22px]" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-body">
                {highlight.title}
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {highlight.description}
              </p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
