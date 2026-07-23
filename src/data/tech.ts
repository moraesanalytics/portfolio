import {
  BarChart3,
  Code2,
  Database,
  Sigma,
  Terminal,
  Workflow,
} from "lucide-react";
import type { Technology } from "@/types";

export const technologies: Technology[] = [
  { name: "Power BI", category: "Business Intelligence", icon: BarChart3 },
  { name: "Python", category: "Data & Automation", icon: Terminal },
  { name: "SQL", category: "Databases", icon: Database },
  { name: "DAX", category: "Data Modeling", icon: Sigma },
  { name: "Power Query", category: "Data Transformation", icon: Workflow },
  { name: "Front-end", category: "HTML · CSS · JavaScript", icon: Code2 },
];
