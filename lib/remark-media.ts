import type { Root, Paragraph, Parent } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

function extractYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([\w-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([\w-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([\w-]{11})/,
    /^([\w-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function paragraphText(node: Paragraph): string {
  return node.children
    .filter((child) => child.type === "text")
    .map((child) => ("value" in child ? child.value : ""))
    .join("")
    .trim();
}

function htmlNode(value: string) {
  return { type: "html" as const, value };
}

function youtubeEmbed(id: string, title = "YouTube video") {
  return htmlNode(
    `<figure class="media-embed media-embed-youtube"><div class="media-embed-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe></div></figure>`
  );
}

function videoEmbed(src: string, title?: string) {
  const safeTitle = title ?? "Video";
  return htmlNode(
    `<figure class="media-embed media-embed-video"><video controls preload="metadata" playsinline${title ? ` title="${safeTitle}"` : ""}><source src="${src}" type="video/mp4" />Your browser does not support video.</video>${title ? `<figcaption>${safeTitle}</figcaption>` : ""}</figure>`
  );
}

function audioEmbed(src: string, title?: string) {
  const safeTitle = title ?? "Audio";
  return htmlNode(
    `<figure class="media-embed media-embed-audio"><figcaption class="media-embed-label">${safeTitle}</figcaption><audio controls preload="metadata"><source src="${src}" type="audio/mpeg" />Your browser does not support audio.</audio></figure>`
  );
}

export const remarkMedia: Plugin<[], Root> = () => (tree) => {
  visit(tree, "paragraph", (node: Paragraph, index, parent: Parent | undefined) => {
    if (parent === undefined || index === undefined) return;

    if (
      node.children.length === 1 &&
      node.children[0].type === "link" &&
      node.children[0].url
    ) {
      const link = node.children[0];
      const linkText =
        link.children?.[0]?.type === "text" ? link.children[0].value : "";
      const youtubeId = extractYoutubeId(link.url);
      if (youtubeId && (linkText === link.url || linkText.includes("youtube"))) {
        parent.children[index] = youtubeEmbed(youtubeId);
        return;
      }
    }

    const text = paragraphText(node);

    const youtubeMatch = text.match(/^::youtube\s+(.+)$/i);
    if (youtubeMatch) {
      const id = extractYoutubeId(youtubeMatch[1]);
      if (id) parent.children[index] = youtubeEmbed(id);
      return;
    }

    const videoMatch = text.match(/^::video\s+(\S+)(?:\s+"([^"]*)")?$/i);
    if (videoMatch) {
      parent.children[index] = videoEmbed(videoMatch[1], videoMatch[2]);
      return;
    }

    const audioMatch = text.match(/^::audio\s+(\S+)(?:\s+"([^"]*)")?$/i);
    if (audioMatch) {
      parent.children[index] = audioEmbed(audioMatch[1], audioMatch[2]);
    }
  });
};
