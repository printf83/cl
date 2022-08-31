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
					weight: "lg",
					type: "text",
					placeholder: 'weight:"lg"',
				}),
				new input({
					type: "text",
					placeholder: "Default input",
				}),
				new input({
					weight: "sm",
					type: "text",
					placeholder: 'weight:"sm"',
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
					disabled: true,
					type: "text",
					placeholder: "Disabled input",
				}),
				new input({
					disabled: true,
					readonly: true,
					type: "text",
					placeholder: "Disabled readonly input",
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
				readonly: true,
				type: "text",
				placeholder: "Readonly input here...",
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
					readonly: true,
					plaintext: true,
					value: "name@example.com",
				}),
				new input({
					label: "Password",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "password",
				}),
			];
		},
	},

	{
		title: "Readonly plain text (Stack)",
		container: sample.stackcontainer,
		import: ["button", "input"],
		code: () => {
			return [
				new input({
					label: "Email",
					hidelabel: true,
					type: "email",
					readonly: true,
					plaintext: true,
					value: "name@example.com",
				}),
				new input({
					label: "Password",
					hidelabel: true,
					placeholder: "Password",
					type: "password",
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
				new input({ label: "Default file input example", type: "file" }),
				new input({ label: "Multiple files input example", type: "file", multiple: true }),
				new input({ label: "Disabled file input example", type: "file", disabled: true }),
				new input({ label: "Small file input example", type: "file", weight: "sm" }),
				new input({ label: "Large file input example", type: "file", weight: "lg" }),
			];
		},
	},

	{
		title: "Color",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return new input({ label: "Color picker", type: "color" });
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
