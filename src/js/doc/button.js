"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		anchor: false,
		title: "Buttons",
		msg: "Use Bootstraps custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.",
	},

	{
		title: "Examples",
		container: sample.stackcontainer,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				function (i) {
					return new $.button({ label: $.core.capitalize(i), color: i });
				}
			);
		},
	},

	{
		title: "Disable text wrapping",
		container: sample.stackcontainer,
		code: function () {
			return new $.button({
				label: "Disable text wrapping button",
				color: "primary",
				nowrap: true,
			});
		},
	},

	{
		title: "Button tags",
		container: sample.stackcontainer,
		code: function () {
			return [
				new $.button({ label: "Link", color: "primary", href: "javascript:void(0);" }),
				new $.button({ label: "Button", color: "primary" }),
				new $.button({ label: "Input", color: "primary", type: "input" }),
				new $.button({ label: "Submit", color: "primary", type: "submit" }),
				new $.button({ label: "Reset", color: "primary", type: "reset" }),
				new $.input({
					class: "btn",
					color: "primary",
					textcolor: "light",
					type: "button",
					value: "Input button",
				}),
				new $.input({
					class: "btn",
					color: "primary",
					textcolor: "light",
					type: "submit",
					value: "Input submit",
				}),
				new $.input({
					class: "btn",
					color: "primary",
					textcolor: "light",
					type: "reset",
					value: "Input reset",
				}),
			];
		},
	},

	{
		title: "Outline button",
		container: sample.stackcontainer,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				function (i) {
					return new $.button({ outline: true, label: $.core.capitalize(i), color: i });
				}
			);
		},
	},

	{
		title: "Large Size",
		container: sample.stackcontainer,
		code: function () {
			return [
				new $.button({ weight: "lg", label: "Large button", color: "primary" }),
				new $.button({ weight: "lg", label: "Large button", color: "secondary" }),
			];
		},
	},

	{
		title: "Small Size",
		container: sample.stackcontainer,
		code: function () {
			return [
				new $.button({ weight: "sm", label: "Small button", color: "primary" }),
				new $.button({ weight: "sm", label: "Small button", color: "secondary" }),
			];
		},
	},

	{
		title: "Disabled state",
		container: sample.stackcontainer,
		code: function () {
			return [
				new $.button({ disabled: true, weight: "lg", label: "Disabled button", color: "primary" }),
				new $.button({ disabled: true, weight: "lg", label: "Disabled button", color: "secondary" }),
			];
		},
	},

	{
		title: "Disabled button link state",
		container: sample.stackcontainer,
		code: function () {
			return [
				new $.button({
					disabled: true,
					weight: "lg",
					label: "Primary link",
					color: "primary",
					href: "javascript:void(0);",
				}),
				new $.button({
					disabled: true,
					weight: "lg",
					label: "Link",
					color: "secondary",
					href: "javascript:void(0);",
				}),
			];
		},
	},

	{
		title: "Block buttons",
		code: function () {
			return new $.container.grid([
				new $.button({ label: "Button", color: "primary" }),
				new $.button({ label: "Button", color: "primary" }),
				new $.button({ label: "Button", color: "primary" }),
			]);
		},
	},

	{
		title: "Centered in horizontal",
		code: function () {
			return new $.div({
				display: "grid",
				gap: "2",
				col: 6,
				marginx: "auto",
				elem: [
					new $.button({ label: "Button", color: "primary" }),
					new $.button({ label: "Button", color: "primary" }),
					new $.button({ label: "Button", color: "primary" }),
				],
			});
		},
	},

	{
		title: "Right align",
		code: function () {
			return new $.div({
				display: ["grid", "md-flex"],
				justifycontent: "md-end",
				gap: 2,
				elem: [
					new $.button({ label: "Button", color: "primary" }),
					new $.button({ label: "Button", color: "primary" }),
					new $.button({ label: "Button", color: "primary" }),
				],
			});
		},
	},

	{
		title: "Toggle state button",
		container: sample.stackcontainer,
		code: function () {
			return [
				new $.button({
					toggle: true,
					label: "Toggle button",
					color: "primary",
				}),
				new $.button({
					toggle: true,
					active: true,
					label: "Active toggle button",
					color: "primary",
				}),
				new $.button({
					toggle: true,
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
		code: function () {
			return [
				new $.button({ toggle: true, label: "Toggle button", color: "primary" }),
				new $.button({
					toggle: true,
					active: true,
					href: "javascript:void(0)",
					label: "Active toggle button",
					color: "primary",
				}),
				new $.button({
					toggle: true,
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
		code: function () {
			return [
				new $.button({
					toggle: true,
					href: "javascript:void(0)",
					label: "Toggle link",
					color: "primary",
				}),
				new $.button({
					toggle: true,
					active: true,
					href: "javascript:void(0)",
					label: "Active toggle link",
					color: "primary",
				}),
				new $.button({
					toggle: true,
					href: "javascript:void(0)",
					label: "Disabled toggle link",
					color: "primary",
					disabled: true,
				}),
			];
		},
	},
];
