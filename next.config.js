/** @type {import('next').NextConfig} */
/* import withPWA from 'next-pwa'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig */

const withPWA = require("next-pwa");
 
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  swcMinify: true,
});
