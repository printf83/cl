"use strict";

///library
import * as core from "./base/core.js";
import * as alert from "./base/alert.js";
import button from "./base/button.js";
import div from "./base/div.js";
import dropdown from "./base/dropdown.js";
import input from "./base/input.js";

///code
let code = () => {
	return [
		new dropdown({
			label: "Drowdown button",
			color: "secondary",
			tooltip: {
				color: "danger",
				notification: true,
				label: "New message",
				rounded: "pill",
				hidelabel: true,
			},
			option: [
				{
					href: "#",
					label: "Action",
				},
				{
					href: "#",
					label: "Tooltip",
				},
				{
					href: "#",
					label: "Something else here",
				},
				{
					value: "-",
				},
				{
					href: "#",
					label: "Separated link",
				},
			],
		}),
	];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
	core.init(document.getElementById("root"));
});
