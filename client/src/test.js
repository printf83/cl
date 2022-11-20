"use strict";

///library
import * as core from "./dist/cl/base/core.js";
import tag from "./dist/cl/base/tag.js";

///code
let code = () => {
	return [
		new tag({
			tag: "div",
			elem: "Example with style",

			border: "2px solid #aaa",
			backgroundColor: "rgba(255,0,0,0.5)",
			padding: "1rem",
		}),
	];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
