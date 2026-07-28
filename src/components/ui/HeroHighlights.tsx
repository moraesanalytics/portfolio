"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Lightbulb, MonitorCheck } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { IconComponent } from "@/types";

interface Highlight {
  icon: IconComponent;
  label: string;
  position: string;
  size: string;
  floatDelay: number;
}

const highlights: Highlight[] = [
  {
    icon: MonitorCheck,
    label: "Dashboards",
    position: "left-2 top-6",
    size: "size-32",
    floatDelay: 0,
  },
  {
    icon: Database,
    label: "Data & Modeling",
    position: "bottom-4 left-32",
    size: "size-24",
    floatDelay: 2.2,
  },
  {
    icon: Lightbulb,
    label: "Business Intelligence",
    position: "right-6 top-14",
    size: "size-36",
    floatDelay: 1.1,
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
      className="relative hidden h-[24rem] lg:block"
      aria-hidden="true"
    >
      {highlights.map((highlight, index) => {
        const isActive = active === index;
        const isDimmed = active !== null && !isActive;

        return (
          <motion.div
            key={highlight.label}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: highlight.floatDelay,
            }}
            onMouseEnter={() => setActive(index)}
            className={cn("absolute cursor-default", highlight.position)}
            title={highlight.label}
          >
            <highlight.icon
              strokeWidth={1.1}
              className={cn(
                "text-accent transition-all duration-500",
                highlight.size,
                isActive && "scale-110 drop-shadow-[0_12px_24px_rgb(78_102_93_/_0.25)]",
                isDimmed ? "opacity-20" : "opacity-90"
              )}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
