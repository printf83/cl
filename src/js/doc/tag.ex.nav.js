"use strict";
import sample from "./sample.js";
import nav from "../base/nav.js";
import ul from "../base/ul.js";

export default [
	{
		title: "Navigation",
		msg: ["Helper to create {{&lt;nav&gt;&lt;/nav&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'nav'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["nav"],
		code: () => {
			return new nav({
				attr: { "data-test": "test" },
				elem: "Example navigation",
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,elem", "elem"].map((i) => {
					return `<code>new nav(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["nav"],
		code: () => {
			return [
				new nav({ class: "classname", elem: "Navigation 1" }),
				new nav("classname", "Navigation 2"),
				new nav("Navigation 3"),
			];
		},
	},
];
