"use strict";
import sample from "./sample.js";
import * as core from "../dist/cl/base/core.js";
import button from "../dist/cl/base/button.js";
import * as container from "../dist/cl/base/container.js";
import div from "../dist/cl/base/div.js";
import input from "../dist/cl/base/input.js";
import toast from "../dist/cl/base/toast.js";

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
					color: i, //marker
					label: core.capitalize(i),
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
				color: "primary",
				textWrap: true, //marker
				label: "Disable text wrapping button",
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
					color: "primary",
					href: "#", //marker
					label: "Link",
				}),
				new button({
					color: "primary",
					type: "input", //marker
					label: "Input",
				}),
				new button({
					color: "primary",
					type: "submit", //marker
					label: "Submit",
				}),
				new button({
					color: "primary",
					type: "reset", //marker
					label: "Reset",
				}),
				new input({
					value: "Input button",
					color: "primary",
					class: "btn", //marker
					type: "button", //marker
				}),
				new input({
					color: "primary",
					value: "Input submit",
					class: "btn", //marker
					type: "submit", //marker
				}),
				new input({
					color: "primary",
					value: "Input reset",
					class: "btn", //marker
					type: "reset", //marker
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
					color: i,
					outline: true, //marker
					label: core.capitalize(i),
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
					color: "primary",
					weight: "lg", //marker
					label: "Large button",
				}),
				new button({
					color: "secondary",
					weight: "lg", //marker
					label: "Large button",
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
					color: "primary",
					weight: "sm", //marker
					label: "Small button",
				}),
				new button({
					color: "secondary",
					weight: "sm", //marker
					label: "Small button",
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
					color: "primary",
					disabled: true, //marker
					label: "Disabled button",
				}),
				new button({
					weight: "lg",
					color: "secondary",
					disabled: true, //marker
					label: "Disabled button",
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
					color: "primary",
					disabled: true, //marker
					href: "#",
					label: "Primary link",
				}),
				new button({
					weight: "lg",
					color: "secondary",
					disabled: true, //marker
					href: "#",
					label: "Link",
				}),
			];
		},
	},

	{
		title: "Block buttons",
		import: ["container", "button"],
		code: () => {
			return new container.grid([
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
				display: "grid", //marker
				marginX: "auto", //marker
				gap: 2,
				col: 6,
				elem: [
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
				],
			});
		},
	},

	{
		title: "Right align",
		import: ["div", "button"],
		code: () => {
			return new div({
				display: ["grid", "md-flex"], //marker
				justifyContent: "md-end", //marker
				gap: 2,
				elem: [
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
				],
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
					color: "primary",
					toggle: true, //marker
					label: "Toggle button",
				}),
				new button({
					toggle: true,
					active: true, //marker
					color: "primary",
					label: "Active toggle button",
				}),
				new button({
					toggle: true,
					disabled: true, //marker
					color: "primary",
					label: "Disabled toggle button",
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
					toggle: true, //marker
					href: "#",
					color: "primary",
					label: "Toggle link",
				}),
				new button({
					toggle: true,
					active: true, //marker
					href: "#",
					color: "primary",
					label: "Active toggle link",
				}),
				new button({
					toggle: true,
					href: "#",
					disabled: true, //marker
					color: "primary",
					label: "Disabled toggle link",
				}),
			];
		},
	},

	{
		title: "Event",
		msg: ["Button support {{click}} event."],
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
					click: (event) => {
						let sender = event.currentTarget;
						new toast({
							color: "primary",
							title: "Button Event",
							elem: `Button <b>${core.elemInfo(sender)}</b> event <b>click</b> trigged`,
						}).show();
					},
					//-
				});
			});
		},
	},
];
