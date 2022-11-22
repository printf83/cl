"use strict";
import sample from "./sample.js";
import * as alert from "../dist/cl/base/alert.js";
import pre from "../dist/cl/base/pre.js";
import ul from "../dist/cl/base/ul.js";

export default [
	{
		title: "Preformatted",
		msg: ["Helper to create {{&lt;pre&gt;&lt;/pre&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'pre'})}}",
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
		import: ["pre"],
		code: () => {
			return new pre({
				"data-test": "test",
				elem: "<div>Example</div>",
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,elem", "elem"].map((i) => {
					return `<code>new pre(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["pre"],
		code: () => {
			return [
				new pre({ class: "classname", elem: "<div>Using elem property</div>" }),
				new pre("classname", "<div>Direct class and elem property</div>"),
				new pre("<div>Direct elem property</div>"),
			];
		},
	},
];
