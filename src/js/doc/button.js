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
						label: core.capitalize(i),
						color: i,

						//marker
						outline: true,
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

					//marker
					href: "javascript:void(0);",
				}),
				new button({
					weight: "lg",
					label: "Link",
					color: "secondary",

					//marker
					disabled: true,

					//marker
					href: "javascript:void(0);",
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
				//marker
				display: "grid",

				//marker
				marginx: "auto",

				gap: "2",
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
				//marker
				display: ["grid", "md-flex"],

				//marker
				justifycontent: "md-end",

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
					//marker
					active: true,
				}),
				new button({
					label: "Disabled toggle button",
					color: "primary",

					//marker
					toggle: true,
					//marker
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
					label: "Toggle link",
					color: "primary",

					//marker
					toggle: true,
					//marker
					href: "javascript:void(0)",
				}),
				new button({
					label: "Active toggle link",
					color: "primary",

					//marker
					toggle: true,
					//marker
					href: "javascript:void(0)",
					//marker
					active: true,
				}),
				new button({
					label: "Disabled toggle link",
					color: "primary",

					//marker
					toggle: true,
					//marker
					href: "javascript:void(0)",
					//marker
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
