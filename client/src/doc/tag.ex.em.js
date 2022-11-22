"use strict";
import sample from "./sample.js";
import em from "../dist/cl/base/em.js";
import div from "../dist/cl/base/div.js";
import ul from "../dist/cl/base/ul.js";

export default [
	{
		title: "Emphasis",
		msg: ["Helper to create {{&lt;em&gt;&lt;/em&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'em'})}}",
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
		import: ["div", "em"],
		code: () => {
			return new div({
				elem: [
					"This is ",

					//marker
					new em({
						"data-test": "test",
						elem: "emphasis",
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
					return `<code>new em(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["em"],
		code: () => {
			return [
				new em({ class: "classname", elem: "Using elem property" }),
				new em("classname", "Direct class and elem property"),
				new em("Direct elem property"),
			];
		},
	},
];
