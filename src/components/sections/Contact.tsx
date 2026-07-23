"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site, socialLinks } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-heading md:text-6xl">
              Better decisions start
              <br />
              with <span className="italic">better data</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Available for Business Intelligence consulting, freelance
              projects and long-term opportunities.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Button href={`mailto:${site.email}`}>Get in touch</Button>
            </div>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              variants={staggerItem}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <link.icon
                  className="size-5 text-accent"
                  strokeWidth={1.75}
                />
                <ArrowUpRight
                  className="size-4 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-heading"
                  strokeWidth={1.75}
                />
              </div>
              <p className="mt-5 text-sm font-semibold text-body">
                {link.label}
              </p>
              <p className="mt-1 whitespace-nowrap text-[11px] text-muted">
                {link.handle}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
