import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [],
    unoptimized: false,
  },
  // Allow importing three.js and related packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
