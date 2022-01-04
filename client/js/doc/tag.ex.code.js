import { tagprop } from "./sample.js";
import code from "../base/code.js";
import * as doc_core from "./core.js";

export default [
	{
		title: "Code",
		msg: ["Helper to create {{&lt;code&gt;&lt;/code&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'code'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		code: function () {
			return new code({
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
				new code({ class: "classname", elem: "<div>Using elem property</div>" }),
				new code("<div>Direct elem property</div>"),
				new code("classname", "<div>Direct class and elem property</div>"),
			];
		},
	},
];
