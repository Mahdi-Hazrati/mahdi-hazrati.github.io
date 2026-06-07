"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type PostContentProps = {
  html: string;
};

export function PostContent({ html }: PostContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const figures = root.querySelectorAll<HTMLElement>(
      "figure[data-rehype-pretty-code-figure]"
    );

    figures.forEach((figure) => {
      if (figure.querySelector(".code-block-chrome")) return;

      const pre = figure.querySelector("pre");
      if (!pre) return;

      const language =
        pre.getAttribute("data-language") ??
        pre.querySelector("code")?.className.match(/language-(\w+)/)?.[1] ??
        "text";
      const filename =
        pre.getAttribute("data-filename") ??
        pre.getAttribute("title") ??
        null;

      const chrome = document.createElement("div");
      chrome.className =
        "code-block-chrome flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border/60 bg-muted/30";

      const dots = document.createElement("div");
      dots.className = "flex items-center gap-2 min-w-0";
      dots.innerHTML = `
        <span class="flex items-center gap-1.5 shrink-0">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
        </span>
        <span class="font-mono text-xs text-muted-foreground truncate">
          ${filename ? `${filename} · ` : ""}${language}
        </span>
      `;

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className =
        "code-copy-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/60 text-xs font-mono text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors shrink-0";
      copyBtn.setAttribute("aria-label", "Copy code");
      copyBtn.innerHTML = `<span class="copy-label">Copy</span>`;

      copyBtn.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        const text = code?.textContent ?? "";
        await navigator.clipboard.writeText(text);
        copyBtn.innerHTML = `<span class="copy-label text-accent">Copied</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = `<span class="copy-label">Copy</span>`;
        }, 2000);
      });

      chrome.append(dots, copyBtn);
      figure.insertBefore(chrome, pre);
      figure.classList.add("code-block-figure");
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Static copy button for SSR-safe demos (optional export). */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/60 text-xs font-mono text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-accent" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy
        </>
      )}
    </button>
  );
}
