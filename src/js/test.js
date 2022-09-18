"use strict";

///library
import * as core from "./base/core.js";
import * as layout from "./base/layout.js";

///code
let code = () => {
	return new layout.l1({
		topid: "top",
		leftid: "left",
		rightid: "right",
		mainid: "main",
		footerid: "footer",

		topelem: "Top",
		leftelem: "Left",
		rightelem: "Right",
		mainelem: "Main",
		footerelem: "Footer",

		backtotop: true,
	});
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
