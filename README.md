# João Victor Moraes — Portfolio

Premium personal portfolio focused on Business Intelligence, Data Analytics and Automation.

Built with **Next.js**, **TypeScript**, **TailwindCSS**, **Framer Motion** and **Lucide Icons**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/            Routes, layout, SEO (robots, sitemap, OG image, favicon)
├── assets/         Static assets imported by components
├── components/
│   ├── layout/     Navbar, Footer
│   ├── providers/  Theme provider (light / dark)
│   ├── sections/   Hero, About, TechStack, FeaturedProject, Contact
│   └── ui/         Reusable primitives (Button, Reveal, SectionHeading, …)
├── data/           All site content (profile, links, tech stack, project)
├── lib/            Utilities, motion variants, analytics module
├── styles/         Global styles and design tokens
└── types/          Shared TypeScript types
```

## Editing content

All copy and links live in `src/data/` — no component changes needed to update text, social links or project info.

## Analytics

Google Analytics and Microsoft Clarity are pre-wired but disabled. To enable, copy `.env.example` to `.env.local` and fill in the IDs.

## Deployment

Before deploying, update `site.url` in `src/data/site.ts` to the production domain (used by SEO metadata, sitemap and robots).
