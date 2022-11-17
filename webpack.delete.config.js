const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = {
	mode: "development",
	plugins: [
		new RemovePlugin({
			before: {
				include: ["./dist", "./client/src/cl", "./client/src/*.bundle.js"],
			},
		}),
	],
};
