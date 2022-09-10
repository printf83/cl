"use strict";
import sample from "./sample.js";
import tag from "../base/tag.js";
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
				item: ["none", "sm", "true", "lg"].map((i) => {
					return `<code>${i}</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-shadow",
		import: ["tag"],
		code: () => {
			return ["none", "sm", true, "lg"].map((i) => {
				return new tag({
					tag: "div",
					elem: `This is an example of using <code>shadow:${i}</code>`,

					//marker
					shadow: i,
				});
			});
		},
	},
];
