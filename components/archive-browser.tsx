"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { ArchiveEntry } from "@/lib/archive";
import { Icon } from "./icons";

export function ArchiveBrowser({
  entries,
}: {
  entries: Omit<ArchiveEntry, "body">[];
}) {
  const params = useSearchParams();
  const requested = params.get("category") || "All";
  const [query, setQuery] = useState("");
  const filtered = entries.filter(
    (entry) =>
      `${entry.title} ${entry.summary} ${entry.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="container">
      <div className="archive-controls">
        <label className="search-field archive-search">
          <Icon name="search" size={16} />
          <input
            aria-label="Search the archive"
            placeholder="Find an entry…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <p className="archive-result-count" role="status">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>
      {filtered.length ? (
        <div className="archive-grid">
          {filtered.map((entry) => (
            <Link
              className="archive-card"
              href={`${entry.link}`}
              target="_blank" 
              rel="noopener noreferrer"
              key={entry.link}
            >
              {entry.image ? (
                <Image
                  className="archive-card-image"
                  src={entry.image}
                  alt=""
                  width={600}
                  height={340}
                  sizes="(max-width: 380px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              ) : (
                <div className="archive-card-placeholder" aria-hidden="true">
                  {entry.category === "Notes"
                    ? "ℤ"
                    : entry.category === "Slides"
                      ? "Aa"
                      : "✳"}
                </div>
              )}
              <div className="archive-card-copy">
                <span className="eyebrow">
                  {entry.category.toUpperCase()} · {entry.role.toUpperCase()}
                </span>
                <h2>{entry.title.replace(/^[^\p{L}\p{N}]+/u, "")}</h2>
                <p>{entry.summary}</p>
                <div className="archive-card-bottom">
                  <Icon name="arrow" size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No entries match your search.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
            }}
          >
            Clear filters <Icon name="arrow" size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
