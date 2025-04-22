/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    hourlyRate: process.env.HOURLY_RATE || "64.8",
  },
};

export default nextConfig;
