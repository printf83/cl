"use strict";
import * as core from "../base/core.js";
import sample from "./sample.js";
import input from "../base/input.js";
import button from "../base/button.js";
import toast from "../base/toast.js";
import * as table from "../base/table.js";

export default [
	{
		title: "Form controls",
		msg: "Give textual form controls like {{&lt;input&gt;}}s and {{&lt;textarea&gt;}}s an upgrade with custom styles, sizing, focus states, and more.",
		anchor: false,
	},

	{
		title: "Example",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Email address",
					type: "email",
					placeholder: "name@example.com",
					helper: "We'll never share your email with anyone else.",
				}),
				new input({
					label: "Example textarea",
					type: "textarea",
				}),
			];
		},
	},

	{
		title: "Sizing",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					type: "text",
					placeholder: 'weight:"lg"',

					//marker
					weight: "lg",
				}),
				new input({
					type: "text",
					placeholder: "Default input",
				}),
				new input({
					type: "text",
					placeholder: 'weight:"sm"',

					//marker
					weight: "sm",
				}),
			];
		},
	},

	{
		title: "Disabled",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					type: "text",
					placeholder: "Disabled input",

					//marker
					disabled: true,
				}),
				new input({
					type: "text",
					placeholder: "Disabled readonly input",

					//marker
					disabled: true,
					readonly: true,
				}),
			];
		},
	},

	{
		title: "Readonly",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return new input({
				type: "text",
				placeholder: "Readonly input here...",

				//marker
				readonly: true,
			});
		},
	},

	{
		title: "Readonly plain text",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Email",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "email",
					value: "name@example.com",
					autocomplete: "email",

					//marker
					readonly: true,
					plaintext: true,
				}),
				new input({
					label: "Password",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "password",
					autocomplete: "current-password",
				}),
			];
		},
	},

	{
		title: "Readonly plain text (Stack)",
		container: sample.stackformcontainer,
		import: ["button", "input"],
		code: () => {
			return [
				new input({
					label: "Email",
					hidelabel: true,
					type: "email",
					value: "name@example.com",
					autocomplete: "email",

					//marker
					readonly: true, 
					plaintext: true, 
				}),
				new input({
					label: "Password",
					hidelabel: true,
					placeholder: "Password",
					type: "password",
					autocomplete: "current-password",
				}),
				new button({
					type: "submit",
					label: "Confirm identity",
					color: "primary",
				}),
			];
		},
	},

	{
		title: "File input",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Default file input example",

					//marker
					type: "file",
				}),
				new input({
					label: "Multiple files input example",

					//marker
					type: "file",
					multiple: true,
				}),
				new input({
					label: "Disabled file input example",

					//marker
					type: "file", 
					disabled: true,
				}),
				new input({
					label: "Small file input example",

					//marker
					type: "file", 
					weight: "sm",
				}),
				new input({
					label: "Large file input example",

					//marker
					type: "file",
					weight: "lg",
				}),
			];
		},
	},

	{
		title: "Color",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return new input({
				label: "Color picker",

				//marker
				type: "color",
			});
		},
	},

	{
		title: "Datalist",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return new input({
				label: "Datalist example",
				type: "text",

				//marker
				option: ["San Francisco", "New York", "Seattle", "Los Angeles", "Chicago"],
			});
		},
	},

	{
		title: "Event",
		msg: [
			new table.container({
				item: [
					["Option", "Description"],
					["<code>onclick</code>", "This event is fired when the control is clicked."],
					["<code>onfocus</code>", "This event is fired when the control is focused."],
					["<code>onblur</code>", "This event is fired when the control is leaved."],
					["<code>onchange</code>", "This event is fired when the control value is changed after leaved"],
				],
			}),
		],
		container: sample.formcontainer,
		import: ["input", "toast"],
		code: () => {
			let fn = (sender, event) => `Input <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return [
				new input({
					label: "Email address",
					type: "email",
					placeholder: "name@example.com",
					helper: "We'll never share your email with anyone else.",

					//marker
					onclick: (event) => {
						new toast("i", fn(event.currentTarget, "onclick")).show();
					},
					onfocus: (event) => {
						new toast("!", fn(event.currentTarget, "onfocus")).show();
					},
					onblur: (event) => {
						new toast("-", fn(event.currentTarget, "onblur")).show();
					},
					onchange: (event) => {
						new toast("/", fn(event.currentTarget, "onchange")).show();
					},
				}),
				new input({
					label: "Example textarea",
					type: "textarea",

					//marker
					onclick: (event) => {
						new toast("i", fn(event.currentTarget, "onclick")).show();
					},
					onfocus: (event) => {
						new toast("!", fn(event.currentTarget, "onfocus")).show();
					},
					onblur: (event) => {
						new toast("-", fn(event.currentTarget, "onblur")).show();
					},
					onchange: (event) => {
						new toast("/", fn(event.currentTarget, "onchange")).show();
					},
				}),
			];
		},
	},
];
