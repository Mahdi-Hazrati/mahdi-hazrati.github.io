"use client";

import { Check, Copy, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CodeViewerPayload = {
  language: string;
  filename: string | null;
  codeText: string;
  codeHtml: string;
};

type CodeViewerDialogProps = CodeViewerPayload & {
  open: boolean;
  onClose: () => void;
};

function ChromeButton({
  onClick,
  label,
  children,
  active,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/60 text-xs font-mono transition-colors shrink-0",
        active
          ? "border-accent/50 text-accent"
          : "text-muted-foreground hover:text-accent hover:border-accent/40"
      )}
    >
      {children}
    </button>
  );
}

export function CodeViewerDialog({
  open,
  onClose,
  language,
  filename,
  codeText,
  codeHtml,
}: CodeViewerDialogProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeText]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={filename ?? `${language} code`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close code viewer"
      />
      <div className="relative z-10 flex w-full max-w-5xl max-h-[90vh] flex-col rounded-xl border border-border/80 bg-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/60 bg-muted/30 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </span>
            <span className="font-mono text-xs text-muted-foreground truncate">
              {filename ? `${filename} · ` : ""}
              {language}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ChromeButton onClick={copy} label="Copy code" active={copied}>
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </ChromeButton>
            <ChromeButton onClick={onClose} label="Close">
              <X className="w-3.5 h-3.5" />
            </ChromeButton>
          </div>
        </div>
        <div className="overflow-auto flex-1 code-viewer-panel">
          <pre className="m-0 p-0 bg-transparent text-sm">
            <code
              className="code-viewer-content block py-4 font-mono text-[0.8125rem] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: codeHtml }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}

export function useCodeBlockEnhancer(
  rootRef: React.RefObject<HTMLElement | null>,
  onExpand: (payload: CodeViewerPayload) => void,
  deps: unknown[] = []
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const figures = root.querySelectorAll<HTMLElement>(
      "figure[data-rehype-pretty-code-figure]"
    );

    const cleanups: (() => void)[] = [];

    figures.forEach((figure) => {
      if (figure.dataset.enhanced === "true") return;

      const pre = figure.querySelector("pre");
      const code = pre?.querySelector("code");
      if (!pre || !code) return;

      const language =
        pre.getAttribute("data-language") ??
        code.className.match(/language-(\w+)/)?.[1] ??
        "text";
      const filename =
        pre.getAttribute("data-filename") ??
        pre.getAttribute("title") ??
        null;

      figure.dataset.enhanced = "true";
      figure.classList.add("code-block-figure");

      const chrome = document.createElement("div");
      chrome.className =
        "code-block-chrome flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border/60 bg-muted/30";

      const left = document.createElement("div");
      left.className = "flex items-center gap-2 min-w-0";
      left.innerHTML = `
        <span class="flex items-center gap-1.5 shrink-0">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
        </span>
        <span class="font-mono text-xs text-muted-foreground truncate">
          ${filename ? `${filename} · ` : ""}${language}
        </span>
      `;

      const actions = document.createElement("div");
      actions.className = "flex items-center gap-2 shrink-0";

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className =
        "code-viewer-action inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/60 text-xs font-mono text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors";
      copyBtn.setAttribute("aria-label", "Copy code");
      copyBtn.innerHTML = `<span>Copy</span>`;

      const expandBtn = document.createElement("button");
      expandBtn.type = "button";
      expandBtn.className =
        "code-viewer-action inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/60 text-xs font-mono text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors";
      expandBtn.setAttribute("aria-label", "Expand code");
      expandBtn.innerHTML = `<span>Expand</span>`;

      const onCopy = async () => {
        await navigator.clipboard.writeText(code.textContent ?? "");
        copyBtn.innerHTML = `<span class="text-accent">Copied</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = `<span>Copy</span>`;
        }, 2000);
      };

      const onExpandClick = () => {
        onExpand({
          language,
          filename,
          codeText: code.textContent ?? "",
          codeHtml: code.innerHTML,
        });
      };

      copyBtn.addEventListener("click", onCopy);
      expandBtn.addEventListener("click", onExpandClick);

      actions.append(copyBtn, expandBtn);
      chrome.append(left, actions);
      figure.insertBefore(chrome, pre);

      cleanups.push(() => {
        copyBtn.removeEventListener("click", onCopy);
        expandBtn.removeEventListener("click", onExpandClick);
        chrome.remove();
        delete figure.dataset.enhanced;
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef, onExpand, ...deps]);
}
