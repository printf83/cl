"use strict";
import sample from "./sample.js";
import hr from "../dist/cl/base/hr.js";

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
			"CL option property that inherits from tag component :",
			sample.tagpropCl("elem"),
			"Bootstrap option property that inherits from tag component :",
			sample.tagpropBootstrap(),
			"If the Bootstrap property value is not supported by bootstrap, it will be process as html property (if supported)",
			"Html option property that inherits from tag component (if supported by the tag) :",
			sample.tagpropHtml(),
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
					"data-test": "test",
				}),
			];
		},
	},
];
