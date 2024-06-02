/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.cloudflare-ipfs.com',
        port: '',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
