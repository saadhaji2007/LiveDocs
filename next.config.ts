/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreBuildErrors: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
};

module.exports = nextConfig;

