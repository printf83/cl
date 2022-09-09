"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import toast from "../base/toast.js";
import input from "../base/input.js";
import button from "../base/button.js";

export default [
	{
		title: "Floating labels",
		msg: "Create beautifully simple form labels that float over your input fields.",
		anchor: false,
	},

	{
		title: "Example",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Email address",
					helper: "We'll never share your email with anyone else.",

					//marker
					floatlabel: true,
					type: "email",
					autocomplete: "email",
				}),

				new input({
					label: "Password",

					//marker
					floatlabel: true,
					type: "password",
					autocomplete: "current-password",
				}),
			];
		},
	},

	{
		title: "Value already defind",
		import: ["input"],
		code: () => {
			return new input({
				type: "email",
				label: "Email address",

				//marker
				floatlabel: true,
				value: "user@example.com",
			});
		},
	},

	{
		title: "Validation",
		import: ["toast", "button", "input"],
		code: () => {
			return new input({
				name: "email",
				label: "Email address",
				aftertype: "button",
				after: new button({
					label: "Validate",
					color: "primary",
					onclick: (event) => {
						//marker
						core.validate(event.currentTarget.parentElement, (result) => {
							new toast("i", `Result: ${result}`).show();
						});
					},
				}),

				//marker
				floatlabel: true,
				type: "email",
				required: true,
				invalid: "Please provide email",
				valid: "It's looks good",
			});
		},
	},

	{
		title: "Textareas",
		import: ["input"],
		code: () => {
			return new input({
				label: "Comments",

				//marker
				floatlabel: true,
				type: "textarea",
			});
		},
	},

	{
		title: "Textareas With Height Setting",
		import: ["input"],
		code: () => {
			return new input({
				type: "textarea",
				label: "Comments",

				//marker
				floatlabel: true,
				style: { height: "100px" },
			});
		},
	},

	{
		title: "Select",
		import: ["input"],
		code: () => {
			return new input({
				label: "Works with selects",
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],

				//marker
				floatlabel: true,
				type: "select",
			});
		},
	},
];
