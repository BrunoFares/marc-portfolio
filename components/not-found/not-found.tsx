import "./not-found.css";
import Link from "next/link";
export default function NotFound() { return <main id="main" className="not-found container"><span className="eyebrow" style={{justifyContent:"center"}}>404 · A SMALL DETOUR</span><h1>Outside the coordinates.</h1><p>This page could not be found. There’s more to explore back home.</p><Link href="/" className="button button-primary">Return home ↗</Link></main>; }
