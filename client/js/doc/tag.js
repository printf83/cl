import * as sample from "./sample.js";
import * as doc_core from "./core.js";
import tag from "../base/tag.js";
import toast from "../base/toast.js";

export default [
	{
		title: "Tag",
		anchor: false,
	},

	//=============================
	//BASE
	//=============================

	{
		anchor: true,
		title: "Basic property",
		msg: "This property is base property.",
	},
	{
		title: "tag",
		msg: ["Create tag name for tag"],
		container: doc_core.formcontainer,
		code: function () {
			return [
				new tag({ tag: "div", elem: "DIV element" }),
				new tag({ tag: "span", elem: "SPAN element" }),
				new tag({ tag: "p", elem: "P element" }),
				new tag({ tag: "b", elem: "B element" }),
				new tag({ tag: "i", elem: "I element" }),
			];
		},
	},

	{
		title: "elem",
		msg: ["Create element inside tag"],
		container: doc_core.formcontainer,
		code: function () {
			return [
				new tag({ tag: "div", class: "cl-highlight-div cl-highlight-element", elem: "String" }),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: ["String", "<div>Sub element</div>"],
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: new tag({ tag: "div", elem: "Sub element" }),
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-div cl-highlight-element",
					elem: ["Sub element 1", "<div>Sub element 2</div>", new tag({ tag: "div", elem: "Sub element 3" })],
				}),
			];
		},
	},

	{
		title: "elem (without tag)",
		msg: ["Create element inside tag that change parent property"],
		code: function () {
			return new tag({
				tag: "div",
				elem: new tag({
					attr: { class: "hello" },
					elem: "This sub element tag not have tag property",
				}),
			});
		},
	},

	{
		title: "attr",
		msg: ["Create attribute for element"],
		code: function () {
			return new tag({
				tag: "div",
				attr: { id: "elementID", class: "elementClass", style: { color: "#555" } },
				elem: "Example element",
			});
		},
	},

	//=============================
	//HELPER
	//=============================
	{
		anchor: true,
		title: "Helper property",
		msg: "This property is create to help user to create <code>attr</code> property.",
	},
	{
		title: "id",
		msg: ["Create attribute <code>id</code> for element", "Shortcut for : <code>attr:{id:value}</code>"],
		code: function () {
			return new tag({
				tag: "div",
				id: "elementID2",
				elem: "Example element",
			});
		},
	},
	{
		title: "name",
		msg: ["Create attribute <code>name</code> for element", "Shortcut for : <code>attr:{id:value}</code>"],
		code: function () {
			return new tag({
				tag: "div",
				name: "elementName",
				elem: "Example element",
			});
		},
	},

	{
		title: "href",
		msg: [
			"Create attribute <code>href</code> for <code>a</code> element",
			"Shortcut for : <code>attr:{href:value}</code>",
		],
		code: function () {
			return new tag({
				tag: "a",
				href: "https://www.getbootstrap.com",
				elem: "www.getbootstrap.com",
			});
		},
	},

	{
		title: "onclick",
		msg: ["Create attribute <code>onclick</code> for  element", "Shortcut for : <code>attr:{onclick:value}</code>"],
		code: function () {
			return new tag({
				tag: "button",
				onclick: function (event) {
					event.currentTarget.innerText = "onclick trigged";
				},
				elem: "Example button",
			});
		},
	},

	{
		title: "onchange",
		msg: [
			"Create attribute <code>onchange</code> for  element",
			"Shortcut for : <code>attr:{onchange:value}</code>",
		],
		code: function () {
			return new tag({
				tag: "input",
				attr: {
					class: "form-control",
					type: "text",
					placeholder: "Type some text here",
				},
				onchange: function (event) {
					event.currentTarget.value = "onchange trigged";
				},
			});
		},
	},

	{
		title: "onfocus",
		msg: ["Create attribute <code>onfocus</code> for  element", "Shortcut for : <code>attr:{onfocus:value}</code>"],
		code: function () {
			return new tag({
				tag: "input",
				attr: {
					class: "form-control",
					type: "text",
					placeholder: "Example input",
				},
				onfocus: function (event) {
					event.currentTarget.value = "onfocus trigged";
				},
			});
		},
	},

	{
		title: "onblur",
		msg: ["Create attribute <code>onblur</code> for  element", "Shortcut for : <code>attr:{onblur:value}</code>"],
		code: function () {
			return new tag({
				tag: "input",
				attr: {
					class: "form-control",
					type: "text",
					value: "Example input",
				},
				onblur: function (event) {
					event.currentTarget.value = "onblur trigged";
				},
			});
		},
	},

	{
		title: "style",
		msg: ["Create attribute <code>style</code> for  element", "Shortcut for : <code>attr:{style:value}</code>"],
		code: function () {
			return new tag({
				tag: "div",
				style: {
					border: "1px solid rgba(95,95,95,0.5)",
					"background-color": "rgba(155,155,155,0.4)",
					padding: "1rem",
				},
				elem: "Example element",
			});
		},
	},

	//=============================
	//CLASS HELPER
	//=============================
	{
		anchor: true,
		title: "Bootstrap class helper",
		msg: "This property is create to help user to create <code>class</code> property base on bootstrap class.",
	},
	{
		title: "align",
		msg: [
			"Create class <code>text-{value}</code> for element",
			"Supported value: <code>null | start | center | end | viewport-size</code>",
			"This property support multiple provided in array",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, "start", "center", "end", ["end", "md-start", "lg-center"]].map(function (i) {
				return new tag({
					tag: "div",
					align: i,
					elem: `Example element with <code>align: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "warp",
		msg: [
			"Create class <code>text-warp|text-nowarp</code> for element",
			"Supported value: <code>null | boolean</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, true, false].map(function (i) {
				return new tag({
					tag: "div",
					class: "cl-highlight-element",
					warp: i,
					style: { width: "8rem" },
					elem: "Example element with long text",
				});
			});
		},
	},

	{
		title: "wordbreak",
		msg: ["Create class <code>text-break</code> for element", "Supported value: <code>null | boolean</code>"],
		container: doc_core.formcontainer,
		code: function () {
			return [null, true, false].map(function (i) {
				return new tag({
					tag: "div",
					class: "cl-highlight-element",
					wordbreak: i,
					style: { width: "8rem" },
					elem: "Exampleelementwithlongtext",
				});
			});
		},
	},

	{
		title: "texttransform",
		msg: [
			"Create class <code>text-{value}</code> for element",
			"Supported value: <code>null | lowercase | uppercase | capitalize</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, "lowercase", "uppercase", "capitalize"].map(function (i) {
				return new tag({
					tag: "div",
					texttransform: i,
					elem: `Example element with <code>texttransform: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "fontsize",
		msg: ["Create class <code>fs-{value}</code> for element", "Supported value: <code>null | 1...6</code>"],
		container: doc_core.formcontainer,
		code: function () {
			return [null, 1, 2, 3, 4, 5, 6].map(function (i) {
				return new tag({
					tag: "div",
					fontsize: i,
					elem: `Example element with <code>fontsize: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "fontweight",
		msg: [
			"Create class <code>fw-{value}</code> for element",
			"Supported value: <code>null | bold | bolder | normal | light | lighter</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, "bold", "bolder", "normal", "light", "lighter"].map(function (i) {
				return new tag({
					tag: "div",
					fontweight: i,
					elem: `Example element with <code>fontweight: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "fontitalic",
		msg: [
			"Create class <code>fst-italic | fst-normal</code> for element",
			"Supported value: <code>null | boolean</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, true, false].map(function (i) {
				return new tag({
					tag: "div",
					fontitalic: i,
					elem: `Example element with <code>fontitalic: ${i}</code>`,
				});
			});
		},
	},
	{
		title: "Reset color",
		msg: ["Reset a text or link’s color with .text-reset, so that it inherits the color from its parent."],
		code: function () {
			return new tag({
				tag: "p",
				textcolor: "muted",
				elem: [
					"Muted text with a ",
					new tag({ tag: "a", href: "#", textcolor: "reset", elem: "reset link" }),
					".",
				],
			});
		},
	},
	{
		title: "textdecoration",
		msg: [
			"Create class <code>text-decoration-{value}</code> for element",
			"Supported value: <code>null | boolean | underline | line-through | none</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, true, false, "underline", "line-through", "none"].map(function (i) {
				return new tag({
					tag: "div",
					textdecoration: i,
					elem: `Example element with <code>textdecoration: ${i}</code>`,
				});
			});
		},
	},
	{
		title: "lineheight",
		msg: [
			"Create class <code>lh-{value}</code> for element",
			"Supported value: <code>null | 1 | sm | base | lg</code>",
		],
		container: doc_core.formcontainer,
		code: function () {
			return [null, 1, "sm", "base", "lg"].map(function (i) {
				return new tag({
					tag: "div",
					class: "cl-highlight-element",
					lineheight: i,
					elem: `Example element with <code>lineheight: ${i}</code>. ${sample.text()}`,
				});
			});
		},
	},

	//=============================
	//OTHER
	//=============================
	// {
	// 	title: "Example",
	// 	code: function () {
	// 		return new tag({
	// 			tag: "div",
	// 			elem: "Tag element",
	// 		});
	// 	},
	// },

	// {
	// 	title: "Inner element",
	// 	code: function () {
	// 		return new tag({
	// 			tag: "div",
	// 			elem: [
	// 				new tag({ tag: "span", elem: "Span element" }),
	// 				new tag({ tag: "p", elem: "Paragraph element" }),
	// 			],
	// 		});
	// 	},
	// },

	// {
	// 	title: "Basic property",
	// 	code: function () {
	// 		return new tag({
	// 			tag: "div",
	// 			id: "itemID",
	// 			name: "itemName",
	// 			class: "itemClass",
	// 			style: { color: "#555", border: "1px solid #999", padding: "1rem" },
	// 			attr: {
	// 				"tab-index": -1,
	// 				"aria-label": "Aria label",
	// 			},
	// 			elem: "Tag element",
	// 		});
	// 	},
	// },

	// {
	// 	title: "Helper property",
	// 	code: function () {
	// 		return new tag({
	// 			tag: "input",
	// 			id: "itemID2",
	// 			name: "itemName",
	// 			class: "form-control",

	// 			href: null, //only for a
	// 			onclick: function (event) {
	// 				new toast("i", "Onclick event").show();
	// 			},
	// 			onchange: function (event) {
	// 				new toast("i", "Onchange event").show();
	// 			},
	// 			onfocus: function (event) {
	// 				new toast("i", "Onfocus event").show();
	// 			},
	// 			onblur: function (event) {
	// 				new toast("i", "Onblur event").show();
	// 			},

	// 			attr: {
	// 				type: "text",
	// 				"tab-index": 1,
	// 			},

	// 			align: null,
	// 			position: null,
	// 			overflow: null,
	// 			opacity: null,
	// 			display: null,
	// 			float: null,
	// 			alignItem: null,
	// 			justifyContent: null,
	// 			shadow: null,

	// 			color: null,
	// 			gradient: false,
	// 			coloropacity: null,

	// 			textcolor: null,
	// 			textopacity: null,

	// 			padding: null,
	// 			paddingX: null,
	// 			paddingY: null,
	// 			paddingTop: null,
	// 			paddingBottom: null,
	// 			paddingStart: null,
	// 			paddingEnd: null,

	// 			margin: null,
	// 			marginX: null,
	// 			marginY: null,
	// 			marginTop: null,
	// 			marginBottom: null,
	// 			marginStart: null,
	// 			marginEnd: null,

	// 			border: null,
	// 			bordercolor: null,
	// 			borderweight: null,

	// 			row: null,
	// 			col: null,
	// 			rowcol: null,
	// 			gap: null,

	// 			rounded: null,
	// 			roundedtype: null,
	// 		});
	// 	},
	// },
];
