"use strict";
import * as sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Form",
		msg: ["Helper to create {{&lt;form&gt;&lt;/form&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new $.tag({tag:'form'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new $.form({
				attr: {
					"data-test": "test",
				},
				elem: "Example",
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: sample.formcontainer,
		code: function () {
			return [
				new $.form({ class: "classname", elem: "Using elem property" }),
				new $.form("Direct elem property"),
				new $.form("classname", "Direct class and elem property"),
			];
		},
	},
];
