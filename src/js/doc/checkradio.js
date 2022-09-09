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
					type: "checkbox", //marker
				}),
				new input({
					label: "Checked checkbox",
					type: "checkbox", //marker
					checked: true,
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
					disabled: true, //marker
				}),
				new input({
					label: "Disabled checked checkbox",
					type: "checkbox",
					checked: true,
					disabled: true, //marker
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
					name: "g1",
					label: "Default radio",
					type: "radio", //marker
				}),
				new input({
					name: "g1",
					label: "Checked radio",
					type: "radio", //marker
					checked: true,
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
					label: "Disabled radio",
					type: "radio",
					disabled: true, //marker
				}),
				new input({
					name: "g2",
					label: "Disabled checked radio",
					type: "radio",
					checked: true,
					disabled: true, //marker
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
					type: "switch", //marker
				}),
				new input({
					label: "Checked switch checkbox input",
					type: "switch", //marker
					checked: true,
				}),
				new input({
					label: "Disabled switch checkbox input",
					type: "switch", //marker
					disabled: true,
				}),
				new input({
					label: "Disabled checked switch checkbox input",
					type: "switch", //marker
					checked: true,
					disabled: true,
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
				new input({ name: "g4", label: "Disabled radio", type: "radio", disabled: true }),
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
					label: "1",
					type: "checkbox",
					inline: true, //marker
				}),
				new input({
					label: "2",
					type: "checkbox",
					inline: true, //marker
				}),
				new input({
					label: "3 (disabled)",
					type: "checkbox",
					disabled: true,
					inline: true, //marker
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
					name: "g5",
					label: "1",
					type: "radio",
					inline: true, //marker
				}),
				new input({
					name: "g5",
					label: "2",
					type: "radio",
					inline: true, //marker
				}),
				new input({
					name: "g5",
					label: "3 (disabled)",
					type: "radio",
					disabled: true,
					inline: true, //marker
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
			//marker
			return new button({
				type: "checkbox", //marker
				label: "Single toggle",
				color: "primary",
			});
		},
	},

	{
		title: "Checkbox toggle button checked",
		import: ["button"],
		code: () => {
			return new button({
				type: "checkbox",
				checked: true, //marker
				label: "Checked",
				color: "primary",
			});
		},
	},

	{
		title: "Checkbox toggle button disabled",
		import: ["button"],
		code: () => {
			return new button({
				type: "checkbox",
				disabled: true, //marker
				label: "Disabled",
				color: "primary",
			});
		},
	},

	{
		title: "Radio toggle buttons",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				//marker
				new button({
					type: "radio", //marker
					name: "g7",
					label: "Checked",
					checked: true,
					color: "secondary",
				}),

				//marker
				new button({
					type: "radio", //marker
					name: "g7",
					label: "Radio",
					color: "secondary",
				}),

				//marker
				new button({
					type: "radio", //marker
					name: "g7",
					label: "Disabled",
					disabled: true,
					color: "secondary",
				}),

				//marker
				new button({
					type: "radio", //marker
					name: "g7",
					label: "Radio",
					color: "secondary",
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
					type: "checkbox",
					outline: true, //marker
					label: "Single toggle",
					color: "primary",
				}),
				new button({
					type: "checkbox",
					outline: true, //marker
					label: "Checked",
					checked: true,
					color: "secondary",
				}),
				new button({
					type: "radio",
					outline: true, //marker
					name: "g8",
					label: "Checked success radio",
					checked: true,
					color: "success",
				}),
				new button({
					type: "radio",
					outline: true, //marker
					name: "g8",
					label: "Danger radio",
					color: "danger",
				}),
			];
		},
	},
];
