"use strict";
import sample from "./sample.js";
import abbr from "../base/abbr.js";
import div from "../base/div.js";

export default [
	{
		title: "Abbreviation",
		msg: ["Helper to create {{&lt;abbr&gt;&lt;/abbr&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'abbr'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "abbr"],
		code: () => {
			return new div({
				elem: [
					"This is ",
					new abbr({
						title: "title",
						elem: "abbr",
					}),
					" text",
				],
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: sample.formcontainer,
		import: ["abbr"],
		code: () => {
			return [
				new abbr({ class: "classname", elem: "Using elem property" }),
				new abbr("classname", "Direct class and elem property"),
				new abbr("Direct elem property"),
			];
		},
	},
];
