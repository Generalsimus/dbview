/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: "./tsconfig.json",
    // module:""
  },

  // experimental: { esmExternals: true },
  output: "standalone",
};

module.exports = nextConfig;
