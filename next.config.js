/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const nextConfig = {
  reactStrictMode: true,
  ...nextTranslate(),
  env: {
    CPFED_API_URL: process.env.CPFED_API_URL
  }
};

module.exports = nextConfig;
