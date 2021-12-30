import * as sample from "./sample.js";
import * as doc_core from "./core.js";
import tag from "../base/tag.js";

export default [
	{
		title: "Bootstrap class helper for text",
		msg: "This property is create to help user to create <code>class</code> property base on bootstrap class.",
		anchor: false,
	},

	{
		title: "align",
		msg: [
			"Create class <code>text-{value}</code> for element",
			"Supported value: <code>null | start | center | end | viewport-size</code>",
			"This property support multiple provided in array",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, "start", "center", "end", ["end", "md-start", "lg-center"]].map(function (i) {
				return new tag({
					tag: "div",
					align: i,
					elem: `Example element with <code>align: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "warp",
		msg: [
			"Create class <code>text-warp|text-nowarp</code> for element",
			"Supported value: <code>null | boolean</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, true, false].map(function (i) {
				return new tag({
					tag: "div",
					class: "cl-highlight-element",
					warp: i,
					style: { width: "8rem" },
					elem: "Example element with long text",
				});
			});
		},
	},

	{
		title: "wordbreak",
		msg: ["Create class <code>text-break</code> for element", "Supported value: <code>null | boolean</code>"],
		container: doc_core.formcontainer,
		code: function () {
			return [null, true, false].map(function (i) {
				return new tag({
					tag: "div",
					class: "cl-highlight-element",
					wordbreak: i,
					style: { width: "8rem" },
					elem: "Exampleelementwithlongtext",
				});
			});
		},
	},

	{
		title: "texttransform",
		msg: [
			"Create class <code>text-{value}</code> for element",
			"Supported value: <code>null | lowercase | uppercase | capitalize</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, "lowercase", "uppercase", "capitalize"].map(function (i) {
				return new tag({
					tag: "div",
					texttransform: i,
					elem: `Example element with <code>texttransform: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "fontsize",
		msg: ["Create class <code>fs-{value}</code> for element", "Supported value: <code>null | 1...6</code>"],
		container: doc_core.formcontainer,
		code: function () {
			return [null, 1, 2, 3, 4, 5, 6].map(function (i) {
				return new tag({
					tag: "div",
					fontsize: i,
					elem: `Example element with <code>fontsize: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "fontweight",
		msg: [
			"Create class <code>fw-{value}</code> for element",
			"Supported value: <code>null | bold | bolder | normal | light | lighter</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, "bold", "bolder", "normal", "light", "lighter"].map(function (i) {
				return new tag({
					tag: "div",
					fontweight: i,
					elem: `Example element with <code>fontweight: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "fontitalic",
		msg: [
			"Create class <code>fst-italic | fst-normal</code> for element",
			"Supported value: <code>null | boolean</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, true, false].map(function (i) {
				return new tag({
					tag: "div",
					fontitalic: i,
					elem: `Example element with <code>fontitalic: ${i}</code>`,
				});
			});
		},
	},
	{
		title: "Reset color",
		msg: ["Reset a text or link’s color with .text-reset, so that it inherits the color from its parent."],
		code: function () {
			return new tag({
				tag: "p",
				textcolor: "muted",
				elem: [
					"Muted text with a ",
					new tag({ tag: "a", href: "#", textcolor: "reset", elem: "reset link" }),
					".",
				],
			});
		},
	},
	{
		title: "textdecoration",
		msg: [
			"Create class <code>text-decoration-{value}</code> for element",
			"Supported value: <code>null | boolean | underline | line-through | none</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, true, false, "underline", "line-through", "none"].map(function (i) {
				return new tag({
					tag: "div",
					textdecoration: i,
					elem: `Example element with <code>textdecoration: ${i}</code>`,
				});
			});
		},
	},
	{
		title: "lineheight",
		msg: [
			"Create class <code>lh-{value}</code> for element",
			"Supported value: <code>null | 1 | sm | base | lg</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, 1, "sm", "base", "lg"].map(function (i) {
				return new tag({
					tag: "div",
					class: "cl-highlight-element",
					lineheight: i,
					elem: `Example element with <code>lineheight: ${i}</code>. ${sample.text()}`,
				});
			});
		},
	},
];
