"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { featuredProject } from "@/data/project";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/ui/DashboardPreview";
import { DemoModal } from "@/components/ui/DemoModal";
import { scaleIn, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function FeaturedProject() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section id="project" className="py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Featured Project"
          title={featuredProject.name}
          description={featuredProject.tagline}
          align="center"
        />

        {/* Dashboard preview */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0.2}
          className="mt-16"
        >
          <DashboardPreview onLaunch={() => setDemoOpen(true)} />
        </motion.div>

        {/* Description + stats */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <Reveal>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {featuredProject.description}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {featuredProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-accent-soft px-4 py-1.5 text-xs font-medium text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              {featuredProject.stats.map((stat) => (
                <div key={stat.label} className="bg-surface px-4 py-6">
                  <p className="font-serif text-3xl text-heading">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Highlights */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-4 md:grid-cols-3 lg:gap-5"
        >
          {featuredProject.highlights.map((highlight) => (
            <motion.div
              key={highlight.title}
              variants={staggerItem}
              className="rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <highlight.icon
                className="size-5 text-accent"
                strokeWidth={1.75}
              />
              <h3 className="mt-4 text-sm font-semibold text-body">
                {highlight.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions */}
        <Reveal delay={0.2} className="mt-14 flex flex-wrap justify-center gap-4">
          <Button href={featuredProject.repositoryUrl} external>
            <GitHubIcon className="size-4" />
            View Repository
          </Button>
        </Reveal>
      </Container>

      <DemoModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        url={featuredProject.demoUrl}
        title={featuredProject.name}
      />
    </section>
  );
}
