const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "development",
	plugins: [
		new CopyPlugin(
			{
				patterns: [
					{
						from: path.resolve(__dirname, "source/cl"),
						to: path.resolve(__dirname, "client/src/dist/cl"),
						force: true,
					},
				],
			},
			{ copyUnmodified: true }
		),
	],
	cache: false,
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				exclude: /_doc_/,
				parallel: true,
				terserOptions: {
					format: {
						comments: false,
					},
					mangle: false,
				},
				extractComments: false,
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		modules: [path.resolve("./node_modules"), path.resolve("./source/cl"), path.resolve("./client/src")],
		extensions: [".ts", ".css", ".js"],
	},
};
