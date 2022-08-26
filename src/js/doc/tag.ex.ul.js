"use strict";
import sample from "./sample.js";
import ul from "../base/ul.js";
import li from "../base/li.js";

export default [
	{
		title: "Unordered list",
		msg: ["Helper to create {{&lt;ul&gt;&lt;/ul&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'ul'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["ul", "li"],
		code: () => {
			return new ul({
				attr: { "data-test": "test" },
				elem: [new li("Item 1"), new li("Item 2"), new li("Item 3"), new li("Item 4")],
			});
		},
	},

	{
		title: "Addtional property",
		msg: [
			"We add some special property into this component:",
			new ul({
				item: ["<code>item</code> - only works if elem not provided. Shorcut for create li item"],
			}),
		],
		import: ["ul"],
		code: () => {
			return new ul({
				attr: { "data-test": "test" },
				item: ["Item 1", "Item 2", "Item 3", "Item 4"],
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		import: ["ul", "li"],
		code: () => {
			return [
				new ul({
					class: "classname",
					item: ["Item 1", "Item 2", "Item 3", "Item 4"],
				}),
				new ul({
					class: "classname",
					elem: [new li("Item 1"), new li("Item 2"), new li("Item 3"), new li("Item 4")],
				}),
				new ul("classname", [new li("Item 1"), new li("Item 2"), new li("Item 3"), new li("Item 4")]),
				new ul([new li("Item 1"), new li("Item 2"), new li("Item 3"), new li("Item 4")]),
			];
		},
	},
];
