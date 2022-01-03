import { tagprop } from "./sample.js";
import div from "../base/div.js";
import * as doc_core from "./core.js";

export default [
	{
		title: "Division",
		msg: ["Helper to create {{&lt;div&gt;&lt;/div&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'div'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new div({
				attr: {
					"data-test": "test",
				},
				elem: "Example",
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new div({ elem: "Using elem property" }),
				new div("Direct elem property"),
				new div("classname", "Direct class and elem property"),
			];
		},
	},
];
