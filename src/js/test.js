"use strict";

///library
import * as core from "./base/core.js";
import button from "./base/button.js";

///code
let code = () => {
	return [
		new button({
			weight: "lg",
			color: "primary",
			disabled: true,
			href: "#",
			label: "Primary link",
		}),
		new button({
			weight: "lg",
			color: "secondary",
			disabled: true,
			href: "#",
			label: "Link",
		}),
	];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
