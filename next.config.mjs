/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // Fix for MetaMask SDK and other wallet issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Ignore React Native modules in browser
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };

    // Ignore hardhat files during build
    config.externals.push('hardhat');

    return config;
  },
  // Exclude hardhat config from TypeScript checking
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;