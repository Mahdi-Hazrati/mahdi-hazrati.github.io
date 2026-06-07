import { visit } from "unist-util-visit";
import type { Root } from "hast";

/** Adds data-language and data-filename from pretty-code meta for UI chrome. */
export function rehypeCodeMeta() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "pre") return;

      const code = node.children.find(
        (child) => child.type === "element" && child.tagName === "code"
      );
      if (!code || code.type !== "element") return;

      const lang =
        (code.properties?.className as string[] | undefined)
          ?.find((c) => c.startsWith("language-"))
          ?.replace("language-", "") ?? "text";

      node.properties = {
        ...node.properties,
        "data-language": lang,
        "data-copyable": "",
      };

      const title = node.properties?.title;
      if (typeof title === "string" && title.length > 0) {
        node.properties["data-filename"] = title;
      }
    });
  };
}

export const PRETTY_CODE_OPTIONS = {
  theme: {
    dark: "one-dark-pro",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "plaintext",
  grid: true,
  showLineNumbers: true,
  defaultLineNumbers: true,
  bypassInlineCodeClassName: true,
  filterMetaString: (meta: string) =>
    meta
      .replace(/filename="([^"]+)"/g, "")
      .replace(/title="([^"]+)"/g, "")
      .trim(),
  onVisitLine(node: { children: unknown[] }) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
    node.properties.className = [
      ...(node.properties.className ?? []),
      "line--highlighted",
    ];
  },
  onVisitHighlightedChars(node: { properties: { className?: string[] } }) {
    node.properties.className = [
      ...(node.properties.className ?? []),
      "chars--highlighted",
    ];
  },
} as const;
