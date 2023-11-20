/** @type {import('next').NextConfig} */
const path = require('path');

// const nextConfig = {
//     images: {
//         remotePatterns: [
//           {
//             protocol: 'https',
//             hostname: 'storage.ya2sin.fr',
//             port: '',
//             pathname: '/uploads/**',
//           },
//         ],
//       },
//     sassOptions: {
//         includePaths: [path.join(__dirname, 'styles')],
//       },
// }

// module.exports = nextConfig
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.ya2sin.fr',
        port: '',
        pathname: '/uploads/**',
      },
    ],
    minimumCacheTTL: 604800,
  },
sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },

  // ...other config
}