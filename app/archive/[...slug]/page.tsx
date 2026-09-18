import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { archive, getEntry } from "@/lib/archive";
import { prepareMarkdown } from "@/lib/markdown";
import { ArticleContent } from "@/components/article-content";
import { Icon } from "@/components/icons";

type Props = { params: Promise<{ slug: string[] }> };
export function generateStaticParams() { return archive.map(entry => ({ slug: entry.slug.split("/") })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry((await params).slug.join("/"));
  return entry ? { title: entry.title, description: entry.summary } : { title: "Page not found" };
}
export default async function ArticlePage({ params }: Props) {
  const entry = getEntry((await params).slug.join("/"));
  if (!entry) notFound();
  return <main id="main" className="article-shell"><Link className="article-back" href={`/archive?category=${entry.category}`}>← Back to {entry.category.toLowerCase()}</Link><header className="article-header"><span className="eyebrow">{entry.category.toUpperCase()} · THE ORIGINAL COLLECTION</span><h1>{entry.title.replace(/^[^\p{L}\p{N}]+/u, "")}</h1><p>{entry.summary}</p><div className="article-meta">{entry.authors.length > 0 && <span>{entry.authors.map(author => author === "me" ? "Marc Fares" : author).join(" · ")}</span>}{entry.date && <time dateTime={String(entry.date)}>{new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(entry.date))}</time>}<span>{Math.max(1, Math.ceil(entry.body.split(/\s+/).length / 220))} min read</span><a href={entry.original} download>Download original source <Icon name="download" size={12} /></a></div></header>{entry.category !== "Notes" && <p className="archive-notice">Preserved from the original site’s template collection.</p>}{entry.image && <Image className="article-cover" src={entry.image} alt="" width={1000} height={500} sizes="(max-width: 850px) 95vw, 820px" priority />}{entry.image && entry.imageCaption && <div className="image-credit"><ReactMarkdown>{entry.imageCaption}</ReactMarkdown></div>}<ArticleContent body={prepareMarkdown(entry)} base={entry.base} /><div className="attachments" id="article-resources"><h2>Links & original files</h2>{entry.links.map(link => <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.url.replace("https://", "")}<Icon name="arrow" size={16} /></a>)}{entry.attachments.map(file => <a href={file.url} download key={file.url}>{file.name}<Icon name="download" size={16} /></a>)}<a href={entry.original} download>Original {entry.category === "Notes" ? "MDX" : "Markdown"} file<Icon name="download" size={16} /></a></div></main>;
}
