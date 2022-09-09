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
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({ label: core.capitalize(i), color: i });
				}
			);
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
				nowrap: true, //marker
			});
		},
	},

	{
		title: "Button tags",
		container: sample.stackcontainer,
		import: ["input", "button"],
		code: () => {
			return [
				new button({ label: "Link", color: "primary", href: "javascript:void(0);" }),
				new button({ label: "Button", color: "primary" }),
				new button({ label: "Input", color: "primary", type: "input" }),
				new button({ label: "Submit", color: "primary", type: "submit" }),
				new button({ label: "Reset", color: "primary", type: "reset" }),
				new input({
					class: "btn",
					color: "primary",
					type: "button",
					value: "Input button",
				}),
				new input({
					class: "btn",
					color: "primary",
					type: "submit",
					value: "Input submit",
				}),
				new input({
					class: "btn",
					color: "primary",
					type: "reset",
					value: "Input reset",
				}),
			];
		},
	},

	{
		title: "Outline button",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({
						outline: true, //marker
						label: core.capitalize(i),
						color: i,
					});
				}
			);
		},
	},

	{
		title: "Large Size",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					weight: "lg", //marker
					label: "Large button",
					color: "primary",
				}),
				new button({
					weight: "lg", //marker
					label: "Large button",
					color: "secondary",
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
					weight: "sm", //marker
					label: "Small button",
					color: "primary",
				}),
				new button({
					weight: "sm", //marker
					label: "Small button",
					color: "secondary",
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
					disabled: true, //marker
					weight: "lg",
					label: "Disabled button",
					color: "primary",
				}),
				new button({
					disabled: true, //marker
					weight: "lg",
					label: "Disabled button",
					color: "secondary",
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
					disabled: true, //marker
					weight: "lg",
					label: "Primary link",
					color: "primary",
					href: "javascript:void(0);", //marker
				}),
				new button({
					disabled: true, //marker
					weight: "lg",
					label: "Link",
					color: "secondary",
					href: "javascript:void(0);", //marker
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
				display: "grid", //marker
				gap: "2",
				col: 6,
				marginx: "auto", //marker
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
				justifycontent: "md-end", //marker
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
					toggle: true, //marker
					label: "Toggle button",
					color: "primary",
				}),
				new button({
					toggle: true, //marker
					active: true,
					label: "Active toggle button",
					color: "primary",
				}),
				new button({
					toggle: true, //marker
					label: "Disabled toggle button",
					color: "primary",
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Toggle state button",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({
					toggle: true, //marker
					label: "Toggle button",
					color: "primary",
				}),
				new button({
					toggle: true, //marker
					active: true,
					href: "javascript:void(0)",
					label: "Active toggle button",
					color: "primary",
				}),
				new button({
					toggle: true, //marker
					href: "javascript:void(0)",
					label: "Disabled toggle button",
					color: "primary",
					disabled: true,
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
					href: "javascript:void(0)", //marker
					label: "Toggle link",
					color: "primary",
				}),
				new button({
					toggle: true, //marker
					active: true,
					href: "javascript:void(0)", //marker
					label: "Active toggle link",
					color: "primary",
				}),
				new button({
					toggle: true, //marker
					href: "javascript:void(0)", //marker
					label: "Disabled toggle link",
					color: "primary",
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Event",
		msg: ["Button support {{onclick}} event."],
		container: sample.stackcontainer,
		import: ["button", "toast"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
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
					});
				}
			);
		},
	},
];
