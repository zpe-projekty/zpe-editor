const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PACKAGE = require("../package.json");

const PATHS = {
    STATIC: path.resolve(__dirname, "./static"),
    SRC: path.resolve(__dirname, "./src"),
    BUILD: path.resolve(__dirname, "./build")
};

module.exports = function (env, argv) {
    const IS_DEV = env.production ? false : true;

    return {
        mode: env.production ? "production" : "development",
        devtool: "cheap-module-source-map",
        entry: path.resolve(PATHS.SRC, "emulator.ts"),
        output: {
            path: PATHS.BUILD,
            filename: "editor-emulator.js",
            libraryTarget: "module",
            clean: true
        },
        experiments: {
            outputModule: true
        },
        externals: {},
        resolve: {
            alias: {
                "~": path.join(PATHS.SRC)
            },
            modules: ["packages", "node_modules", "src"],
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        devServer: {
            static: [path.resolve(PATHS.STATIC)],
            open: false,
            hot: false,
            host: "0.0.0.0",
            port: 8080
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        // ...
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                modules: "local"
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: PATHS.STATIC,
                        to: "./",
                        info: { minimized: true },
                        globOptions: {
                            ignore: ["*.DS_Store"]
                        }
                    }
                ]
            }),
            new HtmlWebpackPlugin({
                minify: false,
                title: `${PACKAGE.name} ${PACKAGE.version}`,
                favicon: path.resolve(PATHS.STATIC, "favicon.png"),
                template: path.resolve(PATHS.SRC, "emulator.html"),
                filename: "editor-emulator.html"
            })
        ],
        optimization: {
            minimize: false
        }
        // ...
    };
};
