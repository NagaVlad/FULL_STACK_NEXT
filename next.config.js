/** @type {import('next').NextConfig} */


const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups'
  },
  { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
  { key: 'Referrer-Policy', value: 'no-referrer' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  { key: 'Expect-CT', value: 'enforce, max-age=86400' },
  {
    key: 'Content-Security-Policy',
    value: `object-src 'none'; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests`
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()'
  }
]

const nextConfig = {
  webpack(config, options) {
    const { dev, isServer } = options;

    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
  typescript: {
    // !!! WARN !!!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !!! WARN !!!
    // ignoreBuildErrors: true,
  },
  env: {
    PUBLIC_URL: '/',
  },
  reactStrictMode: false,
  images: {

    domains: ['localhost', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '5000',
        pathname: 'http/localhost:5000/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  }
}

module.exports = nextConfig
