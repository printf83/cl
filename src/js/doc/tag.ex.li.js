"use strict";
import { tagprop } from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "List item",
		msg: ["Helper to create {{&lt;li&gt;&lt;/li&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new $.tag({tag:'li'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new $.ul({
				elem: [
					new $.li({ attr: { "data-test": "test" }, elem: "Item 1" }),
					new $.li({ attr: { "data-test": "test" }, elem: "Item 2" }),
					new $.li({ attr: { "data-test": "test" }, elem: "Item 3" }),
					new $.li({ attr: { "data-test": "test" }, elem: "Item 4" }),
				],
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		code: function () {
			return new $.ul({
				elem: [
					new $.li({ class: "classname", elem: "Item 1" }),
					new $.li("classname", "Item 2"),
					new $.li("Item 3"),
					new $.li("Item 4"),
				],
			});
		},
	},
];
