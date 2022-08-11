"use strict";
import $ from "../component.js";

export default [
	{
		title: "Overflow",
		msg: "Use these shorthand utilities for quickly configuring how content overflows an element.",
		anchor: false,
	},

	{
		msg: "Adjust the overflow property on the fly with four default values and classes. These classes are not responsive by default.",
		container: (elem) => {
			return new $.div({ display: "md-flex", class: "gap-2", elem: elem });
		},
		code: () => {
			return [
				new $.tag({
					tag: "div",
					class: "cl-highlight-element",
					style: { "max-height": "6rem" },
					overflow: "auto",
					elem: "This is an example of using <code>overflow:auto</code> on an element with set width and height dimensions. By design, this content will vertically scroll.",
				}),
				new $.tag({
					tag: "div",
					class: "cl-highlight-element",
					style: { "max-height": "6rem" },
					overflow: "hidden",
					elem: "This is an example of using <code>overflow:hidden</code> on an element with set width and height dimensions.",
				}),
				new $.tag({
					tag: "div",
					class: "cl-highlight-element",
					style: { "max-height": "6rem" },
					overflow: "visible",
					elem: "This is an example of using <code>overflow:visible</code> on an element with set width and height dimensions.",
				}),
				new $.tag({
					tag: "div",
					class: "cl-highlight-element",
					style: { "max-height": "6rem" },
					overflow: "scroll",
					elem: "This is an example of using <code>overflow:scroll</code> on an element with set width and height dimensions.",
				}),
			];
		},
	},
];
