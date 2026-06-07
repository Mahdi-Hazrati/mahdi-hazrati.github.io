import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import { getBlogHighlighter } from "./code-highlight";
import { remarkMedia } from "./remark-media";
import { PRETTY_CODE_OPTIONS, rehypeCodeMeta } from "./markdown";

let highlighterReady = false;

async function ensureHighlighter() {
  if (!highlighterReady) {
    await getBlogHighlighter();
    highlighterReady = true;
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  await ensureHighlighter();

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm, { singleTilde: false })
    .use(remarkMedia)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      ...PRETTY_CODE_OPTIONS,
      getHighlighter: () => getBlogHighlighter(),
    })
    .use(rehypeCodeMeta)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["heading-anchor"],
        ariaLabel: "Link to section",
      },
    })
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
      properties: { className: ["external-link"] },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(result);
}
