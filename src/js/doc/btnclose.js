"use strict";
import sample from "./sample.js";
import btnclose from "../base/btnclose.js";

export default [
	{
		title: "Close button",
		msg: "A generic close button for dismissing content like modals and alerts.",
		anchor: false,
	},

	{
		title: "Example",
		import: ["btnclose"],
		code: () => {
			return new btnclose();
		},
	},

	{
		title: "Disabled state",
		import: ["btnclose"],
		code: () => {
			return new btnclose({
				//marker
				disabled: true,
			});
		},
	},

	{
		title: "White variant",
		dark: true,
		container: sample.stackcontainer,
		import: ["btnclose"],
		code: () => {
			return [
				new btnclose({
					//marker
					dark: false,
				}),
				new btnclose({
					disabled: true,

					//marker
					dark: false,
				}),
			];
		},
	},
];
