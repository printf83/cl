import * as sample from "./sample.js";
import * as table from "../base/table.js";
import tag from "../base/tag.js";
import toast from "../base/toast.js";

export default [
	{
		title: "Tag",
		anchor: false,
		option: {
			"Available property": [
				["Property", "Value", "Description"],
				["<code>tag</code>", "String", "Create tag name"],
				["<code>id</code>", "null|String", "Create attribute id"],
				["<code>name</code>", "null|String", "Create attribute name"],
				[
					"<code>class</code>",
					"null|String|[String]",
					"Create class attribute using string or array of string",
				],
				["<code>style</code>", "null|{stylename:value}", "Create style attribute"],
				["<code>attr</code>", "null|{attrname:value}", "Create unsupported (non helper) attribute"],
				["<code>href</code>", "null|String of url", "Create href attribute for tag a"],
				["<code>onclick</code>", "null|Function", "Create onclick event handler"],
				["<code>onchange</code>", "null|Function", "Create onchange event handler"],
				["<code>onfocus</code>", "null|Function", "Create onfocus event handler"],
				["<code>onblur</code>", "null|Function", "Create onblur event handler"],
				["<code>align</code>", "null|start|end|center", "Create class <code>text-{align}</code>"],
				["<code>position</code>", "null|start|end|center", "Create class <code>position-{position}</code>"],
				["<code>overflow</code>", "null|start|end|center", "Create class <code>overflow-{overflow}</code>"],
				["<code>opacity</code>", "null|0|25|50|75|100", "Create class <code>opacity-{opacity}</code>"],
				[
					"<code>color</code>",
					"null|primary|secondary|success|warning|danger|dark|light",
					"Create class <code>bg-{color}</code>",
				],
				["<code>gradient</code>", "null|true|false", "Create class <code>bg-gradient</code>"],
				[
					"<code>coloropacity</code>",
					"null|0|25|50|75|100",
					"Create class <code>bg-opacity-{coloropacity}</code>",
				],
				[
					"<code>textcolor</code>",
					"null|primary|secondary|success|warning|danger|dark|light",
					"Create class <code>text-{textcolor}</code>",
				],
				[
					"<code>textopacity</code>",
					"null|0|25|50|75|100",
					"Create class <code>text-opacity-{textopacity}</code>",
				],
				["<code>shadow</code>", "null|true|false|sm|md|lg|[]", "Create class <code>shadow-{shadow}</code>"],
				["<code>border</code>", "null|true|false|0|1|2|3", "Create class <code>border-{border}</code>"],
				["<code></code>", "", ""],
				["<code></code>", "", ""],
			],
		},
	},

	{
		title: "Example",
		code: function () {
			return new tag({
				tag: "div",
				elem: "Tag element",
			});
		},
	},

	{
		title: "Inner element",
		code: function () {
			return new tag({
				tag: "div",
				elem: [
					new tag({ tag: "span", elem: "Span element" }),
					new tag({ tag: "p", elem: "Paragraph element" }),
				],
			});
		},
	},

	{
		title: "Basic property",
		code: function () {
			return new tag({
				tag: "div",
				id: "itemID",
				name: "itemName",
				class: "itemClass",
				style: { color: "#555", border: "1px solid #999", padding: "1rem" },
				attr: {
					"tab-index": -1,
					"aria-label": "Aria label",
				},
				elem: "Tag element",
			});
		},
	},

	{
		title: "Helper property",
		code: function () {
			return new tag({
				tag: "input",
				id: "itemID2",
				name: "itemName",
				class: "form-control",

				href: null, //only for a
				onclick: function (event) {
					new toast("i", "Onclick event").show();
				},
				onchange: function (event) {
					new toast("i", "Onchange event").show();
				},
				onfocus: function (event) {
					new toast("i", "Onfocus event").show();
				},
				onblur: function (event) {
					new toast("i", "Onblur event").show();
				},

				attr: {
					type: "text",
					"tab-index": 1,
				},

				align: null,
				position: null,
				overflow: null,
				opacity: null,
				display: null,
				float: null,
				alignItem: null,
				justifyContent: null,
				shadow: null,

				color: null,
				gradient: false,
				coloropacity: null,

				textcolor: null,
				textopacity: null,

				padding: null,
				paddingX: null,
				paddingY: null,
				paddingTop: null,
				paddingBottom: null,
				paddingStart: null,
				paddingEnd: null,

				margin: null,
				marginX: null,
				marginY: null,
				marginTop: null,
				marginBottom: null,
				marginStart: null,
				marginEnd: null,

				border: null,
				bordercolor: null,
				borderweight: null,

				row: null,
				col: null,
				rowcol: null,
				gap: null,

				rounded: null,
				roundedtype: null,
			});
		},
	},
];
