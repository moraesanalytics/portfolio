/**
 * Any icon renderable with a className — covers Lucide icons and the
 * custom brand icons in components/ui/BrandIcons.
 */
export type IconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number | string;
}>;

export interface NavItem {
  label: string;
  href: string;
}

export interface Technology {
  name: string;
  category: string;
  icon: IconComponent;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
  handle: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
  icon: IconComponent;
}

export interface FeaturedProject {
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  highlights: ProjectHighlight[];
  repositoryUrl: string;
  demoUrl: string;
  stats: { label: string; value: string }[];
}
