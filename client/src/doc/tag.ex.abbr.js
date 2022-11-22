"use strict";
import sample from "./sample.js";
import abbr from "../dist/cl/base/abbr.js";
import div from "../dist/cl/base/div.js";
import ul from "../dist/cl/base/ul.js";

export default [
	{
		title: "Abbreviation",
		msg: ["Helper to create {{&lt;abbr&gt;&lt;/abbr&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'abbr'})}}",
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
		import: ["div", "abbr"],
		code: () => {
			return new div({
				elem: [
					"This is ",

					//marker
					new abbr({
						title: "title",
						elem: "abbr",
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
					return `<code>new abbr(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["abbr"],
		code: () => {
			return [
				new abbr({ class: "classname", elem: "Using elem property" }),
				new abbr("classname", "Direct class and elem property"),
				new abbr("Direct elem property"),
			];
		},
	},
];
