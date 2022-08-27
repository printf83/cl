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
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					type: "email",
					label: "Email address",
					floatlabel: true,
				}),

				new input({
					type: "password",
					label: "Password",
					floatlabel: true,
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
				type: "email",
				name: "email",
				label: "Email address",
				floatlabel: true,
				required: true,
				invalid: "Please provide email",
				aftertype: "button",
				after: new button({
					label: "Validate",
					color: "primary",
					onclick: (event) => {
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
				type: "textarea",
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
				style: { height: "100px" },
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
				type: "select",
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
