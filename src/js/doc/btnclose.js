"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Close button",
		msg: "A generic close button for dismissing content like modals and alerts.",
		anchor: false,
	},

	{
		title: "Example",
		code: () => {
			return new $.btnclose();
		},
	},

	{
		title: "Disabled state",
		code: () => {
			return new $.btnclose({ disabled: true });
		},
	},

	{
		title: "White variant",
		dark: true,
		container: sample.stackcontainer,
		code: () => {
			return [new $.btnclose({ dark: false }), new $.btnclose({ dark: false, disabled: true })];
		},
	},
];
