"use strict";
import sample from "./sample.js";
import div from "../dist/cl/base/div.js";
import small from "../dist/cl/base/small.js";
import ul from "../dist/cl/base/ul.js";

export default [
	{
		title: "Small",
		msg: ["Helper to create {{&lt;small&gt;&lt;/small&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'small'})}}",
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
		import: ["div", "small"],
		code: () => {
			return new div({
				elem: [
					"This is ",

					//marker
					new small({
						"data-test": "test",
						elem: "small",
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
					return `<code>new small(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["small"],
		code: () => {
			return [
				new small({ class: "classname", elem: "Using elem property" }),
				new small("classname", "Direct class and elem property"),
				new small("Direct elem property"),
			];
		},
	},
];
