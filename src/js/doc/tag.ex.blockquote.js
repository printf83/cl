"use strict";
import sample from "./sample.js";
import div from "../base/div.js";
import blockquote from "../base/blockquote.js";

export default [
	{
		title: "Blockquote",
		msg: ["Helper to create {{&lt;blockquote&gt;&lt;/blockquote&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'blockquote'})}}",
			"This component has support for {{cite}} attribute that can be set using option {{cite}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop(),
		],
	},

	{
		title: "Example",
		import: ["div", "blockquote"],
		code: () => {
			return new div({
				elem: new blockquote({
					cite: "https://getbootstrap.com/",
					elem: "Bootstrap · The most popular HTML, CSS, and JS library in the world.",
				}),
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: sample.formcontainer,
		import: ["blockquote"],
		code: () => {
			return [
				new blockquote({ class: "classname", cite: "cite", elem: "Using elem property" }),
				new blockquote("classname", "cite", "Direct class and elem property"),
				new blockquote("cite", "Direct class and elem property"),
				new blockquote("Direct elem property"),
			];
		},
	},
];
