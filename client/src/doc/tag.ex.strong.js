"use strict";
import sample from "./sample.js";
import div from "../../cl/js/base/div.js";
import strong from "../../cl/js/base/strong.js";
import ul from "../../cl/js/base/ul.js";

export default [
	{
		title: "Strong",
		msg: ["Helper to create {{&lt;strong&gt;&lt;/strong&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'strong'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "strong"],
		code: () => {
			return new div({
				elem: [
					"This is ",

					//marker
					new strong({
						"data-test": "test",
						elem: "strong",
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
					return `<code>new strong(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["strong"],
		code: () => {
			return [
				new strong({ class: "classname", elem: "Using elem property" }),
				new strong("classname", "Direct class and elem property"),
				new strong("Direct elem property"),
			];
		},
	},
];
