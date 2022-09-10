"use strict";
import input from "../base/input.js";

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
				label: "Simple Range",
				value: 50,

				//marker
				type: "range",
			});
		},
	},

	{
		title: "Disable",
		import: ["input"],
		code: () => {
			return new input({
				label: "Disable Range",
				type: "range",
				value: 50,

				//marker
				disabled: true,
			});
		},
	},

	{
		title: "Min and max",
		import: ["input"],
		code: () => {
			return new input({
				label: "Example Range",
				type: "range",
				value: 2.5,

				//marker
				min: 0,
				max: 5,
				//-
			});
		},
	},

	{
		title: "Step",
		import: ["input"],
		code: () => {
			return new input({
				label: "Example Range",
				type: "range",
				value: 2.5,
				min: 0,
				max: 5,

				//marker
				step: 0.5,
			});
		},
	},
];
