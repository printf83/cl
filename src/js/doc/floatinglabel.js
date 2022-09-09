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
					type: "email",
					label: "Email address",
					helper: "We'll never share your email with anyone else.",
					floatlabel: true, //marker
					autocomplete: "email",
				}),

				new input({
					type: "password",
					label: "Password",
					floatlabel: true, //marker
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
				floatlabel: true, //marker
				value: "user@example.com", //marker
			});
		},
	},

	{
		title: "Validation",
		import: ["toast", "button", "input"],
		code: () => {
			return new input({
				type: "email",
				name: "email",
				label: "Email address",
				floatlabel: true,
				required: true,
				invalid: "Please provide email", //marker
				valid: "It's looks good", //marker
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
			});
		},
	},

	{
		title: "Textareas",
		import: ["input"],
		code: () => {
			return new input({
				type: "textarea", //marker
				label: "Comments",
				floatlabel: true,
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
				style: { height: "100px" }, //marker
				floatlabel: true,
			});
		},
	},

	{
		title: "Select",
		import: ["input"],
		code: () => {
			return new input({
				label: "Works with selects",
				type: "select", //marker
				floatlabel: true,
				option: [
					{ value: "", label: "Open this select menu", selected: true },
					{ value: "1", label: "One" },
					{ value: "2", label: "Two" },
					{ value: "3", label: "Three" },
				],
			});
		},
	},
];
