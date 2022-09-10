"use strict";
import sample from "./sample.js";
import ol from "../base/ol.js";
import ul from "../base/ul.js";
import li from "../base/li.js";

export default [
	{
		title: "Ordered list",
		msg: ["Helper to create {{&lt;ol&gt;&lt;/ol&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'ol'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["ol", "li"],
		code: () => {
			return new ol({
				attr: { "data-test": "test" },
				elem: [new li("Item"), new li("Item"), new li("Item"), new li("Item")],
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
		import: ["ol", "li"],
		code: () => {
			return new ol({
				attr: { "data-test": "test" },
				item: ["Item", "Item", "Item", "Item"],
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,elem", "class,item", "elem"].map((i) => {
					return `<code>new ol(${i})</code>`;
				}),
			}),
		],
		import: ["ol", "li"],
		code: () => {
			return [
				new ol({
					class: "classname",
					item: ["Item", "Item", "Item", "Item"],
				}),
				new ol({
					class: "classname",
					elem: [new li("Item"), new li("Item"), new li("Item"), new li("Item")],
				}),
				new ol("classname", [new li("Item"), new li("Item"), new li("Item"), new li("Item")]),
				new ol([new li("Item"), new li("Item"), new li("Item"), new li("Item")]),
			];
		},
	},
];
