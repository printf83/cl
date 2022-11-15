"use strict";
import sample from "./sample.js";
import tag from "../../cl/js/base/tag.js";
import * as alert from "../../cl/js/base/alert.js";

export default [
	{
		title: "Colors",
		msg: "Convey meaning through color with a handful of color utility classes. Includes support for styling links with hover states, too.",
		anchor: false,
	},

	{
		title: "Colors",
		msg: [
			"Colorize text with {{textColor}} property. If you want to colorize links, you can use the {{linkColor}} property which have :hover and :focus states.",
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
				"muted",
				"white",
				"black-50",
				"white-50",
			].map((i) => {
				return new tag({
					tag: "div",
					textColor: i, //marker
					elem: `Example element with <code>textColor: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Reset color",
		msg: ["Reset a text or link’s color with .text-reset, so that it inherits the color from its parent."],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "p",
				textColor: "muted",
				elem: [
					"Muted text with a ",
					new tag({
						tag: "a",
						href: "#",
						textColor: "reset", //marker
						elem: "reset link",
					}),
					".",
				],
			});
		},
	},

	{
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [null, "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new tag({
					tag: "a",
					href: "#",
					linkColor: i, //marker
					elem: `Example link with <code>linkColor: ${i}</code>`,
				});
			});
		},
	},

	{
		msg: new alert.container({
			color: "primary",
			elem: [
				new alert.heading("Conveying meaning to assistive technologies"),
				"Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text hidden with the <code>.visually-hidden</code> class.",
			],
		}),
	},

	{
		title: "Specificity",
		msg: "Sometimes contextual classes cannot be applied due to the specificity of another selector. In some cases, a sufficient workaround is to wrap your element’s content in a <code>&lt;div&gt;</code> or more semantic element with the desired class.",
		anchor: true,
	},
];
