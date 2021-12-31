import * as sample from "./sample.js";
import * as doc_core from "./core.js";
import tag from "../base/tag.js";

export default [
	{
		title: "Bootstrap class helper for textcolor",
		msg: "This property is create to help user to create <code>class</code> property base on bootstrap class.",
		anchor: false,
	},

	{
		title: "textcolor",
		msg: [
			"Create class <code>text-{value}</code> for element",
			"Supported value: <code>null | BSColor</code>",
			"This property support multiple provided in array",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [
				null,
				"primary",
				"secondary",
				"success",
				"danger",
				"warning",
				"info",
				"light",
				"dark",
				"body",
				"muted",
				"white",
				"black-50",
				"white-50",
			].map(function (i) {
				return new tag({
					tag: "div",
					textcolor: i,
					elem: `Example element with <code>textcolor: ${i}</code>`,
				});
			});
		},
	},
];
