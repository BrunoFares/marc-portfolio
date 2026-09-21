import type { CSSProperties } from "react";

export function Icon({
  name,
  size = 20,
  style,
}: {
  name:
    | "arrow"
    | "download"
    | "mail"
    | "sun"
    | "moon"
    | "menu"
    | "close"
    | "search"
    | "copy"
    | "check"
    | "chevron"
    | "pin";
  size?: number;
  style?: CSSProperties;
}) {
  const paths = {
    arrow: (
      <>
        <path d="M5 19 19 5M5 5h14v14" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    moon: <path d="M20.6 13.3A9 9 0 0 1 10.7 3.4a9 9 0 1 0 9.9 9.9Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}

export function Torus({ className = "" }: { className?: string }) {
  const point = (u: number, v: number) => {
    const x = (95 + 39 * Math.cos(v)) * Math.cos(u);
    const y = (95 + 39 * Math.cos(v)) * Math.sin(u);
    const z = 39 * Math.sin(v);
    return `${(180 + x * 0.94 + y * 0.17).toFixed(2)},${(132 + y * 0.51 - z * 0.88 - x * 0.1).toFixed(2)}`;
  };
  const ring = (n: number, fixed: "u" | "v") =>
    Array.from({ length: 101 }, (_, i) => {
      const t = (i / 100) * Math.PI * 2;
      return `${i ? "L" : "M"}${fixed === "u" ? point(n, t) : point(t, n)}`;
    }).join(" ") + "Z";
  return (
    <svg
      className={className}
      viewBox="0 0 360 264"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 32 }, (_, i) => (
        <path
          key={`u${i}`}
          d={ring((i / 32) * Math.PI * 2, "u")}
          stroke="currentColor"
          strokeWidth=".65"
          opacity=".6"
        />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={`v${i}`}
          d={ring((i / 16) * Math.PI * 2, "v")}
          stroke="currentColor"
          strokeWidth=".65"
          opacity=".6"
        />
      ))}
    </svg>
  );
}

export function TriangleArt({
  className = "triangle-art",
}: {
  className?: string;
}) {
  // A uniform scale preserves the TikZ geometry; SVG's y-axis points down.
  const project = (x: number, y: number) => ({
    x: 66 + x * 38,
    y: 114 - y * 38,
  });
  const vertices = [
    { ...project(0, 0), label: "2", labelOffset: 22 },
    { ...project(7.5, 0), label: "1", labelOffset: 22 },
    { ...project(2.7, 1.2), label: "5", labelOffset: -13 },
  ];

  return (
    <svg
      viewBox="0 0 398 190"
      className={className}
      role="img"
      aria-label="Triangle on a 10-column, 4-row integer lattice spanning x = -1 to 8 and y = -1 to 2, with vertices labeled 2 at (0, 0), 1 at (7.5, 0), and 5 at (2.7, 1.2)."
    >
      <g fill="currentColor" opacity=".23">
        {Array.from({ length: 10 }, (_, i) =>
          Array.from({ length: 4 }, (_, j) => {
            const point = project(i - 1, j - 1);
            return <circle key={`${i}-${j}`} cx={point.x} cy={point.y} r="1.25" />;
          }),
        )}
      </g>
      <polygon
        points={vertices.map(({ x, y }) => `${x},${y}`).join(" ")}
        fill="currentColor"
        fillOpacity=".1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {vertices.map(({ x, y, label, labelOffset }) => (
        <g key={label} fill="currentColor">
          <circle cx={x} cy={y} r="3" />
          <text
            x={x}
            y={y + labelOffset}
            textAnchor="middle"
            fontFamily="var(--serif)"
            fontStyle="italic"
            fontSize="19"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
