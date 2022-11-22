"use strict";
import sample from "./sample.js";
import b from "../dist/cl/base/b.js";
import div from "../dist/cl/base/div.js";
import ul from "../dist/cl/base/ul.js";

export default [
	{
		title: "Bold",
		msg: ["Helper to create {{&lt;b&gt;&lt;/b&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'b'})}}",
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
		import: ["div", "b"],
		code: () => {
			return new div({
				elem: [
					"This is ",

					//marker
					new b({
						"data-test": "test",
						elem: "bold",
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
					return `<code>new b(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["b"],
		code: () => {
			return [
				new b({ class: "classname", elem: "Using elem property" }),
				new b("classname", "Direct class and elem property"),
				new b("Direct elem property"),
			];
		},
	},
];
