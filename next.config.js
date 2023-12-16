/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: '*.googleusercontent.com' },
    ],
  },
}

module.exports = nextConfig
