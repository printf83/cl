const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = {
	mode: "development",
	plugins: [
		new RemovePlugin({
			before: {
				include: ["./dist", "./client/src/cl"],
				test: [
					{
						folder: "./client/src",
						method: (absoluteItemPath) => {
							return new RegExp(/\.bundle\.js/, "m").test(absoluteItemPath);
						},
						recursive: true,
					},
					{
						folder: "./client/src",
						method: (absoluteItemPath) => {
							return new RegExp(/client_src_\S+\.css/, "m").test(absoluteItemPath);
						},
						recursive: true,
					},
				],
			},
		}),
	],
};
