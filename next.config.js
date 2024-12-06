/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  ...nextTranslate(),
  env: {
    CPFED_API_URL: process.env.CPFED_API_URL
  }
};

module.exports = nextConfig;
