"use strict";
import * as sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Dropdowns",
		msg: "Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.",
		anchor: false,
	},

	{
		title: "Single button",
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return new $.dropdown({
				label: "Drowdown button",
				color: "secondary",
				option: sample.dropdownitem(),
			});
		},
	},

	{
		title: "Dropdown link",
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return new $.dropdown({
				label: "Drowdown link",
				color: "secondary",
				href: "javascript:void(0);",
				option: sample.dropdownitem(),
			});
		},
	},

	{
		title: "Color",
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return new $.dropdown({
				label: "Drowdown",
				color: "primary",
				option: sample.dropdownitem(),
			});
		},
	},

	{
		title: "Color varian",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return new $.dropdown({
					label: $.core.capitalize(i),
					color: i,
					option: sample.dropdownitem(),
				});
			});
		},
	},

	{
		title: "Split button",
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return new $.dropdown({
				label: "Drowdown",
				color: "primary",
				splittoggle: true,
				option: sample.dropdownitem(),
			});
		},
	},

	{
		title: "Split button color variant",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return new $.dropdown({
					splittoggle: true,
					label: $.core.capitalize(i),
					color: i,
					option: sample.dropdownitem(),
				});
			});
		},
	},

	{
		title: "Large size",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return [
				new $.dropdown({
					label: "Large dropdown",
					color: "secondary",
					weight: "lg",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Large split dropdown",
					color: "secondary",
					weight: "lg",
					splittoggle: true,
					option: sample.dropdownitem(),
				}),
			];
		},
	},

	{
		title: "Small size",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return [
				new $.dropdown({
					label: "Small dropdown",
					color: "secondary",
					weight: "sm",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Small split dropdown",
					color: "secondary",
					weight: "sm",
					splittoggle: true,
					option: sample.dropdownitem(),
				}),
			];
		},
	},

	{
		title: "Dark dropdown",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return new $.dropdown({
				label: "Dark dropdown",
				color: "secondary",
				dark: true,
				option: sample.dropdownitem(),
			});
		},
	},

	{
		title: "Dropdown in navbar",
		dark: true,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			var id = new $.core.UUID();
			return new $.navbar.container({
				expand: "lg",
				color: "dark",
				textcolor: "light",
				elem: [
					new $.navbar.toggle({
						id,
						toggle: "collapse",
					}),

					new $.navbar.brand({
						label: "Navbar",
					}),

					new $.navbar.collapsecontainer({
						id,
						elem: [
							new $.navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									new $.dropdown({
										label: "Dropdown",
										navlink: true,
										dark: true,
										option: sample.dropdownitem(),
									}),
								],
							}),
						],
					}),
				],
			});
		},
	},

	{
		title: "Dropup",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return [
				new $.dropdown({
					label: "Dropup",
					color: "secondary",
					arrow: "up",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Split dropup",
					color: "secondary",
					arrow: "up",
					splittoggle: true,
					option: sample.dropdownitem(),
				}),
			];
		},
	},

	{
		title: "Dropend",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return [
				new $.dropdown({
					label: "Dropend",
					color: "secondary",
					arrow: "end",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Split dropend",
					color: "secondary",
					arrow: "end",
					splittoggle: true,
					option: sample.dropdownitem(),
				}),
			];
		},
	},

	{
		title: "Dropstart",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return [
				new $.dropdown({
					label: "Dropstart",
					color: "secondary",
					arrow: "start",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Split dropstart",
					color: "secondary",
					arrow: "start",
					splittoggle: true,
					option: sample.dropdownitem(),
				}),
			];
		},
	},

	{
		title: "Menu item",
		code: function () {
			return new $.dropdown({
				label: "Drowdown",
				color: "secondary",
				option: [
					{ value: "1", label: "Action" },
					{ value: "2", label: "Another action" },
					{ value: "3", label: "Something else here" },
					{ value: "-" },
					{ value: "4", label: "Separated link" },
				],
			});
		},
	},

	{
		title: "Non-interactive dropdown item",
		code: function () {
			return new $.dropdown({
				label: "Drowdown",
				color: "secondary",
				option: [
					{ interactive: false, label: "Dropdown item text" },
					{ href: "javascript:void(0);", label: "Another" },
					{ href: "javascript:void(0);", label: "Another action" },
					{ href: "javascript:void(0);", label: "Something else here" },
				],
			});
		},
	},

	{
		title: "Active dropdown item",
		code: function () {
			return new $.dropdown({
				label: "Drowdown",
				color: "secondary",
				option: [
					{ href: "javascript:void(0);", label: "Regular link" },
					{ href: "javascript:void(0);", label: "Active link", active: true },
					{ href: "javascript:void(0);", label: "Another link" },
				],
			});
		},
	},

	{
		title: "Disabled dropdown item",
		code: function () {
			return new $.dropdown({
				label: "Drowdown",
				color: "secondary",
				option: [
					{ href: "javascript:void(0);", label: "Regular link" },
					{ href: "javascript:void(0);", label: "Disabled link", disabled: true },
					{ href: "javascript:void(0);", label: "Another link" },
				],
			});
		},
	},

	{
		title: "Menu Aligment",
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return new $.dropdown({
				label: "Right-aligned menu example",
				color: "secondary",
				aligment: "end",
				option: sample.dropdownitem(),
			});
		},
	},

	{
		title: "Responsive alignment",
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return new $.dropdown({
				label: "Right-aligned, left-aligned lg",
				color: "secondary",
				aligment: ["end", "lg-start"],
				option: sample.dropdownitem(),
			});
		},
	},

	{
		title: "Alignment options",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return [
				new $.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Right-aligned menu",
					color: "secondary",
					aligment: "end",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Left-aligned, right-aligned lg",
					color: "secondary",
					aligment: ["start", "lg-end"],
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Right-aligned, left-aligned lg",
					color: "secondary",
					aligment: ["end", "lg-start"],
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Dropstart",
					color: "secondary",
					arrow: "start",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Dropend",
					color: "secondary",
					arrow: "end",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Dropup",
					color: "secondary",
					arrow: "up",
					option: sample.dropdownitem(),
				}),
			];
		},
	},

	{
		title: "Headers",
		code: function () {
			return [
				new $.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: [
						{ value: "-", label: "Dropdown header" },
						{ href: "javascript:void(0);", label: "Action" },
						{ href: "javascript:void(0);", label: "Another action" },
					],
				}),
			];
		},
	},

	{
		title: "Divider",
		code: function () {
			return [
				new $.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: [
						{ href: "javascript:void(0);", label: "Action" },
						{ href: "javascript:void(0);", label: "Another action" },
						{ href: "javascript:void(0);", label: "Something else here" },
						{ value: "-" },
						{ href: "javascript:void(0);", label: "Separated link" },
					],
				}),
			];
		},
	},

	{
		title: "Text",
		code: function () {
			return [
				new $.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: [
						{
							elem: new $.div({
								class: "text-muted p-4",
								style: { width: "200px" },
								elem: [
									new $.p("Some example text that's free-flowing within the dropdown menu."),
									new $.p({ marginbottom: 0, elem: "And this is more example text." }),
								],
							}),
						},
					],
				}),
			];
		},
	},

	{
		title: "Form",
		code: function () {
			return [
				new $.dropdown({
					label: "Dropdown",
					color: "secondary",
					autoclose: "outside",
					option: [
						{
							elem: new $.div({
								padding: 3,
								gap: 3,
								row: true,
								rowcol: 1,
								elem: [
									new $.input({
										size: "col",
										type: "email",
										label: "Email address",
										placeholder: "email@example.com",
									}),
									new $.input({
										size: "col",
										type: "password",
										label: "Password",
										placeholder: "Password",
									}),
									new $.input({ size: "col", type: "checkbox", label: "Remember me" }),
									new $.div({
										col: true,
										elem: new $.button({
											type: "submit",
											color: "primary",
											label: "Sign in",
										}),
									}),
								],
							}),
						},
						{ value: "-" },
						{ href: "javascript:void(0)", label: "new $.around here? Sign up" },
						{ href: "javascript:void(0)", label: "Forgot password?" },
					],
				}),
			];
		},
	},

	{
		title: "Dropdown options",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return [
				new $.dropdown({
					label: "Offset",
					color: "secondary",
					offset: "20,30",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Reference",
					color: "secondary",
					reference: "parent",
					splittoggle: true,
					option: sample.dropdownitem(),
				}),
			];
		},
	},

	{
		title: "Auto close behavior",
		container: sample.stackcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: function () {
			return [
				new $.dropdown({
					label: "Default dropdown",
					color: "secondary",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Clickable outside",
					color: "secondary",
					autoclose: "outside",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Clickable inside",
					color: "secondary",
					autoclose: "inside",
					option: sample.dropdownitem(),
				}),
				new $.dropdown({
					label: "Manual close",
					color: "secondary",
					autoclose: "false",
					option: sample.dropdownitem(),
				}),
			];
		},
	},
];
