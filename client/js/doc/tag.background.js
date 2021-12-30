import * as core from "../base/core.js";
import * as doc_core from "./core.js";
import tag from "../base/tag.js";

export default [
	{
		title: "Bootstrap class helper for background",
		msg: "This property is create to help user to create <code>class</code> property base on bootstrap class.",
		anchor: false,
	},

	{
		title: "color",
		msg: [
			"Create class <code>bg-{value}</code> for element",
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
				"white",
				"transparent",
			].map(function (i) {
				return new tag({
					tag: "div",
					color: i,
					textcolor: core.getTextColorBaseOnColor(i),
					padding: 3,
					elem: `Example element with <b>color: ${i}</b>`,
				});
			});
		},
	},

	{
		title: "gradient",
		msg: [
			"Create class <code>bg-gradient</code> for element",
			"Supported value: <code>null | boolean</code>",
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
				"white",
				"transparent",
			].map(function (i) {
				return new tag({
					tag: "div",
					color: i,
					gradient: true,
					textcolor: core.getTextColorBaseOnColor(i),
					padding: 3,
					elem: `Example element with <b>color: ${i}</b>`,
				});
			});
		},
	},
];
