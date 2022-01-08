"use strict";
import "../css/base.css";
import "../css/animation.css";

import $ from "./component.js";

core.documentReady(() => {
	//topbar
	$.cl.replaceChild(document.getElementById("root"), new $.div("Hello Sandbox"));
	new $.query({}, [
		function (event, data) {
			console.log(data);
		},
	]).show();
});
