const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PACKAGE = require("./package.json");
const { runtime, library } = require("webpack");
const env = require("process").env;

const PATHS = {
    STATIC: path.resolve(__dirname, "./static"),
    SRC: path.resolve(__dirname, "./src"),
    BUILD: path.resolve(__dirname, "./build"),
    EMULATOR_BUILD: path.resolve(__dirname, "./emulator/build"),
    DATA: path.resolve(__dirname, "./data")
};

module.exports = [
    // Editor Build
    // ===================================================
    function (env, argv) {
        const IS_DEV = env.production ? false : true;
        console.log("******", env, env.production);

        return {
            mode: env.production ? "production" : "development",
            devtool: IS_DEV ? "cheap-module-source-map" : false,
            entry: {
                editor: {
                    import: path.resolve(PATHS.SRC, "main.ts"),
                    filename: "editor.js"
                }
            },
            output: {
                path: PATHS.BUILD,
                libraryTarget: "amd",
                filename: "[name].js",
                clean: {
                    keep: /.git|.gitignore|.github/
                }
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
                static: [
                    env.data ? path.resolve(env.data) : path.resolve(PATHS.DATA)
                ],
                open: false,
                hot: false,
                host: "0.0.0.0",
                port: 8080
                // setupMiddlewares: (middlewares, devServer) => {
                //     if (!devServer) {
                //         throw new Error("webpack-dev-server is not defined");
                //     }
                //     devServer.app.get("/schema.json", (req, res) => {
                //         if (env.schema) {
                //             const schemaFile = path.resolve(
                //                 PATHS.DATA,
                //                 env.schema
                //             );
                //             res.sendFile(schemaFile);
                //         } else {
                //             const defaultSchemaFile = path.resolve(
                //                 PATHS.DATA,
                //                 "schema.json"
                //             );
                //             res.sendFile(defaultSchemaFile);
                //         }
                //     });
                //     return middlewares;
                // }
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
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
                                    // modules: "local"
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
                            from: PATHS.EMULATOR_BUILD,
                            to: "./",
                            info: { minimized: true },
                            globOptions: {
                                dot: true,
                                ignore: [
                                    "**/*.DS_Store",
                                    "**/editor-emulator.html"
                                ]
                            }
                        }
                    ]
                }),
                new HtmlWebpackPlugin({
                    title: `${PACKAGE.name} ${PACKAGE.version} - Editor Emulator`,
                    favicon: path.resolve(PATHS.EMULATOR_BUILD, "favicon.png"),
                    template: path.resolve(
                        PATHS.EMULATOR_BUILD,
                        "editor-emulator.html"
                    ),
                    filename: IS_DEV ? "index.html" : "editor-emulator.html",
                    minify: false, //env.production ? true : false,
                    chunks: ["editor"]
                })
            ],
            optimization: {
                minimize: false
            }
        };
    }
];
