"use strict";
import * as doc_core from "./core.js";
import btnclose from "../base/btnclose.js";

export default [
	{
		title: "Close button",
		msg: "A generic close button for dismissing content like modals and alerts.",
		anchor: false,
	},

	{
		title: "Example",
		code: function () {
			return new btnclose();
		},
	},

	{
		title: "Disabled state",
		code: function () {
			return new btnclose({ disabled: true });
		},
	},

	{
		title: "White variant",
		dark: true,
		container: doc_core.stackcontainer,
		code: function () {
			return [new btnclose({ dark: false }), new btnclose({ dark: false, disabled: true })];
		},
	},
];
