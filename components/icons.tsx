import type { CSSProperties } from "react";

export function Icon({ name, size = 20, style }: { name: "arrow" | "download" | "mail" | "sun" | "moon" | "menu" | "close" | "search" | "copy" | "check" | "chevron" | "pin"; size?: number; style?: CSSProperties }) {
  const paths = {
    arrow: <><path d="M5 19 19 5M5 5h14v14" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M20.6 13.3A9 9 0 0 1 10.7 3.4a9 9 0 1 0 9.9 9.9Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V3H3v13h5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name]}</svg>;
}

export function Torus({ className = "" }: { className?: string }) {
  const point = (u: number, v: number) => {
    const x = (95 + 39 * Math.cos(v)) * Math.cos(u);
    const y = (95 + 39 * Math.cos(v)) * Math.sin(u);
    const z = 39 * Math.sin(v);
    return `${(180 + x * .94 + y * .17).toFixed(2)},${(132 + y * .51 - z * .88 - x * .1).toFixed(2)}`;
  };
  const ring = (n: number, fixed: "u" | "v") => Array.from({ length: 101 }, (_, i) => {
    const t = i / 100 * Math.PI * 2;
    return `${i ? 'L' : 'M'}${fixed === 'u' ? point(n, t) : point(t, n)}`;
  }).join(' ') + 'Z';
  return <svg className={className} viewBox="0 0 360 264" fill="none" aria-hidden="true">
    {Array.from({ length: 32 }, (_, i) => <path key={`u${i}`} d={ring(i / 32 * Math.PI * 2, 'u')} stroke="currentColor" strokeWidth=".65" opacity=".6" />)}
    {Array.from({ length: 16 }, (_, i) => <path key={`v${i}`} d={ring(i / 16 * Math.PI * 2, 'v')} stroke="currentColor" strokeWidth=".65" opacity=".6" />)}
  </svg>;
}

export function TriangleArt() {
  return <svg viewBox="0 0 360 290" className="triangle-art" aria-hidden="true">
    <defs><pattern id="lattice" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="11" cy="11" r="1.25" fill="currentColor" opacity=".23" /></pattern></defs>
    <rect width="360" height="290" fill="url(#lattice)" />
    <path d="M60 235 173 42 303 235Z" fill="currentColor" fillOpacity=".055" stroke="currentColor" strokeWidth="1.2" />
    <path d="m60 235 135-111 108 111M173 42l22 82-10 111M60 235l125-66 118 66" stroke="currentColor" strokeWidth=".9" fill="none" opacity=".5" />
    <path d="M34 235h294M60 255V30" stroke="currentColor" opacity=".25" strokeDasharray="3 4" />
    <circle cx="60" cy="235" r="4" fill="currentColor" /><circle cx="173" cy="42" r="4" fill="currentColor" /><circle cx="303" cy="235" r="4" fill="currentColor" />
    <text x="164" y="25" fill="currentColor" fontFamily="Georgia" fontStyle="italic" fontSize="15">c</text><text x="44" y="255" fill="currentColor" fontFamily="Georgia" fontStyle="italic" fontSize="15">a</text><text x="304" y="255" fill="currentColor" fontFamily="Georgia" fontStyle="italic" fontSize="15">b</text>
  </svg>;
}
