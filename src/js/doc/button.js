"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import button from "../base/button.js";
import * as container from "../base/container.js";
import div from "../base/div.js";
import input from "../base/input.js";
import toast from "../base/toast.js";

export default [
	{
		anchor: false,
		title: "Buttons",
		msg: "Use Bootstraps custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.",
	},

	{
		title: "Examples",
		container: sample.stackcontainer,
		viewclass: "cl-transparent-preview",
		import: ["button"],
		code: () => {
			return [
				"primary",
				"secondary",
				"success",
				"danger",
				"warning",
				"info",
				"light",
				"dark",
				"transparent",
				"link",
			].map((i) => {
				return new button({
					label: core.capitalize(i),

					//marker
					color: i,
				});
			});
		},
	},

	{
		title: "Disable text wrapping",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return new button({
				label: "Disable text wrapping button",
				color: "primary",

				//marker
				nowrap: true,
			});
		},
	},

	{
		title: "Button tags",
		container: sample.stackcontainer,
		import: ["input", "button"],
		code: () => {
			return [
				new button({ label: "Button", color: "primary" }),

				new button({
					label: "Link",
					color: "primary",

					//marker
					href: "#",
				}),
				new button({
					label: "Input",
					color: "primary",

					//marker
					type: "input",
				}),
				new button({
					label: "Submit",
					color: "primary",

					//marker
					type: "submit",
				}),
				new button({
					label: "Reset",
					color: "primary",

					//marker
					type: "reset",
				}),
				new input({
					color: "primary",
					value: "Input button",

					//marker
					class: "btn",
					type: "button",
					//-
				}),
				new input({
					color: "primary",
					value: "Input submit",

					//marker
					class: "btn",
					type: "submit",
					//-
				}),
				new input({
					color: "primary",
					value: "Input reset",

					//marker
					class: "btn",
					type: "reset",
					//-
				}),
			];
		},
	},

	{
		title: "Outline button",
		container: sample.stackcontainer,
		viewclass: "cl-transparent-preview",
		import: ["button"],
		code: () => {
			return [
				"primary",
				"secondary",
				"success",
				"danger",
				"warning",
				"info",
				"light",
				"dark",
				"transparent",
				"link",
			].map((i) => {
				return new button({
					label: core.capitalize(i),
					color: i,

					//marker
					outline: true,
				});
			});
		},
	},

	{
		title: "Large Size",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					label: "Large button",
					color: "primary",

					//marker
					weight: "lg",
				}),
				new button({
					label: "Large button",
					color: "secondary",

					//marker
					weight: "lg",
				}),
			];
		},
	},

	{
		title: "Small Size",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					label: "Small button",
					color: "primary",

					//marker
					weight: "sm",
				}),
				new button({
					label: "Small button",
					color: "secondary",

					//marker
					weight: "sm",
				}),
			];
		},
	},

	{
		title: "Disabled state",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					weight: "lg",
					label: "Disabled button",
					color: "primary",

					//marker
					disabled: true,
				}),
				new button({
					weight: "lg",
					label: "Disabled button",
					color: "secondary",

					//marker
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Disabled button link state",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					weight: "lg",
					label: "Primary link",
					color: "primary",

					//marker
					disabled: true,
					href: "#",
					//-
				}),
				new button({
					weight: "lg",
					label: "Link",
					color: "secondary",

					//marker
					disabled: true,
					href: "#",
					//-
				}),
			];
		},
	},

	{
		title: "Block buttons",
		import: ["container", "button"],
		code: () => {
			return /*marker*/ new container.grid([
				new button({ label: "Button", color: "primary" }),
				new button({ label: "Button", color: "primary" }),
				new button({ label: "Button", color: "primary" }),
			]);
		},
	},

	{
		title: "Centered in horizontal",
		import: ["div", "button"],
		code: () => {
			return new div({
				gap: 2,
				col: 6,
				elem: [
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
				],

				//marker
				display: "grid",
				marginx: "auto",
				//-
			});
		},
	},

	{
		title: "Right align",
		import: ["div", "button"],
		code: () => {
			return new div({
				gap: 2,
				elem: [
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
				],

				//marker
				display: ["grid", "md-flex"],
				justifycontent: "md-end",
				//-
			});
		},
	},

	{
		title: "Toggle state button",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					label: "Toggle button",
					color: "primary",

					//marker
					toggle: true,
				}),
				new button({
					label: "Active toggle button",
					color: "primary",

					//marker
					toggle: true,
					active: true,
					//-
				}),
				new button({
					label: "Disabled toggle button",
					color: "primary",

					//marker
					toggle: true,
					disabled: true,
					//-
				}),
			];
		},
	},

	{
		title: "Toggle state link",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					label: "Toggle link",
					color: "primary",

					//marker
					toggle: true,
					href: "#",
					//-
				}),
				new button({
					label: "Active toggle link",
					color: "primary",

					//marker
					toggle: true,
					href: "#",
					active: true,
					//-
				}),
				new button({
					label: "Disabled toggle link",
					color: "primary",

					//marker
					toggle: true,
					href: "#",
					disabled: true,
					//-
				}),
			];
		},
	},

	{
		title: "Event",
		msg: ["Button support {{onclick}} event."],
		container: sample.stackcontainer,
		viewclass: "cl-transparent-preview",
		import: ["button", "toast"],
		code: () => {
			return [
				"primary",
				"secondary",
				"success",
				"danger",
				"warning",
				"info",
				"light",
				"dark",
				"transparent",
				"link",
			].map((i) => {
				return new button({
					label: core.capitalize(i),
					color: i,

					//marker
					onclick: (event) => {
						let sender = event.currentTarget;
						new toast({
							color: "primary",
							title: "Button Event",
							elem: `Button <b>${core.elemInfo(sender)}</b> event <b>onclick</b> trigged`,
						}).show();
					},
					//-
				});
			});
		},
	},
];
