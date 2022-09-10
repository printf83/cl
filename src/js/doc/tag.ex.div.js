"use strict";
import sample from "./sample.js";
import div from "../base/div.js";
import ul from "../base/ul.js";

export default [
	{
		title: "Division",
		msg: ["Helper to create {{&lt;div&gt;&lt;/div&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'div'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div"],
		code: () => {
			return new div({
				attr: {
					"data-test": "test",
				},
				elem: "Example",
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,elem", "elem"].map((i) => {
					return `<code>new div(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["div"],
		code: () => {
			return [
				new div({ class: "classname", elem: "Using elem property" }),
				new div("Direct elem property"),
				new div("classname", "Direct class and elem property"),
			];
		},
	},
];
