import { NextResponse } from "next/server";
import { getAllPosts, postUrl } from "@/lib/blog";
import {
  about,
  experience,
  projects,
  site,
  skillGroups,
} from "@/lib/portfolio";

export const dynamic = "force-static";

function buildLlmText(): string {
  const base = `https://${site.domain}`;
  const posts = getAllPosts();
  const lines: string[] = [];

  lines.push(`# ${site.name} — ${site.title}`);
  lines.push("");
  lines.push(`> ${site.tagline}`);
  lines.push("");
  lines.push(about.intro);
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Email: ${site.email}`);
  lines.push(`- GitHub: ${site.github}`);
  lines.push(`- LinkedIn: ${site.linkedin}`);
  lines.push(`- Website: ${base}`);
  lines.push(`- Location: ${site.location}`);
  lines.push("");

  lines.push("## Skills");
  for (const group of skillGroups) {
    const skills = group.skills.map((s) => s.name).join(", ");
    lines.push(`- ${group.name}: ${skills}`);
  }
  lines.push("");

  lines.push("## Projects");
  for (const project of projects) {
    lines.push(
      `- [${project.title}](${project.href}) (${project.year}): ${project.description}`
    );
  }
  lines.push("");

  lines.push("## Experience");
  for (const job of experience) {
    lines.push(
      `- ${job.period} — ${job.role} @ ${job.company}: ${job.description}`
    );
  }
  lines.push("");

  lines.push(`## Blog (${posts.length} posts)`);
  lines.push(`Full index: ${base}/blog — RSS feed: ${base}/feed.xml`);
  lines.push("");
  for (const post of posts) {
    lines.push(`### ${post.title}`);
    lines.push(`- URL: ${postUrl(post.slug)}`);
    lines.push(`- Date: ${post.date}`);
    if (post.tags.length > 0) lines.push(`- Tags: ${post.tags.join(", ")}`);
    lines.push(`- Summary: ${post.description}`);
    lines.push("");
  }

  lines.push("## Pages");
  lines.push(`- Home: ${base}/`);
  lines.push(`- Blog index: ${base}/blog`);
  lines.push(`- Sitemap: ${base}/sitemap.xml`);
  lines.push(`- RSS feed: ${base}/feed.xml`);

  return lines.join("\n");
}

export function GET() {
  return new NextResponse(buildLlmText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
