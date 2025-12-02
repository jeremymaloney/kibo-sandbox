import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sb.usc1.gcp.kibocommerce.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.boundtree.com",
      },
      {
        protocol: "https",
        hostname: "cdn.boundtree.com",
      },
      {
        protocol: "https",
        hostname: "cdn-sb.mozu.com",
      },
    ],
  },
};

export default nextConfig;
