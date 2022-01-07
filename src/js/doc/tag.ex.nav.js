import { tagprop } from "./sample.js";
import nav from "../base/nav.js";
import * as doc_core from "./core.js";

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
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new nav({
				attr: { "data-test": "test" },
				elem: "Example navigation",
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new nav({ class: "classname", elem: "Navigation 1" }),
				new nav("classname", "Navigation 2"),
				new nav("Navigation 3"),
			];
		},
	},
];
