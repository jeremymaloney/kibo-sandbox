import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sb.usc1.gcp.kibocommerce.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig