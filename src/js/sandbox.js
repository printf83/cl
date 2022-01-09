"use strict";
import $ from "./component.js";

$.core.documentReady(() => {
	//topbar
	$.core.replaceChild(document.getElementById("root"), new $.div("Hello Sandbox"));
	new $.query({}, [
		function (event, data) {
			console.log(data);
		},
	]).show();
});
