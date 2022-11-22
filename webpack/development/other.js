const path = require("path");

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
				path.resolve(__dirname, "../../client/src/dist"),
			],
			extensions: [".ts", ".css", ".js"],
		},
	};
};

module.exports = [
	fn("index", "../../client/src/index.js", "../../client/src/dist/", "development"),
	fn("sandbox", "../../client/src/sandbox.js", "../../client/src/dist/", "development"),
	fn("test", "../../client/src/test.js", "../../client/src/dist/", "development"),
];
