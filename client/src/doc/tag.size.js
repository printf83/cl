"use strict";
import sample from "./sample.js";
import tag from "../cl/base/tag.js";
import ul from "../cl/base/ul.js";

export default [
	{
		title: "Sizing",
		msg: "Easily make an element as wide or as tall with Bootstrap width and height utilities.",
		anchor: false,
	},

	{
		title: "Relative to the parent",
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-size",
		import: ["tag"],
		code: () => {
			return [25, 50, 75, 100, "auto"].map((i) => {
				return new tag({
					tag: "div",
					width: i, //marker
					elem: `Width ${i}${typeof i === "string" ? "" : "%"}`,
				});
			});
		},
	},

	{
		container: sample.stackcontainer,
		viewclass: "cl-highlight-size-height",
		import: ["tag"],
		code: () => {
			return [25, 50, 75, 100, "auto"].map((i) => {
				return new tag({
					tag: "div",
					display: "inline-block",
					height: i, //marker
					elem: `Height ${i}${typeof i === "string" ? "" : "%"}`,
				});
			});
		},
	},

	{
		msg: "You can also use {{max-width: 100%;}} and {{max-height: 100%; }}utilities as needed.",
		viewclass: "cl-highlight-div",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				padding: 0,
				width: 100, //marker
				elem: new tag({
					tag: "div",
					maxWidth: 100, //marker
					elem: "Max-width:100%",
				}),
			});
		},
	},

	{
		viewclass: "cl-highlight-div",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				height: "8rem",
				padding: 0,
				elem: new tag({
					tag: "div",
					//marker
					maxHeight: 100,
					width: "100px",
					height: "200px",
					//-
					elem: "Max-height:100%",
				}),
			});
		},
	},

	{
		title: "Relative to the viewport",
		msg: [
			"You can also use utilities to set the width and height relative to the viewport.",
			new ul({
				item: [
					{ code: "minViewWidth:100", label: "Min-width 100vw" },
					{ code: "minViewHeight:100", label: "Min-height 100vh" },
					{ code: "viewWidth:100", label: "Width 100vw" },
					{ code: "viewHeight:100", label: "Height 100vh" },
				].map((i) => {
					return `<code>.${i.code}</code> for ${i.label}`;
				}),
			}),
		],
	},
];
