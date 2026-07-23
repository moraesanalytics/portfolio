import { site, socialLinks } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>

        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted transition-colors duration-300 hover:text-heading"
            >
              <link.icon className="size-[18px]" strokeWidth={1.75} />
            </a>
          ))}
        </div>

        <p className="text-sm text-muted">
          Business Intelligence · Data Analytics
        </p>
      </Container>
    </footer>
  );
}
