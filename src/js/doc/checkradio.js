"use strict";
import sample from "./sample.js";
import input from "../base/input.js";
import button from "../base/button.js";

export default [
	{
		title: "Checks & radios",
		msg: "Create consistent cross-browser and cross-device checkboxes and radios with Bootstrap completely rewritten checks component.",
		anchor: false,
	},

	{
		title: "Checks",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Default checkbox",

					//marker
					type: "checkbox",
				}),
				new input({
					label: "Checked checkbox",

					//marker
					type: "checkbox",
					checked: true,
					//-
				}),
			];
		},
	},

	{
		title: "Indeterminate",
		import: ["input"],
		code: () => {
			return new input({
				label: "Indeterminate checkbox",
				type: "checkbox",

				//marker
				indeterminate: true,
			});
		},
	},

	{
		title: "Disabled",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Disabled checkbox",
					type: "checkbox",

					//marker
					disabled: true,
				}),
				new input({
					label: "Disabled checked checkbox",
					type: "checkbox",

					//marker
					disabled: true,
					checked: true,
					//-
				}),
			];
		},
	},

	{
		title: "Radio",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Default radio",

					//marker
					name: "g1",
					type: "radio",
					//-
				}),
				new input({
					label: "Checked radio",

					//marker
					name: "g1",
					type: "radio",
					checked: true,
					//-
				}),
			];
		},
	},

	{
		title: "Disabled",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Disabled radio",

					//marker
					name: "g2",
					type: "radio",
					disabled: true,
					//-
				}),
				new input({
					label: "Disabled checked radio",

					//marker
					type: "radio",
					checked: true,
					disabled: true,
					//-
				}),
			];
		},
	},

	{
		title: "Switch",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "Default switch checkbox input",

					//marker
					type: "switch",
				}),
				new input({
					label: "Checked switch checkbox input",

					//marker
					type: "switch",
					checked: true,
					//-
				}),
				new input({
					label: "Disabled switch checkbox input",

					//marker
					type: "switch",
					disabled: true,
					//-
				}),
				new input({
					label: "Disabled checked switch checkbox input",

					//marker
					type: "switch",
					checked: true,
					disabled: true,
					//-
				}),
			];
		},
	},

	{
		title: "Default (stacked)",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({ label: "Disabled checkbox", type: "checkbox", checked: true }),
				new input({ label: "Disabled checkbox", type: "checkbox", disabled: true }),
				new input({ name: "g3", label: "Default radio", type: "radio" }),
				new input({ name: "g3", label: "Second radio", type: "radio", checked: true }),
				new input({ name: "g3", label: "Disabled radio", type: "radio", disabled: true }),
			];
		},
	},

	{
		title: "Disabled",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					name: "g4",
					label: "Disabled radio",
					type: "radio",

					//marker
					disabled: true,
				}),
				new input({
					name: "g4",
					label: "Disabled checked radio",
					type: "radio",
					checked: true,

					//marker
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Inline Check",
		container: sample.stackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "1",

					//marker
					type: "checkbox",
					inline: true,
					//-
				}),
				new input({
					label: "2",

					//marker
					type: "checkbox",
					inline: true,
					//-
				}),
				new input({
					label: "3 (disabled)",

					//marker
					type: "checkbox",
					inline: true,
					disabled: true,
					//-
				}),
			];
		},
	},

	{
		title: "Inline Radio",
		container: sample.stackcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					label: "1",

					//marker
					name: "g5",
					type: "radio",
					inline: true,
					//-
				}),
				new input({
					label: "2",

					//marker
					name: "g5",
					type: "radio",
					inline: true,
					//-
				}),
				new input({
					label: "3 (disabled)",

					//marker
					name: "g5",
					type: "radio",
					inline: true,
					disabled: true,
					//-
				}),
			];
		},
	},

	{
		title: "Without label",
		container: sample.vstackcontainer,
		import: ["input"],
		code: () => {
			return [new input({ type: "checkbox" }), new input({ name: "g6", type: "radio" })];
		},
	},

	{
		title: "Checkbox toggle button",
		import: ["button"],
		code: () => {
			return new button({
				label: "Single toggle",
				color: "primary",

				//marker
				type: "checkbox",
			});
		},
	},

	{
		title: "Checkbox toggle button checked",
		import: ["button"],
		code: () => {
			return new button({
				label: "Checked",
				color: "primary",

				//marker
				type: "checkbox",
				checked: true,
				//-
			});
		},
	},

	{
		title: "Checkbox toggle button disabled",
		import: ["button"],
		code: () => {
			return new button({
				label: "Disabled",
				color: "primary",

				//marker
				type: "checkbox",
				disabled: true,
				//-
			});
		},
	},

	{
		title: "Radio toggle buttons",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					label: "Checked",
					color: "secondary",

					//marker
					name: "g7",
					type: "radio",
					checked: true,
					//-
				}),

				new button({
					label: "Radio",
					color: "secondary",

					//marker
					name: "g7",
					type: "radio",
					//-
				}),

				new button({
					label: "Disabled",
					color: "secondary",

					//marker
					name: "g7",
					type: "radio",
					disabled: true,
					//-
				}),

				new button({
					label: "Radio",
					color: "secondary",

					//marker
					name: "g7",
					type: "radio",
					//-
				}),
			];
		},
	},

	{
		title: "Outlined styles",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					label: "Single toggle",
					color: "primary",

					//marker
					type: "checkbox",
					outline: true,
					//-
				}),
				new button({
					label: "Checked",
					color: "secondary",

					//marker
					type: "checkbox",
					outline: true,
					checked: true,
					//-
				}),
				new button({
					label: "Checked success radio",

					//marker
					name: "g8",
					type: "radio",
					outline: true,
					checked: true,
					color: "success",
					//-
				}),
				new button({
					label: "Danger radio",

					//marker
					name: "g8",
					type: "radio",
					outline: true,
					color: "danger",
					//-
				}),
			];
		},
	},
];
