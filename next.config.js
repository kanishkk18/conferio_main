/* eslint @typescript-eslint/no-var-requires: "off" */
const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');
const withTM = require('next-transpile-modules')(['@jitsi/react-sdk']);



/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boxyhq.com',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      { hostname: "avatar.vercel.sh", port: "", protocol: "https" },
      { hostname: "res.cloudinary.com", port: "", protocol: "https" },
      { hostname: "once-ui.com", port: "", protocol: "https" },
      { hostname: "images.unsplash.com", port: "", protocol: "https" },
      { hostname: "c.saavncdn.com", port: "", protocol: "https" },
      { hostname: "lh3.googleusercontent.com", port: "", protocol: "https" },
      { hostname: "avatars.githubusercontent.com", port: "", protocol: "https" },
      { hostname: "ui8-bento-elements.vercel.app", port: "", protocol: "https" },
      { hostname: "pixabay.com", port: "", protocol: "https" },
      
    ],

  },
  i18n,
  rewrites: async () => {
    return [
      {
        source: '/.well-known/saml.cer',
        destination: '/api/well-known/saml.cer',
      },
      {
        source: '/.well-known/saml-configuration',
        destination: '/well-known/saml-configuration',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains;',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
});

// Additional config options for the Sentry webpack plugin.
// For all available options: https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  silent: true,
  hideSourceMaps: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
