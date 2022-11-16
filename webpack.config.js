const HtmlWebpackPlugin = require("html-webpack-plugin");
const { output } = require("../../ejercicios/spa/login/frontend/webpack.config");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },

    module:{
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ]
}