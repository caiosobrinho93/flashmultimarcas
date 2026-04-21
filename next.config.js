/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/flashmultimarcas',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}

module.exports = nextConfig