"use strict";
import sample from "./sample.js";
import b from "../base/b.js";
import div from "../base/div.js";

export default [
	{
		title: "Bold",
		msg: ["Helper to create {{&lt;b&gt;&lt;/b&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'b'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "b"],
		code: () => {
			return new div({
				elem: [
					"This is ",
					new b({
						attr: {
							"data-test": "test",
						},
						elem: "bold",
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
		import: ["b"],
		code: () => {
			return [
				new b({ class: "classname", elem: "Using elem property" }),
				new b("classname", "Direct class and elem property"),
				new b("Direct elem property"),
			];
		},
	},
];
