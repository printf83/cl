"use strict";

///library
import * as core from "./base/core.js";
import toast from "./base/toast.js";

///code
let code = () => {
	return new toast({
		color: "primary",
		elem: "Hello, world! This is a toast message.",
		debug: true, // documentation purpose only
	});
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
