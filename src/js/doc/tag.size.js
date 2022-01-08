"use strict";
import $ from "../component.js";

export default [
	{
		title: "Sizing",
		msg: "Easily make an element as wide or as tall with our width and height utilities.",
		anchor: false,
	},

	{
		title: "Relative to the parent",
		container: $.container.form,
		viewclass: "cl-highlight-size",
		code: function () {
			return [25, 50, 75, 100, "auto"].map(function (i) {
				return new $.tag({
					tag: "div",
					class: `w-${i}`,
					elem: `Width ${i}${typeof i === "string" ? "" : "%"}`,
				});
			});
		},
	},

	{
		container: $.container.stack,
		viewclass: "cl-highlight-size-height",
		code: function () {
			return [25, 50, 75, 100, "auto"].map(function (i) {
				return new $.tag({
					tag: "div",
					display: "inline-block",
					class: `h-${i}`,
					elem: `Height ${i}${typeof i === "string" ? "" : "%"}`,
				});
			});
		},
	},

	{
		msg: "You can also use {{max-width: 100%;}} and {{max-height: 100%; }}utilities as needed.",
		viewclass: "cl-highlight-div",
		code: function () {
			return new $.tag({
				tag: "div",
				style: { width: "100%" },
				padding: 0,
				elem: new $.tag({
					tag: "div",
					class: "mw-100",
					elem: "Max-width:100%",
				}),
			});
		},
	},

	{
		viewclass: "cl-highlight-div",
		code: function () {
			return new $.tag({
				tag: "div",
				style: { height: "8rem" },
				padding: 0,
				elem: new $.tag({
					tag: "div",
					class: "mh-100",
					style: { width: "100px", height: "200px" },
					elem: "Max-height:100%",
				}),
			});
		},
	},

	{
		title: "Relative to the viewport",
		msg: [
			"You can also use utilities to set the width and height relative to the viewport.",
			new $.ul({
				item: [
					{ code: "min-vw-100", label: "Min-width 100vw" },
					{ code: "min-vh-100", label: "Min-height 100vh" },
					{ code: "vw-100", label: "Width 100vw" },
					{ code: "vh-100", label: "Height 100vh" },
				].map(function (i) {
					return `<code>.${i.code}</code> for ${i.label}`;
				}),
			}),
		],
	},
];
