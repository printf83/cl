"use strict";
import * as sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Borders",
		msg: "Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons, or any other element.",
		anchor: false,
	},

	{
		title: "Border",
		msg: "Use {{border}} property to add or remove an element’s borders. Choose from all borders or one at a time.",
	},

	{
		title: "Additive",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, true, "top", "end", "bottom", "start", ["bottom", "start"]].map(function (i) {
				return new $.tag({
					tag: "div",
					border: i,
				});
			});
		},
	},

	{
		title: "Subtractive",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, false, "top-0", "end-0", "bottom-0", "start-0", ["border", "bottom-0", "start-0"]].map(
				function (i) {
					return new $.tag({
						tag: "div",
						border: Array.isArray(i) ? i : ["border", i],
					});
				}
			);
		},
	},

	{
		title: "Border color",
		msg: "Change the border color using {{bordercolor}} property on Bootstrap theme colors.",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "white"].map(
				function (i) {
					return new $.tag({
						tag: "div",
						bordercolor: i,
					});
				}
			);
		},
	},

	{
		title: "Border-width",
		msg: "Change the border width using {{borderweight}} property.",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, 0, 1, 2, 3, 4, 5].map(function (i) {
				return new $.tag({
					tag: "div",
					borderweight: i,
				});
			});
		},
	},

	{
		title: "Sizes",
		msg: "Change the border radius size {{rounded}} property.",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box-dark",
		code: function () {
			return [null, 0, 1, 2, 3].map(function (i) {
				return new $.tag({
					tag: "div",
					rounded: i,
				});
			});
		},
	},

	{
		title: "Border-radius",
		msg: "Change the border radius style {{roundedtype}} property.",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box-dark",
		code: function () {
			return [null, "top", "end", "bottom", "start", "pill", "circle"].map(function (i) {
				return new $.tag({
					tag: "div",
					roundedtype: i,
					style: {
						width: i === "pill" ? "10rem" : null,
					},
				});
			});
		},
	},
];
