import tag from "../base/tag.js";
import * as doc_core from "./core.js";
import ul from "../base/ul.js";

export default [
	{
		title: "Shadows",
		msg: "Add or remove shadows to elements with box-shadow utilities.",
		anchor: false,
	},

	{
		title: "Examples",
		msg: [
			"Supported value for {{shadow}} property.",
			new ul({
				item: ["none", "sm", "true", "lg"].map(function (i) {
					return `<code>${i}</code>`;
				}),
			}),
		],
		container: doc_core.formcontainer,
		viewclass: "cl-highlight-shadow",
		code: function () {
			return ["none", "sm", true, "lg"].map(function (i) {
				return new tag({
					tag: "div",
					shadow: i,
					elem: `This is an example of using <code>shadow:${i}</code>`,
				});
			});
		},
	},
];
