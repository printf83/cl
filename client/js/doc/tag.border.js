import * as core from "../base/core.js";
import * as doc_core from "./core.js";
import tag from "../base/tag.js";

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
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, true, "top", "end", "bottom", "start", ["bottom", "start"]].map(function (i) {
				return new tag({
					tag: "div",
					border: i,
				});
			});
		},
	},

	{
		title: "Subtractive",
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, false, "top-0", "end-0", "bottom-0", "start-0", ["bottom-0", "start-0"]].map(function (i) {
				return new tag({
					tag: "div",
					border: ["border", i],
				});
			});
		},
	},

	{
		title: "Border color",
		msg: "Change the border color using {{bordercolor}} property on our theme colors.",
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "white"].map(
				function (i) {
					return new tag({
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
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box",
		code: function () {
			return [null, 0, 1, 2, 3, 4, 5].map(function (i) {
				return new tag({
					tag: "div",
					borderweight: i,
				});
			});
		},
	},

	{
		title: "Sizes",
		msg: "Change the border radius size {{rounded}} property.",
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box-dark",
		code: function () {
			return [null, 0, 1, 2, 3].map(function (i) {
				return new tag({
					tag: "div",
					rounded: i,
				});
			});
		},
	},

	{
		title: "Border-radius",
		msg: "Change the border radius style {{roundedtype}} property.",
		container: doc_core.stackcontainer,
		viewclass: "cl-highlight-box-dark",
		code: function () {
			return [null, "top", "end", "bottom", "start", "pill", "circle"].map(function (i) {
				return new tag({
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
