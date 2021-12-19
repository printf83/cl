"use strict";
import * as core from "./base/core.js";
import * as cl from "./base/cl.js";
import div from "./base/div.js";

core.documentReady(() => {
	//topbar
	cl.replaceChild(document.getElementById("root"), new div("Hello Sandbox"));
});
