"use strict";
import { tagprop } from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Span",
		msg: ["Helper to create {{&lt;span&gt;&lt;/span&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new $.tag({tag:'span'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new $.div({
				elem: [
					"This is ",
					new $.span({
						attr: {
							"data-test": "test",
						},
						elem: "span",
					}),
					" text",
				],
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: $.container.form,
		code: function () {
			return [
				new $.span({ class: "classname", elem: "Using elem property" }),
				new $.span("classname", "Direct class and elem property"),
				new $.span("Direct elem property"),
			];
		},
	},
];
