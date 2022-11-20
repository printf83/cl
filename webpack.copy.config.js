const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const _module_mode = "development";
const _module_cache = false;
const _module_optimization = {
	minimize: true,
	minimizer: [
		new TerserPlugin({
			exclude: /_doc_/,
			parallel: true,
			terserOptions: {
				format: {
					comments: false,
				},
			},
			extractComments: false,
		}),
	],
};
const _module_resolve = {
	modules: [path.resolve("./node_modules"), path.resolve("./source/cl"), path.resolve("./client/src")],
	extensions: [".ts", ".css", ".js"],
};

const _module_rule = {
	rules: [
		{
			test: /\.css$/i,
			// use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
			use: ["style-loader", "css-loader"],
		},
	],
};

module.exports = {
	mode: _module_mode,
	plugins: [
		new CopyPlugin(
			{
				patterns: [
					{
						from: path.resolve(__dirname, "source/cl"),
						to: path.resolve(__dirname, "client/src/cl"),
						force: true,
					},
				],
			},
			{ copyUnmodified: true }
		),
		// new MiniCssExtractPlugin(),
	],
	cache: _module_cache,
	optimization: _module_optimization,
	module: _module_rule,
	resolve: _module_resolve,
};
