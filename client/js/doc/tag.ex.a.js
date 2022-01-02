import ul from "../base/ul.js";
import a from "../base/a.js";

export default [
	{
		title: "Anchor",
		msg: ["Helper to create {{a}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'a'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Example property inherits from tag component:",

			new ul({
				item: [
					"id",
					"name",
					"attr",
					"style",
					"elem",
					"href",
					"onclick",
					"align",
					"margin",
					"display",
					"color",
					"and others",
				].map(function (i) {
					if (i !== "and others") {
						return `<code>${i}</code>`;
					} else {
						return `${i}`;
					}
				}),
			}),
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
