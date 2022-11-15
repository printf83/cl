"use strict";
import sample from "./sample.js";
import div from "../../cl/js/base/div.js";
import footer from "../../cl/js/base/footer.js";
import ul from "../../cl/js/base/ul.js";

export default [
	{
		title: "Span",
		msg: ["Helper to create {{&lt;footer&gt;&lt;/footer&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'footer'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "footer"],
		code: () => {
			return new div({
				elem: new footer({
					"data-test": "test",
					elem: "Example",
				}),
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,elem", "elem"].map((i) => {
					return `<code>new footer(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["footer"],
		code: () => {
			return [
				new footer({ class: "classname", elem: "Using elem property" }),
				new footer("classname", "Direct class and elem property"),
				new footer("Direct elem property"),
			];
		},
	},
];
