/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep a running dev server from overwriting production chunks during verification.
  distDir: process.env.NODE_ENV === "production" ? ".next-production" : ".next"
};

export default nextConfig;
