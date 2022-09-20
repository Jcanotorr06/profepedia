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
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        },
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' https://www.googletagmanager.com 'unsafe-eval' 'unsafe-inline';
            script-src-elem 'self' https://www.googletagmanager.com 'unsafe-inline';
            img-src 'self' data:;
            style-src 'self' fonts.googleapis.com 'unsafe-inline';
            font-src 'self' fonts.googleapis.com fonts.gstatic.com;
            connect-src 'self' https://csedztxtiukroxbgzshj.supabase.co https://api.openai.com https://www.googletagmanager.com/gtag/js?id=G-F32L3CFGJV https://vitals.vercel-insights.com/v1/vitals
          `.replace(/\s{2,}/g, ' ').trim()
        }
      ]
    }]
  }
});
