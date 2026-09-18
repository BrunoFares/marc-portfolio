"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { ArchiveEntry } from "@/lib/archive";
import { Icon } from "./icons";

const categories = ["All", "Blog", "Projects", "Notes", "Slides", "Template"];
export function ArchiveBrowser({ entries }: { entries: Omit<ArchiveEntry, "body">[] }) {
  const params = useSearchParams();
  const requested = params.get("category") || "All";
  const [category, setCategory] = useState(categories.includes(requested) ? requested : "All");
  const [query, setQuery] = useState("");
  const filtered = entries.filter(entry => (category === "All" || entry.category === category) && `${entry.title} ${entry.summary} ${entry.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  function selectCategory(value: string) { setCategory(value); window.history.replaceState(null, "", value === "All" ? "/archive" : `/archive?category=${value}`); }
  return <div className="container"><div className="archive-controls"><div className="filter-tabs" aria-label="Filter archive by category">{categories.map(item => <button className="filter-tab" aria-pressed={category === item} onClick={() => selectCategory(item)} key={item}>{item}</button>)}</div><label className="search-field archive-search"><Icon name="search" size={16} /><input aria-label="Search the archive" placeholder="Find an entry…" value={query} onChange={event => setQuery(event.target.value)} /></label></div><p className="archive-result-count" role="status">{filtered.length} {filtered.length === 1 ? "entry" : "entries"}{category !== "All" ? ` in ${category.toLowerCase()}` : " in the collection"}</p>{filtered.length ? <div className="archive-grid">{filtered.map(entry => <Link className="archive-card" href={`/archive/${entry.slug}`} key={entry.slug}>{entry.image ? <Image className="archive-card-image" src={entry.image} alt="" width={600} height={340} sizes="(max-width: 380px) 100vw, (max-width: 900px) 50vw, 33vw" /> : <div className="archive-card-placeholder" aria-hidden="true">{entry.category === "Notes" ? "ℤ" : entry.category === "Slides" ? "Aa" : "✳"}</div>}<div className="archive-card-copy"><span className="eyebrow">{entry.category === "Notes" ? "NUMBER THEORY" : `${entry.category.toUpperCase()} · ORIGINAL COLLECTION`}</span><h2>{entry.title.replace(/^[^\p{L}\p{N}]+/u, "")}</h2><p>{entry.summary}</p><div className="archive-card-bottom"><span>{entry.category === "Notes" ? "Read note" : entry.category === "Projects" ? "Explore project" : "Read more"}</span><Icon name="arrow" size={16} /></div></div></Link>)}</div> : <div className="empty-state"><p>No entries match your search.</p><button className="text-link" onClick={() => { setQuery(""); selectCategory("All"); }}>Clear filters <Icon name="arrow" size={14} /></button></div>}</div>;
}
