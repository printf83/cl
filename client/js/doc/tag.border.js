import * as core from "../base/core.js";
import * as doc_core from "./core.js";
import tag from "../base/tag.js";

export default [
	{
		title: "Bootstrap class helper for border",
		msg: "This property is create to help user to create <code>class</code> property base on bootstrap class.",
		anchor: false,
	},

	{
		title: "border",
		msg: ["Use border utilities to add or remove an element’s borders. Choose from all borders or one at a time."],
	},

	{
		title: "Additive",
		msg: [
			"Create class <code>border-{value}</code> for element",
			"Supported value: <code>null | true | top | end | bottom | start | </code>",
			"This property support multiple provided in array",
		],
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, true, "top", "end", "bottom", "start", ["bottom", "start"]].map(function (i) {
				return new tag({
					tag: "div",
					border: i,
				});
			});
		},
	},

	{
		title: "Subtractive",
		msg: [
			"Create class <code>border-{value}</code> for element",
			"Supported value: <code>null | false | top-0 | end-0 | bottom-0 | start-0</code>",
			"This property support multiple provided in array",
		],
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, false, "top-0", "end-0", "bottom-0", "start-0", ["bottom-0", "start-0"]].map(function (i) {
				return new tag({
					tag: "div",
					border: ["border", i],
				});
			});
		},
	},

	{
		title: "bordercolor",
		msg: [
			"Create class <code>border border-{value}</code> for element",
			"Supported value: <code>null | BSColor</code>",
			"This property support multiple provided in array",
		],
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "white"].map(
				function (i) {
					return new tag({
						tag: "div",
						bordercolor: i,
					});
				}
			);
		},
	},

	{
		title: "borderweight",
		msg: [
			"Create class <code>border border-{value}</code> for element",
			"Supported value: <code>null | 0...5</code>",
			"This property support multiple provided in array",
		],
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, 0, 1, 2, 3, 4, 5].map(function (i) {
				return new tag({
					tag: "div",
					borderweight: i,
				});
			});
		},
	},

	{
		title: "rounded",
		msg: [
			"Create class <code>border border-{value}</code> for element",
			"Supported value: <code>null | 0...3</code>",
			"This property support multiple provided in array",
		],
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box-dark",
		code: function () {
			return [null, 0, 1, 2, 3].map(function (i) {
				return new tag({
					tag: "div",
					rounded: i,
				});
			});
		},
	},

	{
		title: "roundedtype",
		msg: [
			"Create class <code>border border-{value}</code> for element",
			"Supported value: <code>null | top | end | bottom | start | pill | circle</code>",
			"This property support multiple provided in array",
		],
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box-dark",
		code: function () {
			return [null, "top", "end", "bottom", "start", "pill", "circle"].map(function (i) {
				return new tag({
					tag: "div",
					roundedtype: i,
					style: {
						width: i === "pill" ? "10rem" : null,
					},
				});
			});
		},
	},
];
