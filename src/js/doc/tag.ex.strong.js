"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Strong",
		msg: ["Helper to create {{&lt;strong&gt;&lt;/strong&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new $.tag({tag:'strong'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new $.div({
				elem: [
					"This is ",
					new $.strong({
						attr: {
							"data-test": "test",
						},
						elem: "strong",
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
		code: function () {
			return [
				new $.strong({ class: "classname", elem: "Using elem property" }),
				new $.strong("classname", "Direct class and elem property"),
				new $.strong("Direct elem property"),
			];
		},
	},
];
