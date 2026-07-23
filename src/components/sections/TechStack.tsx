"use client";

import { motion } from "framer-motion";
import { technologies } from "@/data/tech";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function TechStack() {
  return (
    <section id="stack" className="py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Tech Stack"
          title="The tools behind the work."
          description="A focused set of technologies covering the full analytics pipeline — from data extraction and modeling to automation and presentation."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={staggerItem}
              className="group rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft md:p-8"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <tech.icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-body">
                {tech.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{tech.category}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
