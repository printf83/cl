import * as sample from "./sample.js";
import * as doc_core from "./core.js";
import tag from "../base/tag.js";

export default [
	{
		title: "Bootstrap class helper for display",
		msg: "This property is create to help user to create <code>class</code> property base on bootstrap class.",
		anchor: false,
	},

	{
		title: "display",
		msg: [
			"Create class <code>d-{value}</code> for element",
			"Supported value: <code>null | none | inline | inline-block | block | grid | table | table-cell | table-row | flex | inline-flex<code>",
			"Value can combine with breakpoint like <code>sm | md | lg | xl | xxl</code>",
			"This property support multiple provided in array",
		],
	},

	{
		title: "Examples",
		code: function () {
			return [
				new tag({
					tag: "div",
					display: "inline",
					padding: 2,
					color: "primary",
					textcolor: "white",
					elem: "d-inline",
				}),
				new tag({
					tag: "div",
					display: "inline",
					padding: 2,
					color: "dark",
					textcolor: "white",
					elem: "d-inline",
				}),
			];
		},
	},

	{
		code: function () {
			return [
				new tag({
					tag: "div",
					display: "block",
					padding: 2,
					color: "primary",
					textcolor: "white",
					elem: "d-inline",
				}),
				new tag({
					tag: "div",
					display: "block",
					padding: 2,
					color: "dark",
					textcolor: "white",
					elem: "d-inline",
				}),
			];
		},
	},

	{
		title: "Hiding element",
		msg: [
			"For faster mobile-friendly development, use responsive display classes for showing and hiding elements by device. Avoid creating entirely different versions of the same site, instead hide elements responsively for each screen size.",
			"To hide elements simply use the <code>none</code> class or one of the <code>{sm,md,lg,xl,xxl}-none</code> classes for any responsive screen variation.",
			"To show an element only on a given interval of screen sizes you can combine one <code>*-none</code> class with a <code>-*-*</code> class, for example </code>['none', 'md-block', 'xl-none', 'xxl-none']</code> will hide the element for all screen sizes except on medium and large devices.",
		],
		code: function () {
			return [
				{ label: "Hidden on all", opt: "none" },
				{ label: "Hidden only on xs", opt: ["none", "sm-block"] },
				{ label: "Hidden only on sm", opt: ["sm-none", "md-block"] },
				{ label: "Hidden only on md", opt: ["md-none", "lg-block"] },
				{ label: "Hidden only on lg", opt: ["lg-none", "xl-block"] },
				{ label: "Hidden only on xl", opt: ["xl-none", "xxl-block"] },
				{ label: "Hidden only on xxl", opt: "xxl-none" },
				{ label: "Visible on all", opt: "block" },
				{ label: "Visible only on xs", opt: ["block", "sm-none"] },
				{ label: "Visible only on sm", opt: ["none", "sm-block", "md-none"] },
				{ label: "Visible only on md", opt: ["none", "md-block", "lg-none"] },
				{ label: "Visible only on lg", opt: ["none", "lg-block", "xl-none"] },
				{ label: "Visible only on xl", opt: ["none", "xl-block", "xxl-none"] },
				{ label: "Visible only on xxl", opt: ["none", "xxl-block"] },
			].map(function (i) {
				return new tag({ tag: "div", display: i.opt, elem: i.label });
			});
		},
	},

	{
		title: "Display in print",
		msg: [
			"Change the display value of elements when printing with our print display utility classes. Includes support for the same display values as our responsive display utilities.",
			"Supported value: <code>null | print-none | print-inline | print-inline-block | print-block | print-grid | print-table | print-table-cell | print-table-row | print-flex | print-inline-flex<code>",
		],
		code: function () {
			return [
				{ label: "Screen only (Hide on print only)", opt: "print-none" },
				{ label: "Print Only (Hide on screen only)", opt: ["none", "print-block"] },
				{
					label: "Hide up to large on screen, but always show on print",
					opt: ["none", "lg-block", "print-block"],
				},
			].map(function (i) {
				return new tag({ tag: "div", display: i.opt, elem: i.label });
			});
		},
	},
];
