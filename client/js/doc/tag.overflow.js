"use strict";
import tag from "../../cl/js/base/tag.js";
import div from "../../cl/js/base/div.js";
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
		import: ["tag", "sanple"],
		code: () => {
			return [
				new tag({
					tag: "div",
					class: "cl-highlight-element",
					maxHeight: "6rem",
					overflow: "auto", //marker
					elem: `This is an example of using <code>overflow:auto</code> on an element with set width and height dimensions. By design, this content will vertically scroll. ${sample.shorttext()}`,
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-element",
					maxHeight: "6rem",
					overflow: "hidden", //marker
					elem: `This is an example of using <code>overflow:hidden</code> on an element with set width and height dimensions. ${sample.shorttext()}`,
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-element",
					maxHeight: "6rem",
					overflow: "visible", //marker
					elem: `This is an example of using <code>overflow:visible</code> on an element with set width and height dimensions. ${sample.shorttext()}`,
				}),
				new tag({
					tag: "div",
					class: "cl-highlight-element",
					maxHeight: "6rem",
					overflow: "scroll", //marker
					elem: `This is an example of using <code>overflow:scroll</code> on an element with set width and height dimensions. ${sample.shorttext()}`,
				}),
			];
		},
	},
];
