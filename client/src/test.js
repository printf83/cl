"use strict";

import * as core from "./dist/cl/base/core.js";
import button from "./dist/cl/base/button.js";
import p from "./dist/cl/base/p.js";

let code = () => {
	return [
		new button({
			label: "Hello World!",
			color: "primary",
		}),
		new p("Hello World!"),
	];
};

core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
