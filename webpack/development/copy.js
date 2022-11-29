const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					filter: (resourcePath) => {
						return !resourcePath.match(/\.map$/i);
					},
					from: path.resolve(__dirname, "../../source"),
					to: path.resolve(__dirname, "../../client/src/dist"),
				},
			],
		}),
	],
	cache: false,
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
