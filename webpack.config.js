/* eslint-disable max-lines-per-function */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");

module.exports = (env) => ({
	mode: env.production ? "production" : "development",
	entry: "./index.js",
	devtool: "inline-source-map",

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: env.production ? "[name].[fullhash].bundle.js" : "[name].bundle.js",
		clean: true,
	},

	module: {
		rules: [
			{
				test: /\.s(c|a)ss$/i,
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

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			title: "Snake",
			filename: "index.html",
			template: "index.html",
			inject: false,
		}),
		new MiniCssExtractPlugin({
			filename: env.production ? "[name].[fullhash].css" : "[name].css",
			chunkFilename: env.production ? "[id].[chunkhash].css" : "[id].css",
		}),
		new ESLintPlugin(),
	],

	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		port: 3000,
	},
});
