const path = require("path");

module.exports = {
    webpack: (config, { isServer }) => {
        // Add file-loader for specific file types
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "static/images/",
                        publicPath: "/_next/static/images/",
                    },
                },
            ],
        });

        return config;
    },
};
