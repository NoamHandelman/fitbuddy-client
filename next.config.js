/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd38sh0xhlkw1p8.cloudfront.net',
      },
    ],
  },
};

module.exports = nextConfig;
