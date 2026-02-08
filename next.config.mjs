/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
    },
    async headers() {
        return [
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        // Cache for 3 months
                        value: 'public, max-age=7776000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;