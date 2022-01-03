import { tagprop } from "./sample.js";
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
			tagprop("color"),
		],
	},

	{
		title: "Example",
		code: function () {
			return new a({
				href: "https://getbootstrap.com/docs/5.0",
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
					"<code>icon${i}</code> - only works if elem not provided",
					"<code>label${i}</code> - only works if elem not provided",
					"<code>color${i}</code> - will change to <code>linkcolor</code> when added to tag component later",
				],
			}),
		],
		code: function () {
			return new a({
				href: "https://getbootstrap.com/docs/5.0",
				color: "success",
				textdecoration: "none",
				label: "Bootstrap",
				icon: { type: "fab", icon: "bootstrap" },
			});
		},
	},
];
