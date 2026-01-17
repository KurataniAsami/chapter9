import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['placehold.jp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
}

export default nextConfig
