import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.FLASK_SERVER_SIDE_ONLY}/api/:path*`, // Backend address reachable from the Next.js server.
      },
    ];
  },
  turbopack: {
    // ...
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
