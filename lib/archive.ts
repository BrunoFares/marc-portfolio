import records from "@/data/archive.json";
export type ArchiveEntry = (typeof records)[number];
export const archive = records;
export const archiveIndex = archive.map((entry) => ({
  link: entry.link,
  title: entry.title,
  summary: entry.summary,
  category: entry.category,
  role: entry.role,
  date: entry.date,
  tags: entry.tags,
  imageCaption: entry.imageCaption,
  image: entry.image,
}));
export function getEntry(slug: string) {
  return archive.find((entry) => entry.link === slug);
}
