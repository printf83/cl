const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const fn = (name, input, output, mode) => {
	return {
		mode: mode,
		entry: path.resolve(__dirname, input),
		output: {
			path: path.resolve(__dirname, output),
			chunkFilename: name + ".[name].bundle.js",
			filename: name + ".bundle.js",
		},
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
						mangle: mode === "production",
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
				path.resolve("./node_modules"),
				path.resolve("./source/cl"),
				path.resolve("./client/src"),
				path.resolve("./client/src/dist"),
			],
			extensions: [".ts", ".css", ".js"],
		},
	};
};

module.exports = [
	fn("index", "client/src/index.js", "client/src/dist", "development"),
	fn("sandbox", "client/src/sandbox.js", "client/src/dist", "production"),
	fn("test", "client/src/test.js", "client/src/dist", "production"),
];
