"use strict";
import sample from "./sample.js";
import div from "../cl/base/div.js";
import cite from "../cl/base/cite.js";
import ul from "../cl/base/ul.js";

export default [
	{
		title: "Cite",
		msg: ["Helper to create {{&lt;cite&gt;&lt;/cite&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'cite'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "cite"],
		code: () => {
			return new div({
				elem: [
					"This is ",

					//marker
					new cite({
						"data-test": "test",
						elem: "cite",
					}),
					//-

					" text",
				],
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,elem", "elem"].map((i) => {
					return `<code>new cite(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["cite"],
		code: () => {
			return [
				new cite({ class: "classname", elem: "Using elem property" }),
				new cite("classname", "Direct class and elem property"),
				new cite("Direct elem property"),
			];
		},
	},
];
