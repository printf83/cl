"use strict";
import $ from "../component.js";

export default [
	{
		title: "Close button",
		msg: "A generic close button for dismissing content like modals and alerts.",
		anchor: false,
	},

	{
		title: "Example",
		code: function () {
			return new $.btnclose();
		},
	},

	{
		title: "Disabled state",
		code: function () {
			return new $.btnclose({ disabled: true });
		},
	},

	{
		title: "White variant",
		dark: true,
		container: $.container.stack,
		code: function () {
			return [new $.btnclose({ dark: false }), new $.btnclose({ dark: false, disabled: true })];
		},
	},
];
