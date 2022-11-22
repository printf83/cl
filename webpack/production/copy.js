const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "../../source"),
					to: path.resolve(__dirname, "../../client/src/dist"),
				},
			],
		}),
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
		modules: [
			path.resolve(__dirname, "../../node_modules"),
			path.resolve(__dirname, "../../source/cl"),
			path.resolve(__dirname, "../../client/src"),
		],
		extensions: [".ts", ".css", ".js"],
	},
};
