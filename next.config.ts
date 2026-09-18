import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/publications", destination: "/#papers", permanent: true },
      { source: "/publications/preprint", destination: "/#papers", permanent: true },
      { source: "/events", destination: "/#talks", permanent: true },
      { source: "/events/example", destination: "https://lebanesemathday-2026.netlify.app/", permanent: true },
      { source: "/authors/:path*", destination: "/#bio", permanent: true },
      { source: "/resume.pdf", destination: "/uploads/resume.pdf", permanent: true },
      { source: "/blog", destination: "/archive?category=Blog", permanent: true },
      { source: "/projects", destination: "/archive?category=Projects", permanent: true },
      { source: "/blog/:slug", destination: "/archive/blog/:slug", permanent: true },
      { source: "/projects/:slug", destination: "/archive/projects/:slug", permanent: true },
      { source: "/slides/:slug", destination: "/archive/slides/:slug", permanent: true }
    ];
  }
};
export default nextConfig;
