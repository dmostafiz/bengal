/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_API: process.env.BASE_API
  }

}

module.exports = nextConfig