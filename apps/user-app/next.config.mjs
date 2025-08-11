/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@repo/ui', '@repo/store', 'lucide-react', 'recharts'],
  },
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // Enable compression
  compress: true,
  // Optimize for production
  swcMinify: true,
  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    },
  }),
};

export default nextConfig;
