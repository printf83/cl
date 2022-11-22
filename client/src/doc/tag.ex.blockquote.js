"use strict";
import sample from "./sample.js";
import * as alert from "../dist/cl/base/alert.js";
import div from "../dist/cl/base/div.js";
import blockquote from "../dist/cl/base/blockquote.js";
import cite from "../dist/cl/base/cite.js";
import ul from "../dist/cl/base/ul.js";

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
			"CL option property that inherits from tag component :",
			sample.tagpropCl(),
			"Bootstrap option property that inherits from tag component :",
			sample.tagpropBootstrap(),
			new alert.container({
				color: "primary",
				elem: "If the Bootstrap property value is not supported by bootstrap, it will be process as <b>style</b> or <b>html</b> property (if supported)",
			}),
			"CSS option property that inherits from tag component :",
			sample.tagpropCss(),
			"Html option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropHtml(),
		],
	},

	{
		title: "Example",
		import: ["div", "blockquote"],
		code: () => {
			return new div({
				elem: [
					//marker
					new blockquote({
						cite: "https://getbootstrap.com/",
						elem: "Bootstrap · The most popular HTML, CSS, and JS library in the world.",
					}),
					//-
				],
			});
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "class,cite,elem", "cite,elem", "elem"].map((i) => {
					return `<code>new blockquote(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["blockquote"],
		code: () => {
			return [
				new blockquote({ class: "classname", cite: "cite", elem: "Using object" }),
				new blockquote("classname", "cite", "Direct class, cite and elem property"),
				new blockquote(["classname1", "classname2"], "cite", "Direct class array, cite and elem property"),
				new blockquote(["classname1", "classname2"], "cite", [
					"Direct class array, cite ",
					new cite("and"),
					" array of elem property",
				]),
				new blockquote("cite", "Direct cite and elem property"),
				new blockquote("cite", ["Direct cite ", new cite("and"), " array of elem property"]),
				new blockquote("Direct elem property"),
				new blockquote(["Direct ", new cite("array of"), " elem property"]),
			];
		},
	},
];
