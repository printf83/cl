"use strict";
import sample from "./sample.js";
import tag from "../base/tag.js";

export default [
	{
		title: "Background",
		msg: "Convey meaning through {{color}} property and add decoration with {{gradients}} property.",
		anchor: false,
	},

	{
		title: "Background color",
		msg: [
			"Similar to the contextual text color classes, set the background of an element to any contextual class. Background utilities <b>do not set</b> {{color}}, so in some cases you’ll want to use {{textcolor}} property.",
		],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
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
			].map((i) => {
				return new tag({
					tag: "div",
					color: i,
					padding: 3,
					elem: `Example element with <b>color: ${i}</b>`,
				});
			});
		},
	},

	{
		title: "Background gradient",
		msg: [
			"By setting {{gradient:true}} property, a linear gradient is added as background image to the backgrounds. This gradient starts with a semi-transparent white which fades out to the bottom.",
		],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
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
			].map((i) => {
				return new tag({
					tag: "div",
					color: i,
					gradient: true,
					padding: 3,
					elem: `Example element with <b>color: ${i}</b>`,
				});
			});
		},
	},
];
