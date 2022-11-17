const path = require("path");
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
	extensions: [".json", ".js"],
};

const _module_rule = {
	rules: [
		{
			test: /\.css$/i,
			// use: [MiniCssExtractPlugin.loader, "css-loader"],
			use: ["style-loader", "css-loader"],
		},
	],
};

module.exports = [
	{
		mode: _module_mode,
		entry: path.resolve(__dirname, "client/src/index.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			chunkFilename: "index.[name].bundle.js",
			filename: "index.bundle.js",
		},
		// plugins: [new MiniCssExtractPlugin()],
		cache: _module_cache,
		optimization: _module_optimization,
		module: _module_rule,
		resolve: _module_resolve,
	},

	{
		mode: _module_mode,
		entry: path.resolve(__dirname, "client/src/sandbox.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			chunkFilename: "sandbox.[name].bundle.js",
			filename: "sandbox.bundle.js",
		},
		// plugins: [new MiniCssExtractPlugin()],
		cache: _module_cache,
		optimization: _module_optimization,
		module: _module_rule,
		resolve: _module_resolve,
	},
	{
		mode: _module_mode,
		entry: path.resolve(__dirname, "client/src/test.js"),
		output: {
			path: path.resolve(__dirname, "client/src"),
			chunkFilename: "test.[name].bundle.js",
			filename: "test.bundle.js",
		},
		// plugins: [new MiniCssExtractPlugin()],
		cache: _module_cache,
		optimization: _module_optimization,
		module: _module_rule,
		resolve: _module_resolve,
	},
];
