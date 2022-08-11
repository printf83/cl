"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Small",
		msg: ["Helper to create {{&lt;small&gt;&lt;/small&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new $.tag({tag:'small'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		code: () => {
			return new $.div({
				elem: [
					"This is ",
					new $.small({
						attr: {
							"data-test": "test",
						},
						elem: "small",
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
		code: () => {
			return [
				new $.small({ class: "classname", elem: "Using elem property" }),
				new $.small("classname", "Direct class and elem property"),
				new $.small("Direct elem property"),
			];
		},
	},
];
