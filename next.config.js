/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    domains: [],
    unoptimized: false,
  },
};

module.exports = nextConfig;
