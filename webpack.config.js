const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
// const CSSPlugin = require("css-loader");
// const StylePlugin = require("style-loader");

const _module_rule = {
	rules: [
		{
			test: /\.js$/i,
			exclude: /node_modules/,
			use: "babel-loader",
		},
		{
			test: /\.css$/i,
			use: ["style-loader", "css-loader"],
		},
	],
};

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
		module: _module_rule,
	},

	{
		mode: "development",
		entry: path.resolve(__dirname, "client/src/index.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			filename: "index.bundle.js",
		},
		module: _module_rule,
	},
	{
		mode: "development",
		entry: path.resolve(__dirname, "client/src/sandbox.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			filename: "sandbox.bundle.js",
		},
		module: _module_rule,
	},
	{
		mode: "development",
		entry: path.resolve(__dirname, "client/src/test.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			filename: "test.bundle.js",
		},
		module: _module_rule,
	},
];
