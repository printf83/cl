"use strict";
import sample from "./sample.js";
import * as alert from "../dist/cl/base/alert.js";
import div from "../dist/cl/base/div.js";
import span from "../dist/cl/base/span.js";
import ul from "../dist/cl/base/ul.js";

export default [
	{
		title: "Span",
		msg: ["Helper to create {{&lt;span&gt;&lt;/span&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'span'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"CL option property that inherits from tag component :",
			sample.tagpropCl(),
			"Bootstrap option property that inherits from tag component :",
			sample.tagpropBootstrap(),
			new alert.container({
				color: "primary",
				elem: "If the Bootstrap property value is not supported by bootstrap, it will be process as <b>style</b> or <b>html</b> property (if supported)",
			}),
			"CSS option property that inherits from tag component :",
			sample.tagpropCss(),
			"Html option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropHtml(),
		],
	},

	{
		title: "Example",
		import: ["div", "span"],
		code: () => {
			return new div({
				elem: [
					"This is ",

					//marker
					new span({
						"data-test": "test",
						elem: "span",
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
					return `<code>new span(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["span"],
		code: () => {
			return [
				new span({ class: "classname", elem: "Using elem property" }),
				new span("classname", "Direct class and elem property"),
				new span("Direct elem property"),
			];
		},
	},
];
