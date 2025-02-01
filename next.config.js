/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make pdfjs work
    return config;
  },
};
module.exports = nextConfig;
// next.config.js
module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve("buffer/"),
    };
    return config;
  },
};
