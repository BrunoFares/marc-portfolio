"use client";

import "./header.css";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons/icons";

type SearchItem = {
  title: string;
  href: string;
  category: string;
  keywords?: string;
};
const nav = [
  ["About", "bio"],
  ["Research", "research"],
  ["Publications", "papers"],
  ["Talks", "talks"],
  ["Background", "background"],
  ["Extracurriculars", "extracurriculars"]
];

export function Header({ searchItems }: { searchItems: SearchItem[] }) {
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("bio");
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const openSearch = () => {
    setQuery("");
    dialog.current?.showModal();
  };

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.dataset.theme === "dark"),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const initial = window.requestAnimationFrame(() =>
      setDark(document.documentElement.dataset.theme === "dark"),
    );
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(initial);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    nav.forEach(([, id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setDark(next);
    try {
      localStorage.setItem("marc-theme", next ? "dark" : "light");
    } catch {}
  };
  const results = searchItems
    .filter((item) =>
      `${item.title} ${item.category} ${item.keywords || ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 12);

  return (
    <>
      <header className="site-header">
        <div className="header-inner container">
          <Link
            className="brand"
            href="/"
            aria-label="Marc Fares home"
            onClick={() => setMenu(false)}
          >
            <span className="monogram">
              mf<span>.</span>
            </span>
            <span>Marc Fares</span>
          </Link>
          <nav
            className={["main-nav", (menu ? "is-open" : "")].join(" ")}
            aria-label="Main navigation"
            id="main-navigation"
          >
            {nav.map(([label, id]) => (
              <Link
                key={id}
                href={`/#${id}`}
                className={pathname === "/" && active === id ? "active" : ""}
                aria-current={
                  pathname === "/" && active === id ? "location" : undefined
                }
                onClick={() => setMenu(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search site"
              title="Search (⌘K)"
              onClick={openSearch}
            >
              <Icon name="search" size={18} />
            </button>
            <button
              className="icon-button theme-button"
              aria-label={
                dark ? "Switch to light theme" : "Switch to dark theme"
              }
              onClick={toggleTheme}
            >
              <Icon name={dark ? "sun" : "moon"} size={18} />
            </button>
            <a className="header-contact" href="mailto:me@mjfares.com">
              Let’s talk <Icon name="arrow" size={14} />
            </a>
            <button
              className="icon-button mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="main-navigation"
              onClick={() => setMenu(!menu)}
            >
              <Icon name={menu ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-labelledby="search-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-heading">
          <h2 id="search-title">Find something.</h2>
          <button
            className="icon-button"
            aria-label="Close search"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <label className="search-field">
          <Icon name="search" />
          <input
            autoFocus
            aria-label="Search pages and topics"
            placeholder="Search pages, research, notes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="search-results" aria-live="polite">
          {results.length ? (
            results.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={() => {
                  dialog.current?.close();
                  setMenu(false);
                }}
              >
                <span>
                  <small>{item.category}</small>
                  {item.title}
                </span>
                <Icon name="arrow" size={16} />
              </Link>
            ))
          ) : (
            <p className="empty-state">
              No results for “{query}”. Try a topic like geometry or teaching.
            </p>
          )}
        </div>
        <div className="dialog-hint">
          Navigate with Tab <span>Esc to close</span>
        </div>
      </dialog>
    </>
  );
}
