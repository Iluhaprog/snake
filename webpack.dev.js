/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const common = require("./webpack.common");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",

	output: {
		path: path.resolve(__dirname, "dist/dev"),
		publicPath: "/",
	},

	module: {
		rules: [
			{
				test: /\.s(c|a)ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"resolve-url-loader",
					"sass-loader",
				],
			},
		],
	},

	plugins: [
		new Dotenv({
			path: "./.env.dev",
		}),
	],

	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},

		devMiddleware: {
			writeToDisk: true,
		},

		historyApiFallback: true,

		port: 3000,
	},
});
