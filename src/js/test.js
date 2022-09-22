"use strict";

///library
import * as core from "./base/core.js";
import * as progress from "./base/progress.js";

///code
let code = () => {
	let fn = (color, value) => {
		return new progress.container({
			item: {
				color: color,
				value: value,
			},
		});
	};

	return [fn("primary", 10)];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
