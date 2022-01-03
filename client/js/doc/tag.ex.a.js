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
			"Property inherits from tag component:",
			[
				"id",
				"name",
				"class",
				"style",
				"attr",
				"href",
				"onclick",
				"onchange",
				"onfocus",
				"onblur",
				"userselect",
				"pointerevent",
				"visible",
				"align",
				"valign",
				"wrap",
				"wordbreak",
				"texttransform",
				"fontsize",
				"fontweight",
				"fontitalic",
				"lineheight",
				"monospace",
				"textdecoration",
				"position",
				"overflow",
				"opacity",
				"display",
				"float",
				"alignitem",
				"alignself",
				"aligncontent",
				"justifycontent",
				"shadow",
				"gradient",
				"coloropacity",
				"linkcolor",
				"textcolor",
				"textopacity",
				"padding",
				"paddingx",
				"paddingy",
				"paddingtop",
				"paddingbottom",
				"paddingstart",
				"paddingend",
				"margin",
				"marginx",
				"marginy",
				"margintop",
				"marginbottom",
				"marginstart",
				"marginend",
				"border",
				"bordercolor",
				"borderweight",
				"flex",
				"order",
				"row",
				"col",
				"rowcol",
				"gap",
				"rounded",
				"roundedtype",
				"tmiddle",
				"top",
				"bottom",
				"start",
			]
				.map(function (i) {
					return `<code>${i}</code>`;
				})
				.join(", ") + " and <code>end</code>.",
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
