import { tagprop } from "./sample.js";
import p from "../base/p.js";

export default [
	{
		title: "Paragraph",
		msg: ["Helper to create {{&lt;p&gt;&lt;/p&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'p'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new p({
				elem: "Example paragraph element",
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		code: function () {
			return [
				new p({ class: "classname", elem: "Using elem property" }),
				new p("Direct elem property"),
				new p("classname", "Direct class and elem property"),
			];
		},
	},
];
