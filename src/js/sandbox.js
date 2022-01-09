"use strict";
import $ from "./component.js";

$.core.documentReady(() => {
	$.core.replaceChild(
		document.getElementById("root"),
		new $.button({
			label: "Show Query Dialog",
			color: "primary",
			icon: "fire",
			onclick: function () {
				new $.query({}, [
					function (event, data) {
						new $.toast("/", JSON.stringify(data)).show();
					},
				]).show();
			},
		})
	);
});
