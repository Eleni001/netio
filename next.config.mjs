/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'nordicnest.se',
      },
      {
        protocol: 'https',
        hostname: 'nordicnest.com',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
