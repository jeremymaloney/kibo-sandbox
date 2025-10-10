import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.kibocommerce.com',
      },
    ],
  },
}

export default nextConfig