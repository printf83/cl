"use strict";
import sample from "./sample.js";
import hr from "../base/hr.js";

export default [
	{
		title: "Horizontal rule",
		msg: ["Helper to create {{&lt;hr&gt;}} tag"],
		anchor: false,
	},

	{
		msg: [
			"Shortcut for {{new tag({tag:'hr'})}}",
			"This component is extended from {{tag}} component, so any property on tag component, will also work on this component.",
			"Property inherits from tag component:",
			sample.tagprop("elem"),
		],
	},

	{
		title: "Example",
		container: sample.vstackcontainer,
		import: ["hr"],
		code: () => {
			return [
				new hr(),
				new hr({
					attr: {
						"data-test": "test",
					},
				}),
			];
		},
	},
];
