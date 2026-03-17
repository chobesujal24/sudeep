/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sudeepengineers.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sudeepengineer.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: 'host',
            value: 'cdn.sudeepengineers.com',
          },
        ],
        destination: "https://ceawmxeopfmvjywmbsen.supabase.co/storage/v1/object/public/images/:path*",
      },
      {
        source: "/:path*",
        has: [
          {
            type: 'host',
            value: 'cdn.sudeepengineer.com',
          },
        ],
        destination: "https://ceawmxeopfmvjywmbsen.supabase.co/storage/v1/object/public/images/:path*",
      },
    ];
  },
};

export default nextConfig;
=======
export default nextConfig;
>>>>>>> 1024775 (Fix build errors, case-insensitive product routing, and custom image CDN)
