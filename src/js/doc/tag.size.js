"use strict";
import sample from "./sample.js";
import tag from "../base/tag.js";
import ul from "../base/ul.js";

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
					elem: `Width ${i}${typeof i === "string" ? "" : "%"}`,

					//marker
					class: `w-${i}`,
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
					elem: `Height ${i}${typeof i === "string" ? "" : "%"}`,

					//marker
					class: `h-${i}`,
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
				style: { width: "100%" },
				padding: 0,
				elem: new tag({
					tag: "div",
					elem: "Max-width:100%",

					//marker
					class: "mw-100",
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
				style: { height: "8rem" },
				padding: 0,
				elem: new tag({
					tag: "div",
					elem: "Max-height:100%",


					//marker
					class: "mh-100",
					style: { width: "100px", height: "200px" },
					//-
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
					{ code: "min-vw-100", label: "Min-width 100vw" },
					{ code: "min-vh-100", label: "Min-height 100vh" },
					{ code: "vw-100", label: "Width 100vw" },
					{ code: "vh-100", label: "Height 100vh" },
				].map((i) => {
					return `<code>.${i.code}</code> for ${i.label}`;
				}),
			}),
		],
	},
];
