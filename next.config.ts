import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
