/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable favicon requests to prevent 404 errors
    async headers() {
        return [
            {
                source: '/favicon.ico',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    
                ],
            },
        ];
    },
};

module.exports = nextConfig; 