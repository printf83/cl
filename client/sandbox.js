"use strict";
import "../src/css/base.css";
import "../src/css/animation.css";

import * as core from "../src/js/base/core.js";
import * as cl from "../src/js/base/cl.js";
import div from "../src/js/base/div.js";
import query from "../src/js/base/query.js";

core.documentReady(() => {
	//topbar
	cl.replaceChild(document.getElementById("root"), new div("Hello Sandbox"));
	new query({}, [
		function (event, data) {
			console.log(data);
		},
	]).show();
});
