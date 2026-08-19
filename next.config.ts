import type { NextConfig } from "next";

const githubPagesBase = process.env.GITHUB_ACTIONS ? "/qixi-memory-site" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: githubPagesBase,
};

export default nextConfig;
