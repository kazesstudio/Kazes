import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Pin Turbopack's project root to this directory. The project sits inside
   * `C:\Users\emaza`, which contains a `package-lock.json` belonging to a
   * different root; without this, Next walks up, finds that lockfile, warns
   * about ignoring it, and resolves module boundaries against the wrong root.
   */
  turbopack: {
    root: __dirname,
  },
  reactCompiler: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
