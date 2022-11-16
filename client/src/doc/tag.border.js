"use strict";
import sample from "./sample.js";
import tag from "../cl/base/tag.js";

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
		import: ["tag"],
		code: () => {
			return [null, true, "top", "end", "bottom", "start", ["bottom", "start"]].map((i) => {
				return new tag({
					tag: "div",
					border: i, //marker
				});
			});
		},
	},

	{
		title: "Subtractive",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box",
		import: ["tag"],
		code: () => {
			return [null, true, "top", "end", "bottom", "start", ["bottom", "start"]].map((i) => {
				return new tag({
					tag: "div",
					borderNone: i, //marker
				});
			});
		},
	},

	{
		title: "Border color",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box",
		import: ["tag"],
		code: () => {
			return [null, "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "white"].map(
				(i) => {
					return new tag({
						tag: "div",
						borderColor: i, //marker
					});
				}
			);
		},
	},

	{
		title: "Border width",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box",
		import: ["tag"],
		code: () => {
			return [null, 0, 1, 2, 3, 4, 5].map((i) => {
				return new tag({
					tag: "div",
					borderWidth: i, //marker
				});
			});
		},
	},

	{
		title: "Sizes",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box-dark",
		import: ["tag"],
		code: () => {
			return [null, 0, 1, 2, 3, 4, 5].map((i) => {
				return new tag({
					tag: "div",
					roundedSize: i, //marker
				});
			});
		},
	},

	{
		title: "Border radius",
		container: sample.stackcontainer,
		viewclass: "cl-highlight-box-dark",
		import: ["tag"],
		code: () => {
			return [null, "top", "end", "bottom", "start", "pill", "circle"].map((i) => {
				return new tag({
					tag: "div",
					rounded: i, //marker
				});
			});
		},
	},
];
