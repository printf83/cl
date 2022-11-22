"use strict";
import sample from "./sample.js";
import ol from "../dist/cl/base/ol.js";
import ul from "../dist/cl/base/ul.js";
import li from "../dist/cl/base/li.js";

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
			"CL option property that inherits from tag component :",
			sample.tagpropCl(),
			"Bootstrap option property that inherits from tag component :",
			sample.tagpropBootstrap(),
			"If the Bootstrap property value is not supported by bootstrap, it will be process as html property (if supported)",
			"Html option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropHtml(),
		],
	},

	{
		title: "Example",
		import: ["ol", "li"],
		code: () => {
			return new ol({
				"data-test": "test",
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
				"data-test": "test",
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
