"use strict";
import { tagprop } from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Preformatted",
		msg: ["Helper to create {{&lt;pre&gt;&lt;/pre&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new $.tag({tag:'pre'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new $.pre({
				attr: {
					"data-test": "test",
				},
				elem: "<div>Example</div>",
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: $.container.form,
		code: function () {
			return [
				new $.pre({ class: "classname", elem: "<div>Using elem property</div>" }),
				new $.pre("classname", "<div>Direct class and elem property</div>"),
				new $.pre("<div>Direct elem property</div>"),
			];
		},
	},
];
