import { site } from "@/lib/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 border-t border-border/40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-mono">
          <span className="text-accent">©</span> {year} {site.name}
        </p>
        <p>
          Built with Next.js & Tailwind ·{" "}
          <a
            href={`https://${site.domain}`}
            className="text-foreground hover:text-accent transition-colors"
          >
            {site.domain}
          </a>
        </p>
        <p className="font-mono text-xs opacity-60" title="Konami code hint">
          ↑↑↓↓←→←→BA
        </p>
      </div>
    </footer>
  );
}
