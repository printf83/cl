"use strict";
import "../css/base.css";
import "../css/animation.css";

import * as core from "./base/core.js";
import * as cl from "./base/cl.js";
import div from "./base/div.js";
import query from "./base/query.js";

core.documentReady(() => {
	//topbar
	cl.replaceChild(document.getElementById("root"), new div("Hello Sandbox"));
	new query({}, [
		function (event, data) {
			console.log(data);
		},
	]).show();
});
