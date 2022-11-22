"use strict";
import sample from "./sample.js";
import div from "../dist/cl/base/div.js";
import ul from "../dist/cl/base/ul.js";

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
		import: ["div"],
		code: () => {
			return new div({
				"data-test": "test",
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
