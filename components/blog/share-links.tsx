"use client";

import { Check, Link2, Linkedin } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ShareLinksProps = {
  url: string;
  title: string;
};

export function ShareLinks({ url, title }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-muted-foreground mr-2">Share</span>
      <ShareButton
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        label="Share on X"
      >
        𝕏
      </ShareButton>
      <ShareButton
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        label="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </ShareButton>
      <button
        type="button"
        onClick={copyLink}
        className={cn(
          "p-2 rounded-lg border border-border/60 text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors",
          copied && "border-accent/50 text-accent"
        )}
        aria-label="Copy link"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

function ShareButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors text-xs font-medium"
    >
      {children}
    </a>
  );
}
