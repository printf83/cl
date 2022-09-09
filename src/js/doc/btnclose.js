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
				disabled: true, //marker
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
					dark: false, //marker
				}),
				new btnclose({
					dark: false, //marker
					disabled: true,
				}),
			];
		},
	},
];
