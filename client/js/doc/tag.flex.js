import * as sample from "./sample.js";
import * as doc_core from "./core.js";
import tag from "../base/tag.js";
import ul from "../base/ul.js";
import div from "../base/div.js";

export default [
	{
		title: "Flex",
		msg: "Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.",
		anchor: false,
	},

	{
		title: "Enable flex behaviors",
		msg: [
			"Apply {{display}} utilities to create a flexbox container and transform <b>direct children elements</b> into flex items. Flex containers and items are able to be modified further with additional flex properties.",
		],
		container: doc_core.formcontainer,
		code: function () {
			return new tag({
				tag: "div",
				class: "cl-highlight-padding",
				display: "flex",
				elem: "I'm a flexbox container!",
			});
		},
	},

	{
		container: doc_core.formcontainer,
		code: function () {
			return new tag({
				tag: "div",
				class: "cl-highlight-padding",
				display: "inline-flex",
				elem: "I'm a inline flexbox container!",
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{display:flex}} and {{display:inline-flex}}.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map(function (i) {
						return ["flex", "inline-flex"].map(function (j) {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Row direction",
		msg: [
			"Set the direction of flex items in a flex container with direction utilities. In most cases you can omit the horizontal class here as the browser default is row. However, you may encounter situations where you needed to explicitly set this value (like responsive layouts).",
			"Use {{flex:row}} to set a horizontal direction (the browser default), or {{flex:row-reverse}} to start the horizontal direction from the opposite side.",
		],
		container: doc_core.formcontainer,
		viewclass: "cl-highlight-flex",
		code: function () {
			return ["row", "row-reverse"].map(function (i) {
				return new tag({
					tag: "div",
					display: "flex",
					flex: i,
					elem: [
						new tag({ tag: "div", elem: "Flex item 1" }),
						new tag({ tag: "div", elem: "Flex item 2" }),
						new tag({ tag: "div", elem: "Flex item 3" }),
					],
				});
			});
		},
	},

	{
		title: "Column direction",
		msg: "Use {{flex:column}} to set a vertical direction, or {{flex:column-reverse}} to start the vertical direction from the opposite side.",
		container: doc_core.formcontainer,
		viewclass: "cl-highlight-flex",
		code: function () {
			return ["column", "column-reverse"].map(function (i) {
				return new tag({
					tag: "div",
					display: "flex",
					flex: i,
					elem: [
						new tag({ tag: "div", elem: "Flex item 1" }),
						new tag({ tag: "div", elem: "Flex item 2" }),
						new tag({ tag: "div", elem: "Flex item 3" }),
					],
				});
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{flex}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map(function (i) {
						return ["row", "row-reverse", "column", "column-reverse"].map(function (j) {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Justify content",
		msg: "Use {{justifycontent}} property on {{display:flex|flex-inline}} containers to change the alignment of flex items on the main axis (the x-axis to start, y-axis if {{flex:column}}). Choose from {{start}} (browser default), {{end}}, {{center}}, {{between}}, {{around}}, or {{evenly}}.",
		container: doc_core.formcontainer,
		viewclass: "cl-highlight-flex",
		code: function () {
			return ["start", "end", "center", "between", "around", "evenly"].map(function (i) {
				return new tag({
					tag: "div",
					display: "flex",
					justifycontent: i,
					elem: [
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
					],
				});
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{justifycontent}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map(function (i) {
						return ["start", "end", "center", "between", "around", "evenly"].map(function (j) {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Align items",
		msg: "Use {{alignitem}} property on {{display:flex|flex-inline}} containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if {{flex:column}}). Choose from {{start}}, {{end}}, {{center}}, {{baseline}}, or {{stretch}} (browser default).",
		container: doc_core.formcontainer,
		viewclass: "cl-highlight-flex",
		code: function () {
			return ["start", "end", "center", "baseline", "stretch"].map(function (i) {
				return new tag({
					tag: "div",
					style: { height: "6rem" },
					display: "flex",
					alignitem: i,
					elem: [
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
						new tag({ tag: "div", elem: "Flex item" }),
					],
				});
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{alignitem}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map(function (i) {
						return ["start", "end", "center", "baseline", "stretch"].map(function (j) {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},

	{
		title: "Align self",
		msg: "Use {{alignself}} property on {{display:flex|flex-inline}} containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if {{flex:column}}). Choose from {{start}}, {{end}}, {{center}}, {{baseline}}, or {{stretch}} (browser default).",
		container: doc_core.formcontainer,
		viewclass: "cl-highlight-flex",
		code: function () {
			return ["start", "end", "center", "baseline", "stretch"].map(function (i) {
				return new tag({
					tag: "div",
					style: { height: "6rem" },
					display: "flex",
					elem: [
						new tag({ tag: "div", elem: "Flex item" }),
						new div({ tag: "div", alignself: i, elem: "Flex item" }),
						new div({ tag: "div", elem: "Flex item" }),
					],
				});
			});
		},
	},

	{
		msg: [
			"Responsive variations also exist for {{alignself}} property.",
			new ul({
				item: ["", "sm-", "md-", "lg-", "xl-", "xxl-"]
					.map(function (i) {
						return ["start", "end", "center", "baseline", "stretch"].map(function (j) {
							return `<code>${i}${j}</code>`;
						});
					})
					.flat(),
			}),
		],
	},
];
