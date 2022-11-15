"use strict";
import input from "../../cl/js/base/input.js";

export default [
	{
		title: "Range",
		msg: "Use Bootstrap custom range inputs for consistent cross-browser styling and built-in customization.",
		anchor: false,
	},

	{
		title: "Example Range",
		import: ["input"],
		code: () => {
			return new input({
				type: "range", //marker
				value: 50,
				label: "Simple Range",
			});
		},
	},

	{
		title: "Disable",
		import: ["input"],
		code: () => {
			return new input({
				disabled: true, //marker
				type: "range",
				value: 50,
				label: "Disable Range",
			});
		},
	},

	{
		title: "Min and max",
		import: ["input"],
		code: () => {
			return new input({
				type: "range",
				value: 2.5,
				min: 0, //marker
				max: 5, //marker
				label: "Example Range",
			});
		},
	},

	{
		title: "Step",
		import: ["input"],
		code: () => {
			return new input({
				type: "range",
				value: 2.5,
				min: 0,
				max: 5,
				step: 0.5, //marker
				label: "Example Range",
			});
		},
	},
];
