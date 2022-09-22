"use strict";
import sample from "./sample.js";
import ul from "../base/ul.js";
import a from "../base/a.js";

export default [
	{
		title: "Anchor",
		msg: ["Helper to create {{&lt;a&gt;&lt;/a&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'a'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Option property inherits from tag component:",
			sample.tagprop("color"),
		],
	},

	{
		title: "Example",
		import: ["a"],
		code: () => {
			return new a({
				href: "https://getbootstrap.com/docs/5.2",
				linkColor: "danger",
				textDecoration: "none",
				elem: "Bootstrap",
			});
		},
	},

	{
		title: "Addtional property",
		msg: [
			"We add some special property into this component:",
			new ul({
				item: [
					"<code>icon</code> - only works if elem not provided",
					"<code>label</code> - only works if elem not provided",
					"<code>color</code> - shortcut to <code>linkColor</code>. If you like to change the background color, you need to set <code>class:bg-*</code>",
				],
			}),
			"If you set {{href:'#'}}, it will be changed to {{href:'javascript:void(0);'}}",
		],
		container: sample.vstackcontainer,
		import: ["a"],
		code: () => {
			return [
				new a({
					href: "https://getbootstrap.com/docs/5.2",
					textDecoration: "none",

					//marker
					icon: { type: "fab", icon: "bootstrap" },
					label: "Bootstrap",
					color: "success",
					//-
				}),
				new a({
					href: "https://getbootstrap.com/docs/5.2",
					class: "bg-primary",
					padding: 2,
					rounded: true,
					textDecoration: "none",

					//marker
					icon: { type: "fab", icon: "bootstrap" },
					label: "Bootstrap",
					color: "light",
					//-
				}),
			];
		},
	},

	{
		title: "Easy option",
		msg: [
			"This component also supported easy option.",
			new ul({
				item: ["option", "href,elem", "href"].map((i) => {
					return `<code>new a(${i})</code>`;
				}),
			}),
		],
		container: sample.vstackcontainer,
		import: ["a"],
		code: () => {
			return [
				new a({ href: "https://getbootstrap.com/docs/5.2", class: "classname", elem: "Bootstrap" }),
				new a("https://getbootstrap.com/docs/5.2", "Bootstrap"),
				new a("https://getbootstrap.com/docs/5.2"),
			];
		},
	},
];
