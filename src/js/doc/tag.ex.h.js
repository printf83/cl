"use strict";
import sample from "./sample.js";
import ul from "../base/ul.js";
import h from "../base/h.js";

export default [
	{
		title: "Heading",
		msg: ["Helper to create {{&lt;h{level}&gt;&lt;/h{level}&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'h{level}'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		container: sample.vstackcontainer,
		import: ["h"],
		code: () => {
			return new h({
				level: 5,
				"data-test": "test",
				elem: "Example",
			});
		},
	},

	{
		title: "Addtional property",
		msg: [
			"We add some special property into this component:",
			new ul({
				item: ["<code>level</code> - to set heading level. The value should 1 to 6. Default is 5"],
			}),
		],
		container: sample.vstackcontainer,
		import: ["h"],
		code: () => {
			return [null, 1, 2, 3, 4, 5, 6].map((i) => {
				return new h({ level: i, elem: `Example <code>level:${i}</code> heading` });
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "level,elem", "class,elem", "level,class,elem"].map((i) => {
					return `<code>new h(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["h"],
		code: () => {
			return [
				new h({ level: 3, class: "classname", elem: "Using elem property" }),
				new h(4, "Direct level and elem property"),
				new h("classname", "Direct class and elem property"),
				new h(6, "classname", "Direct level, class and elem property"),
			];
		},
	},
];
