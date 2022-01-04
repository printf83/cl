import { tagprop } from "./sample.js";
import pre from "../base/pre.js";
import * as doc_core from "./core.js";

export default [
	{
		title: "Preformatted",
		msg: ["Helper to create {{&lt;pre&gt;&lt;/pre&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'pre'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new pre({
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
		container: doc_core.formcontainer,
		code: function () {
			return [
				new pre({ class: "classname", elem: "<div>Using elem property</div>" }),
				new pre("classname", "<div>Direct class and elem property</div>"),
				new pre("<div>Direct elem property</div>"),
			];
		},
	},
];
