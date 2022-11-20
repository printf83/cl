"use strict";
import sample from "./sample.js";
import input from "../dist/cl/base/input.js";
import button from "../dist/cl/base/button.js";

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
				indeterminate: true, //marker
				label: "Indeterminate checkbox",
				type: "checkbox",
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
					type: "checkbox",
					disabled: true, //marker
					label: "Disabled checkbox",
				}),
				new input({
					type: "checkbox",
					disabled: true, //marker
					checked: true, //marker
					label: "Disabled checked checkbox",
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
					name: "g1", //marker
					type: "radio", //marker
					label: "Default radio",
				}),
				new input({
					name: "g1", //marker
					type: "radio", //marker
					checked: true, //marker
					label: "Checked radio",
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
					name: "g2",
					type: "radio",
					disabled: true, //marker
					label: "Disabled radio",
				}),
				new input({
					type: "radio",
					checked: true,
					disabled: true, //marker
					label: "Disabled checked radio",
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
					type: "switch", //marker
					label: "Default switch checkbox input",
				}),
				new input({
					type: "switch", //marker
					checked: true, //marker
					label: "Checked switch checkbox input",
				}),
				new input({
					type: "switch", //marker
					disabled: true, //marker
					label: "Disabled switch checkbox input",
				}),
				new input({
					type: "switch", //marker
					checked: true, //marker
					disabled: true, //marker
					label: "Disabled checked switch checkbox input",
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
					disabled: true, //marker
				}),
				new input({
					name: "g4",
					label: "Disabled checked radio",
					type: "radio",
					checked: true,
					disabled: true, //marker
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
					type: "checkbox",
					inline: true, //marker
					label: "1",
				}),
				new input({
					type: "checkbox",
					inline: true, //marker
					label: "2",
				}),
				new input({
					type: "checkbox",
					inline: true, //marker
					disabled: true,
					label: "3 (disabled)",
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
				type: "checkbox", //marker
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
				type: "checkbox", //marker
				checked: true, //marker
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
