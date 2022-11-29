"use strict";
import sample from "./sample.js";
import btnclose from "../dist/cl/base/btnclose.js";

export default [
	{
		title: "Close button",
		msg: "A generic close button for dismissing content like modals and alerts.",
		anchor: false,
	},

	{
		title: "Example",
		import: ["btnclose"],
		container: sample.stackcontainer,
		code: () => {
			return new btnclose();
		},
	},

	{
		title: "Style",
		import: ["btnclose"],
		container: sample.stackcontainer,
		code: () => {
			return [
				new btnclose({ style: 0 }), //bootstrap
				new btnclose({ style: 1 }), //cl style 1
				new btnclose({ style: 2 }), //cl style 2
				new btnclose({ style: 3 }), //using font-awesome
			];
		},
	},

	{
		title: "Disabled state",
		import: ["btnclose"],
		container: sample.stackcontainer,
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
					disabled: true,
					dark: false, //marker
				}),
			];
		},
	},
];
