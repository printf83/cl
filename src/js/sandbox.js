"use strict";
import "../css/base.css";
import "../css/animation.css";

import * as core from "../js/base/core.js";
import * as cl from "../js/base/cl.js";
import div from "../js/base/div.js";
import query from "../js/base/query.js";

core.documentReady(() => {
	//topbar
	cl.replaceChild(document.getElementById("root"), new div("Hello Sandbox"));
	new query({}, [
		function (event, data) {
			console.log(data);
		},
	]).show();
});
