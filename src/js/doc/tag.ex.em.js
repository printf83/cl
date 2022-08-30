"use strict";
import sample from "./sample.js";
import em from "../base/em.js";
import div from "../base/div.js";

export default [
	{
		title: "Emphasis",
		msg: ["Helper to create {{&lt;em&gt;&lt;/em&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'em'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "em"],
		code: () => {
			return new div({
				elem: [
					"This is ",
					new em({
						attr: {
							"data-test": "test",
						},
						elem: "emphasis",
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
		import: ["em"],
		code: () => {
			return [
				new em({ class: "classname", elem: "Using elem property" }),
				new em("classname", "Direct class and elem property"),
				new em("Direct elem property"),
			];
		},
	},
];