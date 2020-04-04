const path = require("path");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.ts"),
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "index.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts"],
        alias: {
            "@src": path.resolve(__dirname, "src")
        }
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(__dirname, "tsconfig.json")
                    }
                }
            }
        ]
    }
};
