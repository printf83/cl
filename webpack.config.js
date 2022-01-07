const path = require("path");

module.exports = {
	entry: { index: "./client/index.js", sandbox: "./client/sandbox.js" },
	output: {
		path: path.resolve(__dirname, "./client/dist"),
		filename: "[name].bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	optimization: {
		minimize: false,
	},
};
