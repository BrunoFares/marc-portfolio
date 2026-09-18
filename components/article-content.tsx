import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import chart from "@/public/original-site/content/blog/data-visualization/line-chart.json";

const schema = { ...defaultSchema, tagNames: [...(defaultSchema.tagNames || []), "audio", "summary", "details"], attributes: { ...defaultSchema.attributes, div: [...(defaultSchema.attributes?.div || []), "dataDemo"], audio: ["controls", "src", "preload"], code: [...(defaultSchema.attributes?.code || []), ["className", /^language-./, "math-inline", "math-display"]] } };

export function ArticleContent({ body, base }: { body: string; base: string }) {
  return <div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], [rehypeKatex, { throwOnError: false, strict: false }]]} components={{
    img: ({ src, alt }) => {
      if (typeof src !== "string") return null;
      // Markdown dimensions are unknown; keep intrinsic sizing for imported media.
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={/^(https?:|\/)/.test(src) ? src : `${base}/${src}`} alt={alt || ""} loading="lazy" />;
    },
    a: ({ href, children, ...props }) => <a {...props} href={href && !/^(https?:|mailto:|#|\/)/.test(href) ? `${base}/${href}` : href} {...(href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>,
    div: ({ node, children, ...props }) => node?.properties.dataDemo === "chart" ? <DemoChart /> : <div {...props}>{children}</div>
  }}>{body}</ReactMarkdown></div>;
}

function DemoChart() {
  const series = chart.data[0];
  const points = series.y.map((y, i) => `${60 + i * 35},${275 - Number(y) / 1.2e9 * 235}`).join(" ");
  return <figure style={{margin:"24px 0"}}><figcaption>Total Number of Websites</figcaption><svg role="img" aria-label="Area chart of total websites from 2000 to 2016. Values are available in the table below." viewBox="0 0 680 330" style={{width:"100%",background:"var(--soft)",borderRadius:4}}><path d={`M60 275 ${points.split(" ").map(p => `L${p}`).join(" ")} L620 275Z`} fill="var(--green)" opacity=".15" /><polyline points={points} fill="none" stroke="var(--green)" strokeWidth="2" />{[0, .4, .8, 1.2].map(n => <g key={n}><path d={`M60 ${275-n/1.2*235}H640`} stroke="var(--line)" /><text x="10" y={279-n/1.2*235} fill="var(--muted)" fontSize="11">{n}B</text></g>)}{[0, 4, 8, 12, 16].map(i => <text key={i} x={60+i*35} y="303" fill="var(--muted)" fontSize="11" textAnchor="middle">{2000+i}</text>)}</svg><details><summary>View chart data</summary><table><thead><tr><th>Year</th><th>Websites</th></tr></thead><tbody>{series.x.map((x, i) => <tr key={x}><td>{x.slice(0,4)}</td><td>{Number(series.y[i]).toLocaleString("en")}</td></tr>)}</tbody></table></details><small>Original sources: <a href="http://www.scribblrs.com/">Scribblrs</a> and <a href="http://www.internetlivestats.com/total-number-of-websites/">Internet Live Stats</a>.</small></figure>;
}
