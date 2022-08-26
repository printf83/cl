"use strict";
import sample from "./sample.js";
import form from "../base/form.js";

export default [
	{
		title: "Form",
		msg: ["Helper to create {{&lt;form&gt;&lt;/form&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'form'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["form"],
		code: () => {
			return new form({
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
		import: ["form"],
		code: () => {
			return [
				new form({ class: "classname", elem: "Using elem property" }),
				new form("Direct elem property"),
				new form("classname", "Direct class and elem property"),
			];
		},
	},
];
