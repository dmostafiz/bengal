/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_API: process.env.BASE_API,
    GOOGLE_CLIENT_ID: '721639709461-pjuq114vpiae24gs165e1aedpp2shau3.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '561683539070348'
  }

}

module.exports = nextConfig