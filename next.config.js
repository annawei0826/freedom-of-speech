/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/freedom-of-speech', 
  assetPrefix: '/freedom-of-speech/',
};

export default nextConfig;
