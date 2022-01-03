import ul from "../base/ul.js";
import b from "../base/b.js";
import div from "../base/div.js";
import * as doc_core from "./core.js";

export default [
	{
		title: "Bold",
		msg: ["Helper to create {{b}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'b'})}}",
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
				"color",
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
			return new div({
				elem: [
					"This is ",
					new b({
						attr: {
							"data-test": "test",
						},
						elem: "Bold",
					}),
					" text",
				],
			});
		},
	},

	{
		title: "Easy option",
		msg: "This component also supported easy option.",
		container: doc_core.formcontainer,
		code: function () {
			return [
				new b({ elem: "Using elem property" }),
				new b("Direct elem property"),
				new b("classname", "Direct class and elem property"),
			];
		},
	},
];
