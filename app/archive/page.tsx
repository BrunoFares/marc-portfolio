import { Suspense } from "react";
import type { Metadata } from "next";
import { ArchiveBrowser } from "@/components/archive-browser";
import { archiveIndex } from "@/lib/archive";

export const metadata: Metadata = { title: "The archive", description: "A collection of blog posts, projects, number theory notes, slides, and the original site content." };
export default function ArchivePage() {
  return <main id="main"><section className="archive-hero container"><span className="eyebrow"><span className="section-marker">THE COLLECTION</span> NOTES, PROJECTS & IDEAS</span><h1>A little more<br /><em>to explore.</em></h1><p>The complete collection from the original site: blog posts, projects, number theory transcriptions, and template examples.</p></section><Suspense fallback={<p className="container">Loading the collection…</p>}><ArchiveBrowser entries={archiveIndex} /></Suspense></main>;
}
