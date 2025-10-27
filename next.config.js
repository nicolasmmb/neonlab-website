/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Necessário para Docker standalone output
  output: 'standalone',
}

module.exports = nextConfig
