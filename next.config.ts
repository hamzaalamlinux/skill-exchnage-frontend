/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      'http://172.18.0.1:3000', // your dev machine/browser IP & port
      'http://localhost:3000'   // optional if you access via localhost too
    ],
  },
};

module.exports = nextConfig;
