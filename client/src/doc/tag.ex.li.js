"use strict";
import sample from "./sample.js";
import * as alert from "../dist/cl/base/alert.js";
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
			new alert.container({
				color: "primary",
				elem: 'If the Bootstrap property value is not supported by bootstrap, it will be process as <b>style</b> or <b>html</b> property (if supported). <br/><br/><small>Example: <code>padding:1</code> will be processed as Bootstrap (will be translated as <code>class="p-1"</code>) and <code>padding:1rem</code> will be processed as style (will be translated as <code>style="padding: 1rem;"</code>)</small>',
			}),
			"CSS option property that inherits from tag component :",
			sample.tagpropCss(),
			"Html option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropHtml(),
			"Event option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropEvent(),
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
