"use strict";
import sample from "./sample.js";
import tag from "../../cl/js/base/tag.js";
import * as alert from "../../cl/js/base/alert.js";

export default [
	{
		title: "Text",
		msg: "Documentation and examples for common text utilities to control alignment, wrapping, weight, and more.",
		anchor: false,
	},

	{
		title: "Text alignment",
		msg: [
			"Easily realign text to components with text alignment classes. For start, end, and center alignment, responsive classes are available that use the same viewport width breakpoints as the grid system.",
		],
		container: sample.vstackcontainer,
		viewclass: "cl-highlight-col",
		import: ["tag"],
		code: () => {
			return ["start", "center", "end", ["end", "md-start", "lg-center"]].map((i) => {
				return new tag({
					tag: "div",
					textAlign: i, //marker
					elem: `Example element with <code>textAlign: ${i}</code>`,
				});
			});
		},
	},

	{
		msg: new alert.container({
			color: "primary",
			elem: "Note that we don’t provide utility classes for justified text. While, aesthetically, justified text might look more appealing, it does make word-spacing more random and therefore harder to read.",
		}),
	},

	{
		title: "Text wrapping and overflow",
		msg: ["Wrap text with a {{textWrap:true}} property"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				class: "cl-highlight",
				width: "8rem",
				textWrap: true, //marker
				elem: "This text should wrap.",
			});
		},
	},

	{
		title: "Text wrapping and overflow",
		msg: ["Wrap text with a {{textWrap:false}} property"],
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				class: "cl-highlight",
				width: "8rem",
				textWrap: false, //marker
				elem: "This text should overflow the parent.",
			});
		},
	},

	{
		title: "Word break",
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				class: "cl-highlight",
				wordBreak: true, //marker
				elem: "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
			});
		},
	},

	{
		msg: new alert.container({
			color: "warning",
			elem: "Note that breaking words isn’t possible in Arabic, which is the most used RTL language. Therefore .text-break is removed from Bootstrap RTL compiled CSS.",
		}),
	},

	{
		title: "Text transform",
		msg: ["Transform text in components with text {{texttransform}} property."],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return ["lowercase", "uppercase", "capitalize"].map((i) => {
				return new tag({
					tag: "div",
					textTransform: i, //marker
					elem: `Example element with <code>textTransform: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Font size",
		msg: [
			"Quickly change the font-size of text using {{fontSize}} property. While Bootstrap heading classes (e.g., {{.h1}}–{{.h6}}) apply {{fontSize}}, {{fontWeight}}, and {{lineHeight}}, these utilities <i>only</i> apply {{font-size}}. Sizing for these utilities matches HTML’s heading elements, so as the number increases, their size decreases.",
		],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [1, 2, 3, 4, 5, 6].map((i) => {
				return new tag({
					tag: "div",
					fontSize: i, //marker
					elem: `Example element with <code>fontSize: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Font weight",
		msg: ["Quickly change the font-weight of text with these {{fontWeight}}."],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [null, "bold", "bolder", "semibold", "normal", "light", "lighter"].map((i) => {
				return new tag({
					tag: "div",
					fontWeight: i, //marker
					elem: `Example element with <code>fontWeight: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Font italics",
		msg: ["Quickly change the font-style of text with these {{fontItalic}}."],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return [true, false].map((i) => {
				return new tag({
					tag: "div",
					fontItalic: i, //marker
					elem: `Example element with <code>fontItalic: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Text decoration",
		msg: ["Decorate text in components with {{textDecoration}} property."],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return ["underline", "line-through", "none"].map((i) => {
				return new tag({
					tag: "div",
					textDecoration: i, //marker
					elem: `Example element with <code>textDecoration: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Monospace",
		msg: ["Change a selection to Bootstrap monospace font stack with {{monospace}} property."],
		container: sample.vstackcontainer,
		import: ["tag"],
		code: () => {
			return new tag({
				tag: "div",
				monospace: true, //marker
				elem: `Example element with <code>monospace: true</code>`,
			});
		},
	},

	{
		title: "Line height",
		msg: ["Change the line height with {{lineHeight}} property"],
		container: sample.vstackcontainer,
		import: ["tag", "sample"],
		code: () => {
			return [1, "sm", "base", "lg"].map((i) => {
				return new tag({
					tag: "div",
					class: "cl-highlight-element",
					lineHeight: i, //marker
					elem: `Example element with <code>lineHeight: ${i}</code>. ${sample.text()}`,
				});
			});
		},
	},
];
