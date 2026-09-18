import records from "@/data/archive.json";
export type ArchiveEntry = (typeof records)[number];
export const archive = records;
export const archiveIndex = archive.map(entry => ({ slug: entry.slug, title: entry.title, summary: entry.summary, category: entry.category, date: entry.date, tags: entry.tags, authors: entry.authors, imageCaption: entry.imageCaption, base: entry.base, image: entry.image, original: entry.original, links: entry.links, attachments: entry.attachments }));
export function getEntry(slug: string) { return archive.find(entry => entry.slug === slug); }
