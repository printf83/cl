"use strict";
import sample from "./sample.js";
import * as alert from "../dist/cl/base/alert.js";
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
