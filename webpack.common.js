/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-lines-per-function */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	entry: "./index.js",

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
		clean: true,
	},

	module: {
		rules: [
			{
				test: /\.js$/i,
				use: "babel-loader",
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
		new ESLintPlugin(),
	],
};
