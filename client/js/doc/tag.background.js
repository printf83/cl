"use strict";
import sample from "./sample.js";
import tag from "../../cl/js/base/tag.js";

export default [
	{
		title: "Background",
		msg: "Convey meaning through {{color}} property and add decoration with {{gradients}} property.",
		anchor: false,
	},

	{
		title: "Background color",
		msg: [
			"Similar to the contextual text color classes, set the background of an element to any contextual class. Background utilities <b>do not set</b> {{color}}, so in some cases you’ll want to use {{textColor}} property.",
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
			].map((i) => {
				return new tag({
					tag: "div",
					padding: 3,
					bgColor: i, //marker
					textBgColor: i, //marker
					elem: `Example element with <b>bgColor: ${i}</b>`,
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
			].map((i) => {
				return new tag({
					tag: "div",
					padding: 3,
					bgColor: i,
					bgGradient: true, //marker
					textBgColor: i, //marker
					elem: `Example element with <b>bgColor: ${i}</b>`,
				});
			});
		},
	},
];
