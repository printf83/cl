"use strict";
import sample from "./sample.js";
import div from "../base/div.js";
import footer from "../base/footer.js";

export default [
	{
		title: "Span",
		msg: ["Helper to create {{&lt;footer&gt;&lt;/footer&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'footer'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "footer"],
		code: () => {
			return new div({
				elem: new footer({
					attr: {
						"data-test": "test",
					},
					elem: "Example",
				}),
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: sample.formcontainer,
		import: ["footer"],
		code: () => {
			return [
				new footer({ class: "classname", elem: "Using elem property" }),
				new footer("classname", "Direct class and elem property"),
				new footer("Direct elem property"),
			];
		},
	},
];
