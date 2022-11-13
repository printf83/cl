"use strict";

import * as core from "../../cl/js/base/core.js";
import button from "../../cl/js/base/button.js";
import p from "../../cl/js/base/p.js";

core.documentReady(() => {
	core.appendChild(
		document.getElementById("root"),
		new button({
			label: "Hello World!",
			color: "primary",
		})
	);
	core.appendChild(document.getElementById("root"), new p("Hello World!"));
});
