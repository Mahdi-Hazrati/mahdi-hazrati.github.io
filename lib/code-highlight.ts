import { createHighlighter } from "shiki";

const THEMES = ["github-light", "one-dark-pro"] as const;

export const BLOG_LANGUAGES = [
  "bash",
  "c",
  "cpp",
  "csharp",
  "css",
  "diff",
  "dockerfile",
  "go",
  "glsl",
  "html",
  "java",
  "javascript",
  "json",
  "jsx",
  "kotlin",
  "markdown",
  "php",
  "plaintext",
  "python",
  "ruby",
  "rust",
  "shell",
  "sql",
  "swift",
  "toml",
  "tsx",
  "typescript",
  "xml",
  "yaml",
] as const;

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

export function getBlogHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [...THEMES],
      langs: [...BLOG_LANGUAGES],
    });
  }
  return highlighterPromise;
}

export const CODE_THEMES = {
  light: THEMES[0],
  dark: THEMES[1],
} as const;
