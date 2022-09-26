/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    "API_KEY": process.env.API_KEY,
    "APP_URL": process.env.APP_URL,
  }
}

module.exports = nextConfig
