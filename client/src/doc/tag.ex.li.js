"use strict";
import sample from "./sample.js";
import ul from "../dist/cl/base/ul.js";
import li from "../dist/cl/base/li.js";

export default [
	{
		title: "List item",
		msg: ["Helper to create {{&lt;li&gt;&lt;/li&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'li'})}}",
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
		import: ["ul", "li"],
		code: () => {
			return new ul({
				elem: [
					//marker
					new li({ "data-test": "test", elem: "Item 1" }),
					new li({ "data-test": "test", elem: "Item 2" }),
					new li({ "data-test": "test", elem: "Item 3" }),
					new li({ "data-test": "test", elem: "Item 4" }),
					//-
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
					return `<code>new li(${i})</code>`;
				}),
			}),
		],
		import: ["ul", "li"],
		code: () => {
			return new ul({
				elem: [
					new li({ class: "classname", elem: "Item 1" }),
					new li("classname", "Item 2"),
					new li("Item 3"),
					new li("Item 4"),
				],
			});
		},
	},
];
