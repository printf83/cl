"use strict";
import sample from "./sample.js";
import * as alert from "../dist/cl/base/alert.js";
import div from "../dist/cl/base/div.js";
import cite from "../dist/cl/base/cite.js";
import ul from "../dist/cl/base/ul.js";

export default [
	{
		title: "Cite",
		msg: ["Helper to create {{&lt;cite&gt;&lt;/cite&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'cite'})}}",
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
		],
	},

	{
		title: "Example",
		import: ["div", "cite"],
		code: () => {
			return new div({
				elem: [
					"This is ",

					//marker
					new cite({
						"data-test": "test",
						elem: "cite",
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
					return `<code>new cite(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["cite"],
		code: () => {
			return [
				new cite({ class: "classname", elem: "Using elem property" }),
				new cite("classname", "Direct class and elem property"),
				new cite("Direct elem property"),
			];
		},
	},
];
