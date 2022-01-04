import { tagprop } from "./sample.js";
import h from "../base/h.js";
import ul from "../base/ul.js";
import * as doc_core from "./core.js";

export default [
	{
		title: "Heading",
		msg: ["Helper to create {{&lt;h{level}&gt;&lt;/h{level}&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'h{level}'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			tagprop(),
		],
	},

	{
		title: "Example",
		container: doc_core.formcontainer,
		code: function () {
			return new h({
				level: 6,
				attr: {
					"data-test": "test",
				},
				elem: "Example",
			});
		},
	},

	{
		title: "Addtional property",
		msg: [
			"We add some special property into this component:",
			new ul({
				item: ["<code>level</code> - to set heading level. The value should 1 to 6. Default is 5"],
			}),
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, 1, 2, 3, 4, 5, 6].map(function (i) {
				return new h({ level: i, elem: `Example <code>level:${i}</code> heading` });
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new h({ level: 5, class: "classname", elem: "Using elem property" }),
				new h(5, "Direct level and elem property"),
				new h("classname", "Direct class and elem property"),
				new h(5, "classname", "Direct level, class and elem property"),
			];
		},
	},
];
