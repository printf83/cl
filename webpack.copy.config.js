const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
	plugins: [new MiniCssExtractPlugin()],
	rules: [
		// {
		// 	test: /\.js$/i,
		// 	exclude: /node_modules/,
		// 	use: "babel-loader",
		// },
		{
			test: /\.css$/i,
			use: [MiniCssExtractPlugin.loader, "css-loader"],
		},
	],
};

module.exports = [
	{
		mode: _module_mode,
		plugins: [
			new CleanWebpackPlugin({
				dry: true,
				output: {
					path: "client/src",
				},
				cleanOnceBeforeBuildPatterns: ["client/src/cl"],
			}),
		],
	},
	{
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
		],
		cache: _module_cache,
		optimization: _module_optimization,
		module: _module_rule,
		resolve: _module_resolve,
	},
];
