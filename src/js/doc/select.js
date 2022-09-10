"use strict";
import sample from "./sample.js";
import input from "../base/input.js";

export default [
	{
		title: "Select",
		msg: "Customize the native {{&lt;select&gt;}}s with custom CSS that changes the element’s initial appearance.",
		anchor: false,
	},

	{
		title: "Default",
		import: ["input"],
		code: () => {
			return new input({
				label: "Default select example",
				hidelabel: true,
				type: "select",

				//marker
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],
				//-
			});
		},
	},

	{
		title: "Sizing",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			let optitem = [
				{ value: "", label: "Open this select menu", selected: true },
				{ value: "1", label: "One" },
				{ value: "2", label: "Two" },
				{ value: "3", label: "Three" },
			];

			return [
				new input({
					label: "Large select example",
					hidelabel: true,
					type: "select",
					option: optitem,

					//marker
					weight: "lg",
				}),
				new input({
					label: "Default select example",
					hidelabel: true,
					type: "select",
					option: optitem,
				}),
				new input({
					label: "Small select example",
					hidelabel: true,
					type: "select",
					option: optitem,

					//marker
					weight: "sm",
				}),
			];
		},
	},

	{
		title: "Multiple",
		import: ["input"],
		code: () => {
			return new input({
				label: "Multiple select example",
				hidelabel: true,
				type: "select",
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],

				//marker
				multiple: true,
			});
		},
	},

	{
		title: "Size",
		import: ["input"],
		code: () => {
			return new input({
				label: "Size 3 select example",
				hidelabel: true,
				type: "select",
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],

				//marker
				size: 3,
			});
		},
	},

	{
		title: "Disabled",
		import: ["input"],
		code: () => {
			return new input({
				label: "Disabled select example",
				hidelabel: true,
				type: "select",
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],

				//marker
				disabled: true,
			});
		},
	},
];
