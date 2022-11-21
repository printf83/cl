const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	mode: "production",
	plugins: [
		new CopyPlugin(
			{
				patterns: [
					{
						from: path.resolve(__dirname, "../../source/cl"),
						to: path.resolve(__dirname, "../../client/src/dist/cl"),
						force: true,
					},
				],
			},
			{ copyUnmodified: true }
		),
		// new MiniCssExtractPlugin(),
		// new CssMinimizerPlugin(),
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
			// new CssMinimizerPlugin({
			// 	test: /\.css$/i,
			// }),
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				// use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
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
