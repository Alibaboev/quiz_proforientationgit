const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./app/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        config.module.rules.push({
            test: /\.(png|jpg|jpeg|gif|webp)$/i,
            type: "asset/resource",
        });
        return config;
    },
};

module.exports = nextConfig;

module.exports = withNextIntl(nextConfig);