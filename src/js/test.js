"use strict";

import * as core from "./base/core.js";
import button from "./base/button.js";
import p from "./base/p.js";

core.documentReady(() => {
	core.appendChild(
		document.body,
		new button({
			label: "Hello World!",
			color: "primary",
		})
	);
	core.appendChild(document.body, new p("Hello World!"));
});
