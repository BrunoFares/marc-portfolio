# Marc Fares: personal academic website

A personal portfolio website for my brother Marc Fares, built in Next.js App Router, React 19, TypeScript, and custom CSS. The exact Next.js version is 16.3.0. This public content site does not require the reporting app’s PostgreSQL/Prisma database or Google sign-in.

## Run

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Visit http://localhost:3000. For production:

```sh
npm run build
npm run start
```

The site can run on any host with Next.js support. No environment variables are required. Fonts, the portrait, the CV, and imported attachments are served locally.

## Content and design

- Homepage: academic profile, all six research interests, the Markov triangles preprint and complete abstract, the Lebanese Math Day talk, all education and experience, skill ratings, languages, award, email, and ORCID.
- Archive: 27 pages preserving all six blog posts, three example projects, sixteen number theory transcriptions, the example slide deck as an article, and the original template research statement, education summary, social links, and HugoBlox promotion.
- The existing portrait, CV, BibTeX, audio, notebook, CSV, chart JSON, and original source documents remain downloadable. Original source files are copied without changes under `public/original-site/`.
- Native light/dark themes, system preference and persistence, mobile navigation, section tracking, searchable archive, site search (⌘K / Ctrl+K), accessible citation dialog, copy/download BibTeX, and expandable abstract.
- Markdown supports tables, task lists, raw HTML sanitized before rendering, LaTeX math, audio, expandable answers, notebook code/output, and the original chart data. Hugo shortcodes are converted to portable equivalents. Mermaid/Markmap diagrams are retained as readable source examples; the sample slide deck is presented as a scrollable article. Original source is available on every archive page.

## Editing

- `app/(home)/page.tsx`: homepage composition, publication section, archive, and contact details. The `(home)` route group keeps these files together while serving the homepage at `/`.
- `app/(home)/<section>/`: larger homepage sections (biography, research, talks, background, and personal details), each with its own component and stylesheet, including responsive and print rules. These folders have no `page.tsx` and do not create routes.
- `app/layout.tsx`: document structure, metadata, font imports, theme initialization, and shared header/footer composition. `app/layout.css` styles the skip link.
- `app/not-found.tsx` and `app/not-found.css`: the 404 page and its styles.
- `data/profile.json`: education, experience, interests, languages, skills, and award.
- `data/publication.json`: publication metadata, abstract, and citation.
- `data/archive.json`: imported article bodies and metadata.
- `app/globals.css`: theme colors, base typography, and shared UI styles (containers, buttons, section headings, dialogs, and search fields).
- `app/(home)/home.css`: styles for the smaller sections composed directly in the homepage.
- `components/<name>/<name>.tsx` and `components/<name>/<name>.css`: shared UI and independent widgets such as the header, footer, icons, publication, and archive browser. Each component and its stylesheet share a dedicated folder. Import the stylesheet with `import "./<name>.css"` and use regular `className` strings. These are plain CSS stylesheets, so keep component-specific selectors distinct and use shared classes from `app/globals.css` where appropriate.
- `lib/`: non-UI archive transformations and Markdown preparation. Keep Next.js route exports in `app/`, and add `"use client"` only to components that require interactivity or browser APIs.
- `public/uploads/resume.pdf`: downloadable CV.

Next.js recognizes route entry files by their exact names and locations. Keep the root `layout.tsx` and `not-found.tsx` directly in `app/`, and use `page.tsx` to expose a page. A normal folder adds a URL segment; a folder in parentheses organizes routes without adding a URL segment.

The archival import can be repeated with `node scripts/import-content.mjs /absolute/path/to/marc-website`. It overwrites the imported JSON and original-content copies, so preserve any edits to those files first. It never changes the source site.

## Checks

```sh
npm run lint
npm run build
npm run typecheck
```

The production build prerenders the homepage and all 27 archive entries. Imported mathematical transcriptions are kept as supplied, including source/OCR imperfections. Template examples are labeled in the archive. The original site’s content license and third-party asset attributions remain applicable; see `public/original-site/LICENSE.md` and the source documents.
