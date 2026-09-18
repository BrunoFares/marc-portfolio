import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import archive from "@/data/archive.json";
import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: { default: "Marc Fares — Mathematics & Geometry", template: "%s · Marc Fares" },
  description: "Marc Fares, PhD student in Mathematics at Université de Neuchâtel. Research in symplectic geometry, Lagrangian almost toric fibrations, and Ehrhart theory.",
  authors: [{ name: "Marc Fares" }],
  openGraph: { title: "Marc Fares — Mathematics & Geometry", description: "PhD student in Mathematics at Université de Neuchâtel. Research, publications, and teaching.", type: "website" },
};

const items = [
  { title: "About Marc Fares", href: "/#bio", category: "Profile", keywords: "PhD Mathematics Neuchâtel CV biography" },
  { title: "Research interests", href: "/#research", category: "Research", keywords: "Symplectic Geometry Lagrangian Almost Toric Fibrations Floer Theory Contact Geometry Ehrhart Theory Differential Topology" },
  { title: "Period collapse of Markov triangles", href: "/#papers", category: "Publication", keywords: "arxiv preprint 2026 combinatorics" },
  { title: "Lebanese Math Day 2026", href: "/#talks", category: "Talk" },
  { title: "Education & experience", href: "/#background", category: "Background" },
  { title: "Technical skills", href: "/#skills-hobbies", category: "Background", keywords: "LaTeX Geogebra Mathematica Python C++" },
  { title: "General Khalil Kanaan Award", href: "/#awards", category: "Awards" },
  { title: "Languages", href: "/#languages", category: "Background", keywords: "Arabic French English German" },
  ...archive.map(({ title, slug, category, tags }) => ({ title, href: `/archive/${slug}`, category, keywords: tags.join(" ") }))
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('marc-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){}` }} /></head><body id="top"><a className="skip-link" href="#main">Skip to content</a><Header searchItems={items} />{children}<Footer /></body></html>;
}
