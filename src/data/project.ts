import { LayoutDashboard, Network, Sigma } from "lucide-react";
import type { FeaturedProject } from "@/types";

export const featuredProject: FeaturedProject = {
  name: "NorthWind Distribution Analytics",
  tagline:
    "A modular Business Intelligence platform built to simulate how modern companies use data.",
  description:
    "An end-to-end Business Intelligence project that simulates a real distribution company — from synthetic data generation in Python to two identical executive dashboards: one built with native Power BI visuals, the other rendered entirely through a single HTML visual generated via DAX.",
  technologies: [
    "Power BI",
    "DAX",
    "Python",
    "Pandas",
    "JavaScript",
    "HTML",
    "CSS",
    "Power Query",
  ],
  highlights: [
    {
      title: "A full native Power BI dashboard",
      description:
        "Eight blocks of KPIs, charts, heatmaps and time intelligence — a complete executive dashboard built with native Power BI visuals and complex DAX logic.",
      icon: LayoutDashboard,
    },
    {
      title: "Rebuilt as one single DAX measure",
      description:
        "All of that complexity collapses into just 1 DAX measure that renders the entire dashboard as HTML — identical numbers, powered by 1,200+ code lines.",
      icon: Sigma,
    },
    {
      title: "Engineered end to end",
      description:
        "Synthetic data generated in Python, modeled as a star schema with 2,431 fact rows and 74 measures — versioned and fully documented on GitHub.",
      icon: Network,
    },
  ],
  repositoryUrl:
    "https://github.com/moraesanalytics/northwind-distribution-analytics",
  demoUrl: "/demo/index.html",
  stats: [
    { label: "DAX measures", value: "74" },
    { label: "Fact rows", value: "2,431" },
    { label: "Lines of code", value: "1,221" },
    { label: "Dashboard blocks", value: "8" },
  ],
};
