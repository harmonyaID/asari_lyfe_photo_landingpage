import CopyPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
                        to: "../public/js/bootstrap.js"
                    }
                ]
            })
        )

        return config
    }
};

export default nextConfig;
