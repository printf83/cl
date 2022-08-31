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
			"Property inherits from tag component:",
			sample.tagprop("color"),
		],
	},

	{
		title: "Example",
		import: ["a"],
		code: () => {
			return new a({
				href: "https://getbootstrap.com/docs/5.2",
				linkcolor: "danger",
				textdecoration: "none",
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
					"<code>color</code> - shortcut to <code>linkcolor</code>. If you like to change the background color, you need to set <code>class:bg-*</code>",
				],
			}),
		],
		container: sample.formcontainer,
		import: ["a"],
		code: () => {
			return [
				new a({
					href: "https://getbootstrap.com/docs/5.2",
					color: "success",
					textdecoration: "none",
					label: "Bootstrap",
					icon: { type: "fab", icon: "bootstrap" },
				}),
				new a({
					href: "https://getbootstrap.com/docs/5.2",
					color: "light",
					class: "bg-primary",
					padding: 2,
					rounded: true,
					textdecoration: "none",
					label: "Bootstrap",
					icon: { type: "fab", icon: "bootstrap" },
				}),
			];
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: sample.formcontainer,
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
