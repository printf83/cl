"use strict";
import sample from "./sample.js";
import div from "../base/div.js";
import span from "../base/span.js";

export default [
	{
		title: "Span",
		msg: ["Helper to create {{&lt;span&gt;&lt;/span&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'span'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "span"],
		code: () => {
			return new div({
				elem: [
					"This is ",
					new span({
						attr: {
							"data-test": "test",
						},
						elem: "span",
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
		import: ["span"],
		code: () => {
			return [
				new span({ class: "classname", elem: "Using elem property" }),
				new span("classname", "Direct class and elem property"),
				new span("Direct elem property"),
			];
		},
	},
];
