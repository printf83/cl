"use strict";
import sample from "./sample.js";
import i from "../base/i.js";
import div from "../base/div.js";

export default [
	{
		title: "Italic",
		msg: ["Helper to create {{&lt;i&gt;&lt;/i&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'i'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "i"],
		code: () => {
			return new div({
				elem: [
					"This is ",
					new i({
						attr: {
							"data-test": "test",
						},
						elem: "italic",
					}),
					" text",
				],
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: sample.vstackcontainer,
		import: ["i"],
		code: () => {
			return [
				new i({ class: "classname", elem: "Using elem property" }),
				new i("classname", "Direct class and elem property"),
				new i("Direct elem property"),
			];
		},
	},
];
