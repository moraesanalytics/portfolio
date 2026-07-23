"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center pt-16 md:pt-[4.5rem]"
    >
      <Container>
        <div className="max-w-3xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {site.name} · {site.location}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-6 font-serif text-5xl leading-[1.08] text-heading md:text-7xl"
          >
            Business Intelligence
            <br />
            <span className="italic text-accent">Data Analytics</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            I build Business Intelligence solutions from end to end — from
            data extraction and modeling to dashboards and automation. My goal
            is simple: turn complex data into decisions people can actually
            make.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="#contact">Contact</Button>
            <Button href="#project" variant="ghost">
              Featured project
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </Button>
          </motion.div>
        </div>
      </Container>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-heading md:block"
      >
        <ArrowDown className="size-5 animate-bounce" strokeWidth={1.5} />
      </motion.a>
    </section>
  );
}
