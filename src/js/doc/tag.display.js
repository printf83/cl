"use strict";
import tag from "../base/tag.js";
import ul from "../base/ul.js";
import * as table from "../base/table.js";

export default [
	{
		title: "Display property",
		msg: "Quickly and responsively toggle the display value of components and more with Bootstrap display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.",
		anchor: false,
	},

	{
		title: "How it works",
		msg: [
			"Change the value of the display property with Bootstrap responsive display utility classes. We purposely support only a subset of all possible values for {{display}}. Classes can be combined for various effects as you need.",
		],
	},

	{
		title: "Notation",
		msg: [
			"Display utility classes that apply to all breakpoints, from {{xs}} to {{xxl}}, have no breakpoint abbreviation in them. This is because those classes are applied from {{min-width: 0;}} and up, and thus are not bound by a media query. The remaining breakpoints, however, do include a breakpoint abbreviation.",
			"As such, the classes are named using the format:",
			new ul({
				item: [
					"<code>{value}</code> for <code>xs</code>",
					"<code>{breakpoint}-{value}</code> for <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code> and <code>xxl</code>",
				],
			}),
			"Where <i>value</i> is one of:",
			new ul({
				item: [
					"none",
					"inline",
					"inline-block",
					"block",
					"grid",
					"table",
					"table-cell",
					"table-row",
					"flex",
					"inline-flex",
				].map((i) => {
					return `<code>${i}</code>`;
				}),
			}),
			"The media queries affect screen widths with the given breakpoint or larger. For example, {{lg-none}} sets {{display: none;}} on {{lg}}, {{xl}}, and {{xxl}} screens.",
		],
	},

	{
		title: "Examples",
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "div",
					padding: 2,
					bgColor: "primary",
					display: "inline", //marker
					elem: "d-inline",
				}),
				new tag({
					tag: "div",
					padding: 2,
					bgColor: "dark",
					display: "inline", //marker
					elem: "d-inline",
				}),
			];
		},
	},

	{
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "div",
					padding: 2,
					bgColor: "primary",
					display: "block", //marker
					elem: "d-inline",
				}),
				new tag({
					tag: "div",
					padding: 2,
					bgColor: "dark",
					display: "block", //marker
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
			new table.container({
				item: [
					{ label: "Scree size", opt: "display:" },
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
				].map((i, ix) => {
					return [
						i.label,
						ix === 0
							? i.opt
							: Array.isArray(i.opt)
							? i.opt
									.map((j) => {
										return `<code>${j}</code>`;
									})
									.join(", ")
							: `<code>${i.opt}</code>`,
					];
				}),
			}),
		],
		import: ["tag"],
		code: () => {
			return [
				{ label: "hide on lg and wider screens", opt: "lg-none" },
				{ label: "hide on screens smaller than lg", opt: ["none", "lg-block"] },
			].map((i) => {
				return new tag({
					tag: "div",
					display: i.opt, //marker
					elem: i.label,
				});
			});
		},
	},

	{
		title: "Display in print",
		msg: [
			"Change the {{display}} value of elements when printing with Bootstrap print display utility classes. Includes support for the same display values as Bootstrap responsive display utilities.",
			"Includes support for the same {{display}} values as Bootstrap responsive {{viewport}} utilities.",
			new ul({
				item: [
					"none",
					"inline",
					"inline-block",
					"block",
					"grid",
					"table",
					"table-cell",
					"table-row",
					"flex",
					"inline-flex",
				].map((i) => {
					return `<code>print-${i}</code>`;
				}),
			}),
		],
		import: ["tag"],
		code: () => {
			return [
				{ label: "Screen only (Hide on print only)", opt: "print-none" },
				{ label: "Print Only (Hide on screen only)", opt: ["none", "print-block"] },
				{
					label: "Hide up to large on screen, but always show on print",
					opt: ["none", "lg-block", "print-block"],
				},
			].map((i) => {
				return new tag({
					tag: "div",
					display: i.opt, //marker
					elem: i.label,
				});
			});
		},
	},
];
