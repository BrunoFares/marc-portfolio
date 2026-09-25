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
    ];
  }
};
export default nextConfig;
