"use strict";
import sample from "./sample.js";
import $ from "../component.js";

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
		container: sample.formcontainer,
		viewclass: "cl-highlight-col",
		code: function () {
			return [null, "start", "center", "end", ["end", "md-start", "lg-center"]].map(function (i) {
				return new $.tag({
					tag: "div",
					align: i,
					elem: `Example element with <code>align: ${i}</code>`,
				});
			});
		},
	},

	{
		msg: new $.alert.container({
			color: "primary",
			elem: "Note that we don’t provide utility classes for justified text. While, aesthetically, justified text might look more appealing, it does make word-spacing more random and therefore harder to read.",
		}),
	},

	{
		title: "Text wrapping and overflow",
		msg: ["Wrap text with a {{wrap:true}} property"],
		code: function () {
			return new $.tag({
				tag: "div",
				class: "cl-highlight",
				wrap: true,
				style: { width: "8rem" },
				elem: "This text should wrap.",
			});
		},
	},

	{
		title: "Text wrapping and overflow",
		msg: ["Wrap text with a {{wrap}} property"],
		code: function () {
			return new $.tag({
				tag: "div",
				class: "cl-highlight",
				wrap: false,
				style: { width: "8rem" },
				elem: "This text should overflow the parent.",
			});
		},
	},

	{
		title: "Word break",
		msg: [
			"Prevent long strings of text from breaking your components' layout by using .text-break to set word-wrap: break-word and word-break: break-word. We use word-wrap instead of the more common overflow-wrap for wider browser support, and add the deprecated word-break: break-word to avoid issues with flex containers.",
		],
		code: function () {
			return new $.tag({
				tag: "div",
				class: "cl-highlight",
				wordbreak: true,
				elem: "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
			});
		},
	},

	{
		msg: new $.alert.container({
			color: "warning",
			elem: "Note that breaking words isn’t possible in Arabic, which is the most used RTL language. Therefore .text-break is removed from Bootstrap RTL compiled CSS.",
		}),
	},

	{
		title: "Text transform",
		msg: ["Transform text in components with text {{texttransform}} property."],
		container: sample.formcontainer,
		code: function () {
			return [null, "lowercase", "uppercase", "capitalize"].map(function (i) {
				return new $.tag({
					tag: "div",
					texttransform: i,
					elem: `Example element with <code>texttransform: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Font size",
		msg: [
			"Quickly change the font-size of text using {{fontsize}} property. While Bootstrap heading classes (e.g., {{.h1}}–{{.h6}}) apply {{fontsize}}, {{fontweight}}, and {{lineheight}}, these utilities <i>only</i> apply {{font-size}}. Sizing for these utilities matches HTML’s heading elements, so as the number increases, their size decreases.",
		],
		container: sample.formcontainer,
		code: function () {
			return [null, 1, 2, 3, 4, 5, 6].map(function (i) {
				return new $.tag({
					tag: "div",
					fontsize: i,
					elem: `Example element with <code>fontsize: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Font weight",
		msg: ["Quickly change the font-weight of text with these {{fontweight}}."],
		container: sample.formcontainer,
		code: function () {
			return [null, "bold", "bolder", "normal", "light", "lighter"].map(function (i) {
				return new $.tag({
					tag: "div",
					fontweight: i,
					elem: `Example element with <code>fontweight: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Font italics",
		msg: ["Quickly change the font-style of text with these {{fontitalic}}."],
		container: sample.formcontainer,
		code: function () {
			return [null, true, false].map(function (i) {
				return new $.tag({
					tag: "div",
					fontitalic: i,
					elem: `Example element with <code>fontitalic: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Text decoration",
		msg: ["Decorate text in components with {{textdecoration}} property."],
		container: sample.formcontainer,
		code: function () {
			return [null, true, false, "underline", "line-through", "none"].map(function (i) {
				return new $.tag({
					tag: "div",
					textdecoration: i,
					elem: `Example element with <code>textdecoration: ${i}</code>`,
				});
			});
		},
	},

	{
		title: "Monospace",
		msg: ["Change a selection to Bootstrap monospace font stack with {{monospace}} property."],
		container: sample.formcontainer,
		code: function () {
			return new $.tag({
				tag: "div",
				monospace: true,
				elem: `Example element with <code>monospace: true</code>`,
			});
		},
	},

	{
		title: "Line height",
		msg: ["Change the line height with {{lineheight}} property"],
		container: sample.formcontainer,
		code: function () {
			return [null, 1, "sm", "base", "lg"].map(function (i) {
				return new $.tag({
					tag: "div",
					class: "cl-highlight-element",
					lineheight: i,
					elem: `Example element with <code>lineheight: ${i}</code>. ${sample.text()}`,
				});
			});
		},
	},
];
