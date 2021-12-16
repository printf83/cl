"use strict";
import input from "../base/input.js";

export default [
	{
		title: "Range",
		msg: "Use our custom range inputs for consistent cross-browser styling and built-in customization.",
		anchor: false,
	},

	{
		title: "Example Range",
		code: function () {
			return new input({
				label: "Simple Range",
				type: "range",
				value: 50,
			});
		},
	},

	{
		title: "Disable",
		code: function () {
			return new input({
				label: "Disable Range",
				type: "range",
				disabled: true,
				value: 50,
			});
		},
	},

	{
		title: "Min and max",
		code: function () {
			return new input({
				label: "Example Range",
				type: "range",
				value: 2.5,
				min: 0,
				max: 5,
			});
		},
	},

	{
		title: "Step",
		code: function () {
			return new input({
				label: "Example Range",
				type: "range",
				value: 2.5,
				min: 0,
				max: 5,
				step: 0.5,
			});
		},
	},
];
