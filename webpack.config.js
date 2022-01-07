const path = require("path");

module.exports = {
	entry: { index: "./src/js/index.js", sandbox: "./src/js/sandbox.js" },
	output: {
		path: path.resolve(__dirname, "./docs/dist"),
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
