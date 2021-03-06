"use strict";
import sample from "./sample.js";
import $ from "../component.js";

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
		container: sample.formcontainer,
		code: function () {
			return [
				new $.tag({
					tag: "div",
					float: "start",
					elem: `Float start on all viewport sizes`,
				}),
				new $.tag({
					tag: "div",
					float: "end",
					elem: `Float end on all viewport sizes`,
				}),
				new $.tag({
					tag: "div",
					float: "none",
					elem: `Don't float on all viewport sizes`,
				}),
			];
		},
	},

	{
		title: "Responsive",
		msg: ["Responsive variations also exist for each {{float}} value."],
		container: sample.formcontainer,
		code: function () {
			return [
				new $.tag({
					tag: "div",
					float: "sm-end",
					elem: `Float end on viewports sized SM (small) or wider`,
				}),
				new $.tag({
					tag: "div",
					float: "md-end",
					elem: `Float end on viewports sized MD (medium) or wider`,
				}),
				new $.tag({
					tag: "div",
					float: "lg-end",
					elem: `Float end on viewports sized LG (large) or wider`,
				}),
				new $.tag({
					tag: "div",
					float: "xl-end",
					elem: `Float end on viewports sized XL (extra-large) or wider`,
				}),
			];
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{float}} property.",
			new $.ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map(function (i) {
						return ["start", "end", "none"].map(function (j) {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},
];
