/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",

	output: {
		filename: "[name].[fullhash].bundle.js",
		path: path.resolve(__dirname, "dist/prod"),
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
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[fullhash].css",
			chunkFilename: "[id].[chunkhash].css",
		}),

		new Dotenv({
			path: "./.env.prod",
		}),
	],
});
