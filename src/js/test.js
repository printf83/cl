"use strict";

///library
import * as core from "./base/core.js";
import * as progress from "./base/progress.js";

///code
let code = () => {
	return [
		new progress.container({
			height: 1,

			item: {
				value: 25,
			},
		}),
		new progress.container({
			height: 20,

			item: {
				value: 75,
			},
		}),
	];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
