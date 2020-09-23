const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.ts",
        attackAlarm: "./src/attackAlarm.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "[name].js",
        libraryTarget: "umd"
    },
    externals: {
        typeorm: "commonjs typeorm"
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
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
