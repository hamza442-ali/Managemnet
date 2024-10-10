/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    domains: ['i.ibb.co'], // Correct domain for ibb.co images
  },
};

export default nextConfig;
