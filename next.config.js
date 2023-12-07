/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'https://images.unsplash.com' }],
  },
}

module.exports = nextConfig