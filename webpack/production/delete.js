const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = {
	mode: "production",
	plugins: [
		new RemovePlugin({
			before: {
				include: ["./dist", "./client/src/dist"],
			},
		}),
	],
};
