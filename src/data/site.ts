import { Mail } from "lucide-react";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/BrandIcons";
import type { NavItem, SocialLink } from "@/types";

export const site = {
  name: "João Victor Moraes",
  shortName: "João Victor",
  initials: "JV",
  role: "Business Intelligence · Data Analytics",
  roles: ["Business Intelligence", "Data Analytics"],
  // Swap for the custom domain when it's purchased.
  url: "https://portfolio-moraesanalytics.vercel.app",
  email: "contato.moraes.analytics@gmail.com",
  location: "Brazil",
  description:
    "Business Intelligence analyst turning raw data into executive-ready insight — Power BI, Python, SQL and automation, end to end.",
};

export const navigation: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Project", href: "#project" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jo%C3%A3o-victor-moraes-3b4b60290/",
    icon: LinkedInIcon,
    handle: "João Victor Moraes",
  },
  {
    label: "GitHub",
    href: "https://github.com/moraesanalytics",
    icon: GitHubIcon,
    handle: "moraesanalytics",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/moraes.analytics",
    icon: InstagramIcon,
    handle: "@moraes.analytics",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: Mail,
    handle: site.email,
  },
];
