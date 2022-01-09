const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		index: "./src/js/index.js",
		sandbox: "./src/js/sandbox.js",
		component: "./src/js/component.js",
		doc: "./src/js/doc.js",
	},
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
	devtool: "source-map",
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: false,
					enclose: false,
					toplevel: false,
					keep_classnames: true,
					keep_fnames: true,
					compress: false,
				},
			}),
		],
	},
};
