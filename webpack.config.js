const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
// const CSSPlugin = require("css-loader");
// const StylePlugin = require("style-loader");

module.exports = [
	{
		mode: "development",
		plugins: [
			new CopyPlugin({
				patterns: [
					{ from: path.resolve(__dirname, "source/cl"), to: path.resolve(__dirname, "client/src/cl") },
				],
			}),
		],
	},
	{
		mode: "development",
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
				// Additional configuration to handle *.css files
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
			],
		},
	},
	{
		mode: "development",
		entry: path.resolve(__dirname, "client/src/index.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			filename: "index.bundle.js",
		},
	},
	{
		mode: "development",
		entry: path.resolve(__dirname, "client/src/sandbox.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			filename: "sandbox.bundle.js",
		},
	},
	{
		mode: "development",
		entry: path.resolve(__dirname, "client/src/test.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			filename: "test.bundle.js",
		},
	},
];
