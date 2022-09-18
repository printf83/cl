"use strict";

///library
import * as core from "./base/core.js";
import h from "./base/h.js";

///code
let code = () => {
	return [
		// new h({
		// 	level: 5,
		// 	class: "classname",
		// 	elem: "Using elem property",
		// }),
		// new h(5, "Direct level and elem property"),
		new h("classname", "Direct class and elem property"),
		new h(5, "classname", "Direct level, class and elem property"),
	];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
