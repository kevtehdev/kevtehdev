import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  agentRules: false,
  poweredByHeader: false,
  // Pages from the diskette version of the site, which grew with each shipped project.
  async redirects() {
    return [{ source: "/:lang(en|sv)/:view(upgrade|roadmap)", destination: "/:lang", permanent: true }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
