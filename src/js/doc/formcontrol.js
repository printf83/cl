"use strict";
import * as core from "../base/core.js";
import sample from "./sample.js";
import input from "../base/input.js";
import button from "../base/button.js";
import toast from "../base/toast.js";
import * as table from "../base/table.js";
import div from "../base/div.js";

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
					weight: "lg", //marker
					placeholder: 'weight:"lg"',
				}),
				new input({
					type: "text",
					placeholder: "Default input",
				}),
				new input({
					type: "text",
					weight: "sm", //marker
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
					type: "text",
					disabled: true, //marker
					placeholder: "Disabled input",
				}),
				new input({
					type: "text",
					disabled: true, //marker
					readonly: true, //marker
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
				type: "text",
				readonly: true, //marker
				placeholder: "Readonly input here...",
			});
		},
	},

	{
		title: "Readonly plain text",
		// container: sample.stackformcontainer,
		import: ["input"],
		code: () => {
			return new div({
				container: "fluid",
				padding: 0,
				elem: [
					new div({
						row: true,
						gap: 2,
						elem: new input({
							label: "Email",
							labelsize: "md-3",
							ctlsize: "auto",
							type: "email",
							value: "name@example.com",
							autocomplete: "email",
							readonly: true, //marker
							plaintext: true, //marker
						}),
					}),
					new div({
						row: true,
						gap: 2,
						elem: new input({
							label: "Password",
							labelsize: "md-3",
							ctlsize: "auto",
							type: "password",
							autocomplete: "current-password",
						}),
					}),
				],
			});
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
					readonly: true, //marker
					plaintext: true, //marker
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
					type: "file", //marker
					label: "Default file input example",
				}),
				new input({
					type: "file",
					multiple: true, //marker
					label: "Multiple files input example",
				}),
				new input({
					type: "file",
					disabled: true, //marker
					label: "Disabled file input example",
				}),
				new input({
					type: "file",
					weight: "sm", //marker
					label: "Small file input example",
				}),
				new input({
					type: "file",
					weight: "lg", //marker
					label: "Large file input example",
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
				type: "color", //marker
				label: "Color picker",
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
					["<code>click</code>", "This event is fired when the control is clicked."],
					["<code>focus</code>", "This event is fired when the control is focused."],
					["<code>blur</code>", "This event is fired when the control is leaved."],
					["<code>change</code>", "This event is fired when the control value is changed after leaved"],
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
					click: (event) => {
						new toast("i", fn(event.currentTarget, "click")).show();
					},
					focus: (event) => {
						new toast("!", fn(event.currentTarget, "focus")).show();
					},
					blur: (event) => {
						new toast("-", fn(event.currentTarget, "blur")).show();
					},
					change: (event) => {
						new toast("/", fn(event.currentTarget, "change")).show();
					},
					//-
				}),
				new input({
					label: "Example textarea",
					type: "textarea",

					//marker
					click: (event) => {
						new toast("i", fn(event.currentTarget, "click")).show();
					},
					focus: (event) => {
						new toast("!", fn(event.currentTarget, "focus")).show();
					},
					blur: (event) => {
						new toast("-", fn(event.currentTarget, "blur")).show();
					},
					change: (event) => {
						new toast("/", fn(event.currentTarget, "change")).show();
					},
					//-
				}),
			];
		},
	},
];
