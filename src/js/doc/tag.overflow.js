"use strict";
import tag from "../base/tag.js";
import div from "../base/div.js";
import sample from "./sample.js";

export default [
	{
		title: "Overflow",
		msg: "Use these shorthand utilities for quickly configuring how content overflows an element.",
		anchor: false,
	},

	{
		msg: "Adjust the overflow property on the fly with four default values and classes. These classes are not responsive by default.",
		container: (elem) => {
			return new div({ display: "md-flex", class: "gap-2", elem: elem });
		},
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "div",
					class: "cl-highlight-element",
					maxHeight: "6rem",
					elem: `This is an example of using <code>overflow:auto</code> on an element with set width and height dimensions. By design, this content will vertically scroll. ${sample.shorttext()}`,

					//marker
					overflow: "auto",
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-element",
					maxHeight: "6rem",
					elem: `This is an example of using <code>overflow:hidden</code> on an element with set width and height dimensions. ${sample.shorttext()}`,

					//marker
					overflow: "hidden",
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-element",
					maxHeight: "6rem",
					elem: `This is an example of using <code>overflow:visible</code> on an element with set width and height dimensions. ${sample.shorttext()}`,

					//marker
					overflow: "visible",
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-element",
					maxHeight: "6rem",
					elem: `This is an example of using <code>overflow:scroll</code> on an element with set width and height dimensions. ${sample.shorttext()}`,

					//marker
					overflow: "scroll",
				}),
			];
		},
	},
];
