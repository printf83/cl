import * as doc_core from "./core.js";
import tag from "../base/tag.js";
import * as alert from "../base/alert.js";

export default [
	{
		title: "Colors",
		msg: "Convey meaning through color with a handful of color utility classes. Includes support for styling links with hover states, too.",
		anchor: false,
	},

	{
		title: "Colors",
		msg: [
			"Colorize text with {{textcolor}} property. If you want to colorize links, you can use the {{linkcolor}} property which have :hover and :focus states.",
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
		container: doc_core.formcontainer,
		code: function () {
			return [null, "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(
				function (i) {
					return new tag({
						tag: "a",
						linkcolor: i,
						href: "#",
						elem: `Example link with <code>linkcolor: ${i}</code>`,
					});
				}
			);
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
