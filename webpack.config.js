const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	plugins: [
		new HtmlWebpackPlugin({
			title: "Snake",
			filename: "index.html",
			template: "./src/template.html",
			inject: false,
		}),
		new MiniCssExtractPlugin(),
		new ESLintPlugin(),
	],
	devtool: "inline-source-map",
	devServer: {
		static: "./dist",
		port: 3000,
	},
	output: {
		filename: "game.bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"resolve-url-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
};
