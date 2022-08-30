"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import button from "../base/button.js";
import * as container from "../base/container.js";
import div from "../base/div.js";
import input from "../base/input.js";

export default [
	{
		anchor: false,
		title: "Buttons",
		msg: "Use Bootstraps custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.",
	},

	{
		title: "Examples",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({ label: core.capitalize(i), color: i });
				}
			);
		},
	},
];
