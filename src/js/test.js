"use strict";

///library
import * as core from "./base/core.js";
import input from "./base/input.js";

///code
let code = () => {
	return new input({
		label: "Disabled select example",
		hidelabel: true,
		type: "select",
		option: [
			{
				value: "",
				label: "Open this select menu",
				selected: true,
			},
			{
				value: "1",
				label: "One",
			},
			{
				value: "2",
				label: "Two",
			},
			{
				value: "3",
				label: "Three",
			},
		],

		disabled: true,
	});
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
