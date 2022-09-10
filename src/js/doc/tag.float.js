"use strict";
import sample from "./sample.js";
import tag from "../base/tag.js";
import ul from "../base/ul.js";

export default [
	{
		title: "Float",
		msg: "Toggle floats on any element, across any breakpoint, using Bootstrap responsive float utilities.",
		anchor: false,
	},

	{
		title: "Overview",
		msg: [
			"These utility classes float an element to the left or right, or disable floating, based on the current viewport size using the CSS float property. {{!important}} is included to avoid specificity issues. These use the same viewport breakpoints as Bootstrap grid system. Please be aware float utilities have no effect on flex items.",
		],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "div",
					elem: `Float start on all viewport sizes`,

					//marker
					float: "start",
				}),
				new tag({
					tag: "div",
					elem: `Float end on all viewport sizes`,

					//marker
					float: "end",
				}),
				new tag({
					tag: "div",
					elem: `Don't float on all viewport sizes`,

					//marker
					float: "none",
				}),
			];
		},
	},

	{
		title: "Responsive",
		msg: ["Responsive variations also exist for each {{float}} value."],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "div",
					elem: `Float end on viewports sized SM (small) or wider`,

					//marker
					float: "sm-end",
				}),
				new tag({
					tag: "div",
					elem: `Float end on viewports sized MD (medium) or wider`,

					//marker
					float: "md-end",
				}),
				new tag({
					tag: "div",
					elem: `Float end on viewports sized LG (large) or wider`,

					//marker
					float: "lg-end",
				}),
				new tag({
					tag: "div",
					elem: `Float end on viewports sized XL (extra-large) or wider`,

					//marker
					float: "xl-end",
				}),
			];
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{float}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map((i) => {
						return ["start", "end", "none"].map((j) => {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},
];
