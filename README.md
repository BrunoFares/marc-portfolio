# Marc Fares — personal academic website

A modern editorial redesign of `marc-website`, built in Next.js App Router, React 19, TypeScript, and custom CSS, matching the frontend stack of `anghami/adops-reporting`. The exact Next.js version is 16.3.0. This public content site does not require the reporting app’s PostgreSQL/Prisma database or Google sign-in.

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
- The old blog, project, publication, and event URLs redirect to their new destinations. Homepage anchors `papers`, `talks`, `skills-hobbies`, `awards`, and `languages` still work.
- Markdown supports tables, task lists, raw HTML sanitized before rendering, LaTeX math, audio, expandable answers, notebook code/output, and the original chart data. Hugo shortcodes are converted to portable equivalents. Mermaid/Markmap diagrams are retained as readable source examples; the sample slide deck is presented as a scrollable article. Original source is available on every archive page.

## Editing

- `components/home/home.tsx`: homepage layout and introductory text.
- `data/profile.json`: education, experience, interests, languages, skills, and award.
- `data/publication.json`: publication metadata, abstract, and citation.
- `data/archive.json`: imported article bodies and metadata.
- `app/globals.css`: theme colors, base typography, and shared UI styles (containers, buttons, section headings, dialogs, and search fields).
- `components/<name>/<name>.tsx` and `components/<name>/<name>.css`: each component and its stylesheet share a dedicated folder, including responsive and print rules. Import the stylesheet with `import "./<name>.css"` and use regular `className` strings. These are plain CSS stylesheets, so keep component-specific selectors distinct and use shared classes from `app/globals.css` where appropriate.
- `app/page.tsx`, `app/layout.tsx`, and `app/not-found.tsx`: thin Next.js entry files that export the implementations from the `home`, `root-layout`, and `not-found` component folders. The root layout entry imports the global stylesheet before component styles.
- `public/uploads/resume.pdf`: downloadable CV.

The archival import can be repeated with `node scripts/import-content.mjs /absolute/path/to/marc-website`. It overwrites the imported JSON and original-content copies, so preserve any edits to those files first. It never changes the source site.

## Checks

```sh
npm run lint
npm run build
npm run typecheck
```

The production build prerenders the homepage and all 27 archive entries. Imported mathematical transcriptions are kept as supplied, including source/OCR imperfections. Template examples are labeled in the archive. The original site’s content license and third-party asset attributions remain applicable; see `public/original-site/LICENSE.md` and the source documents.
