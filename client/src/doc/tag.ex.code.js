"use strict";
import sample from "./sample.js";
import code from "../../cl/js/base/code.js";
import ul from "../../cl/js/base/ul.js";

export default [
	{
		title: "Code",
		msg: ["Helper to create {{&lt;code&gt;&lt;/code&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'code'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["code"],
		code: () => {
			return new code({
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
					return `<code>new code(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["code"],
		code: () => {
			return [
				new code({ class: "classname", elem: "<div>Using elem property</div>" }),
				new code("classname", "<div>Direct class and elem property</div>"),
				new code("<div>Direct elem property</div>"),
			];
		},
	},
];
