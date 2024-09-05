/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    WC_PROJECT_ID: process.env.WC_PROJECT_ID,
  },
};

module.exports = nextConfig;
