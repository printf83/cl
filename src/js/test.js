"use strict";

///library
import * as core from "./base/core.js";
import tag from "./base/tag.js";

///code
let code = () => {
	return [
		new tag({
			tag: "div",
			class: "cl-highlight-element",
			maxHeight: "6rem",
			elem: "This is an example of using <code>overflow:auto</code> on an element with set width and height dimensions. By design, this content will vertically scroll.",

			overflow: "auto",
		}),
		new tag({
			tag: "div",
			class: "cl-highlight-element",
			maxHeight: "6rem",
			elem: "This is an example of using <code>overflow:hidden</code> on an element with set width and height dimensions.",

			overflow: "hidden",
		}),
		new tag({
			tag: "div",
			class: "cl-highlight-element",
			maxHeight: "6rem",
			elem: "This is an example of using <code>overflow:visible</code> on an element with set width and height dimensions.",

			overflow: "visible",
		}),
		new tag({
			tag: "div",
			class: "cl-highlight-element",
			maxHeight: "6rem",
			elem: "This is an example of using <code>overflow:scroll</code> on an element with set width and height dimensions.",

			overflow: "scroll",
		}),
	];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
