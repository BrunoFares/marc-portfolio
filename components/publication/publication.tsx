"use client";

import "./publication.css";
import { useRef, useState } from "react";
import publication from "@/data/publication.json";
import { Icon, TriangleArt } from "@/components/icons/icons";

export function Publication() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(publication.citation);
      setCopied(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  };
  return (
    <>
      <article className="publication-card">
        <div className="publication-art">
          <span className="art-label">GEOMETRY × COMBINATORICS</span>
          <TriangleArt />
          <span className="art-equation">a² + b² + c² = 3abc</span>
        </div>
        <div className="publication-copy">
          <div className="publication-meta">
            <span className="badge">PREPRINT</span>
            <span>JANUARY 2026</span>
          </div>
          <h3>
            <p>
              {publication.title}
            </p>
          </h3>
          <p className="publication-author">
            Marc Fares <span>·</span> arXiv:2601.14090
          </p>
          <p className="publication-summary">
            A generalization of period collapse from Fibonacci triangles to all
            Markov triangles, using integral affine geometrical methods.
          </p>
          <div className="tags">
            {publication.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <details className="abstract">
            <summary>
              Read abstract <Icon name="chevron" size={15} />
            </summary>
            <p>{publication.abstract}</p>
          </details>
          <div className="publication-actions">
            <a
              className="button button-primary"
              href="https://arxiv.org/abs/2601.14090"
              target="_blank"
              rel="noreferrer"
            >
              Read paper <Icon name="arrow" size={16} />
            </a>
            <button
              className="text-link"
              onClick={() => {
                setCopied(false);
                setFailed(false);
                dialog.current?.showModal();
              }}
            >
              Cite this paper <Icon name="copy" size={15} />
            </button>
          </div>
        </div>
      </article>
      <dialog
        className="citation-dialog"
        ref={dialog}
        aria-labelledby="citation-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-heading">
          <h2 id="citation-title">Cite this paper</h2>
          <button
            className="icon-button"
            aria-label="Close citation"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <p>BibTeX · Period collapse of Markov triangles</p>
        <pre tabIndex={0}>{publication.citation}</pre>
        <div className="publication-actions">
          <button className="button button-primary" onClick={copy}>
            <Icon name={copied ? "check" : "copy"} size={16} />
            {copied ? "Copied" : "Copy BibTeX"}
          </button>
          <a
            className="text-link"
            href="/uploads/markov-triangles.bib"
            download
          >
            Download .bib <Icon name="download" size={16} />
          </a>
        </div>
        <p className="copy-status" aria-live="polite">
          {failed
            ? "Select the citation above to copy it, or download the BibTeX file."
            : copied
              ? "Citation copied to clipboard."
              : ""}
        </p>
      </dialog>
    </>
  );
}
