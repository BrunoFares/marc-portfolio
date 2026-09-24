import fs from "node:fs";
import path from "node:path";

type MarkdownEntry = {
  body?: string;
  summary?: string;
  base?: string;
};

const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// Retain the authored Markdown; translate active Hugo embeds to portable equivalents.
export function prepareMarkdown(entry: MarkdownEntry): string {
  const source = entry.body ?? entry.summary ?? "";
  const base = (entry.base ?? "").replace(/\/+$/, "");
  const preserved: string[] = [];
  let body = source.replace(/```[\s\S]*?```|`[^`\n]+`|\{\{<\/\*[\s\S]*?\*\/>\}\}/g, match => {
    preserved.push(match);
    return `PRESERVEDTOKEN${preserved.length - 1}ENDTOKEN`;
  });
  body = body.replace(/<div class="highlight">\s*<pre class="chroma">\s*<code>([\s\S]*?)<\/code>\s*<\/pre>\s*<\/div>/g, "$1");
  body = body.replace(/\{\{<\s*(\/?[\w-]+)([\s\S]*?)>\}\}/g, (full, name: string, args: string) => {
    const attrs = Object.fromEntries([...args.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
    if (name === "toc" || name === "slide" || name === "fragment" || name === "/fragment") return "";
    if (name === "icon") return "";
    if (name === "cite") return '[Marc Fares (2026). Period collapse of Markov triangles. arXiv:2601.14090.](https://arxiv.org/abs/2601.14090)';
    if (name === "youtube") return `[Watch this video on YouTube](https://www.youtube.com/watch?v=${encodeURIComponent(args.trim())})`;
    if (name === "audio") return `<audio controls preload="none" src="${base}/${escape(attrs.src)}"></audio>`;
    if (name === "spoiler") return `<details><summary>${escape(attrs.text || "View the solution")}</summary>`;
    if (name === "/spoiler") return "</details>";
    if (name === "button") {
      const url = attrs.url === "/data/results.csv" ? `${base}/results.csv` : attrs.url === "#" ? "#article-resources" : attrs.url;
      return `<a href="${escape(url || "/")}">`;
    }
    if (name === "/button") return "</a>";
    if (name === "embed") {
      const url = attrs.url || (attrs.platform === "github" ? `https://github.com/${attrs.resource}` : `https://huggingface.co/${attrs.type === "dataset" ? "datasets/" : ""}${attrs.resource}`);
      return `\n\n[${attrs.title || attrs.resource}](${url})${attrs.description ? ` — ${attrs.description}` : ""}\n\n`;
    }
    if (name === "chart") return '<div data-demo="chart"></div>';
    if (name === "table") {
      const table = fs.readFileSync(path.join(process.cwd(), "public", base, attrs.path), "utf8").trim().split("\n").map(row => row.split(",").map(cell => cell.trim()));
      return `\n\n${attrs.caption || ""}\n\n| ${table[0].join(" | ")} |\n| ${table[0].map(() => "---").join(" | ")} |\n${table.slice(1).map(row => `| ${row.join(" | ")} |`).join("\n")}\n\n`;
    }
    if (name === "notebook") {
      const notebook = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", base, attrs.src), "utf8"));
      type Cell = { cell_type: string; source: string[]; outputs?: { text?: string[]; data?: Record<string, string[]> }[] };
      return `\n\n### ${attrs.title || "Notebook"}\n\n[Download notebook](${base}/${attrs.src})\n\n` + notebook.cells.map((cell: Cell) => {
        const source = cell.source.join("");
        if (cell.cell_type === "markdown") return source;
        const outputs = (cell.outputs || []).map(output => output.text?.join("") || output.data?.["text/html"]?.join("") || (output.data?.["text/plain"] ? `\n\n\`\`\`text\n${output.data["text/plain"].join("")}\n\`\`\`` : "")).join("\n\n");
        return `\n\n\`\`\`python\n${source}\n\`\`\`\n\n${outputs}`;
      }).join("\n\n");
    }
    return `\`${full}\``;
  });
  body = body.replace(/PRESERVEDTOKEN(\d+)ENDTOKEN/g, (_, index) => preserved[Number(index)]);
  return body;
}
