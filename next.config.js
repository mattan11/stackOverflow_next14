/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['example.com'],
  },
}

module.exports = nextConfig
