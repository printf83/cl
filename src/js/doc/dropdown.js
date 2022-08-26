"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import dropdown from "../base/dropdown.js";
import p from "../base/p.js";
import div from "../base/div.js";
import input from "../base/input.js";
import button from "../base/button.js";
import * as navbar from "../base/navbar.js";

export default [
	{
		title: "Dropdowns",
		msg: "Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.",
		anchor: false,
	},

	{
		title: "Single button",
		import: ["dropdown", "sample"],
		code: () => {
			return new dropdown({
				label: "Drowdown button",
				color: "secondary",
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],
			});
		},
	},

	{
		title: "Dropdown link",
		import: ["dropdown", "sample"],
		code: () => {
			return new dropdown({
				label: "Drowdown link",
				color: "secondary",
				href: "javascript:void(0);",
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],
			});
		},
	},

	{
		title: "Color",
		import: ["dropdown", "sample"],
		code: () => {
			return new dropdown({
				label: "Drowdown",
				color: "primary",
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],
			});
		},
	},

	{
		title: "Color varian",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new dropdown({
					label: core.capitalize(i),
					color: i,
					option: [
						{ href: "#", label: "Action" },
						{ href: "#", label: "Another action" },
						{ href: "#", label: "Something else here" },
						{ value: "-" },
						{ href: "#", label: "Separated link" },
					],
				});
			});
		},
	},

	{
		title: "Split button",
		import: ["dropdown", "sample"],
		code: () => {
			return new dropdown({
				label: "Drowdown",
				color: "primary",
				splittoggle: true,
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],
			});
		},
	},

	{
		title: "Split button color variant",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new dropdown({
					splittoggle: true,
					label: core.capitalize(i),
					color: i,
					option: [
						{ href: "#", label: "Action" },
						{ href: "#", label: "Another action" },
						{ href: "#", label: "Something else here" },
						{ value: "-" },
						{ href: "#", label: "Separated link" },
					],
				});
			});
		},
	},

	{
		title: "Large size",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new dropdown({
					label: "Large dropdown",
					color: "secondary",
					weight: "lg",
					option: dditem,
				}),
				new dropdown({
					label: "Large split dropdown",
					color: "secondary",
					weight: "lg",
					splittoggle: true,
					option: dditem,
				}),
			];
		},
	},

	{
		title: "Small size",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new dropdown({
					label: "Small dropdown",
					color: "secondary",
					weight: "sm",
					option: dditem,
				}),
				new dropdown({
					label: "Small split dropdown",
					color: "secondary",
					weight: "sm",
					splittoggle: true,
					option: dditem,
				}),
			];
		},
	},

	{
		title: "Dark dropdown",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			return new dropdown({
				label: "Dark dropdown",
				color: "secondary",
				dark: true,
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],
			});
		},
	},

	{
		title: "Dropdown in navbar",
		dark: true,
		import: ["navbar", "dropdown", "sample"],
		code: () => {
			var id = new core.UUID();
			return new navbar.container({
				expand: "lg",
				color: "dark",
				textcolor: "light",
				elem: [
					new navbar.toggle({
						id,
						toggle: "collapse",
					}),

					new navbar.brand({
						label: "Navbar",
					}),

					new navbar.collapsecontainer({
						id,
						elem: [
							new navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									new dropdown({
										label: "Dropdown",
										navlink: true,
										dark: true,
										option: [
											{ href: "#", label: "Action" },
											{ href: "#", label: "Another action" },
											{ href: "#", label: "Something else here" },
											{ value: "-" },
											{ href: "#", label: "Separated link" },
										],
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
		import: ["dropdown", "sample"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new dropdown({
					label: "Dropup",
					color: "secondary",
					arrow: "up",
					option: dditem,
				}),
				new dropdown({
					label: "Split dropup",
					color: "secondary",
					arrow: "up",
					splittoggle: true,
					option: dditem,
				}),
			];
		},
	},

	{
		title: "Dropend",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new dropdown({
					label: "Dropend",
					color: "secondary",
					arrow: "end",
					option: dditem,
				}),
				new dropdown({
					label: "Split dropend",
					color: "secondary",
					arrow: "end",
					splittoggle: true,
					option: dditem,
				}),
			];
		},
	},

	{
		title: "Dropstart",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new dropdown({
					label: "Dropstart",
					color: "secondary",
					arrow: "start",
					option: dditem,
				}),
				new dropdown({
					label: "Split dropstart",
					color: "secondary",
					arrow: "start",
					splittoggle: true,
					option: dditem,
				}),
			];
		},
	},

	{
		title: "Menu item",
		import: ["dropdown"],
		code: () => {
			return new dropdown({
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
		import: ["dropdown"],
		code: () => {
			return new dropdown({
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
		import: ["dropdown"],
		code: () => {
			return new dropdown({
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
		import: ["dropdown"],
		code: () => {
			return new dropdown({
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
		import: ["dropdown", "sample"],
		code: () => {
			return new dropdown({
				label: "Right-aligned menu example",
				color: "secondary",
				aligment: "end",
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],
			});
		},
	},

	{
		title: "Responsive alignment",
		import: ["dropdown", "sample"],
		code: () => {
			return new dropdown({
				label: "Right-aligned, left-aligned lg",
				color: "secondary",
				aligment: ["end", "lg-start"],
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],
			});
		},
	},

	{
		title: "Alignment options",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new dropdown({
					label: "Dropdown",
					color: "secondary",
					option: dditem,
				}),
				new dropdown({
					label: "Right-aligned menu",
					color: "secondary",
					aligment: "end",
					option: dditem,
				}),
				new dropdown({
					label: "Left-aligned, right-aligned lg",
					color: "secondary",
					aligment: ["start", "lg-end"],
					option: dditem,
				}),
				new dropdown({
					label: "Right-aligned, left-aligned lg",
					color: "secondary",
					aligment: ["end", "lg-start"],
					option: dditem,
				}),
				new dropdown({
					label: "Dropstart",
					color: "secondary",
					arrow: "start",
					option: dditem,
				}),
				new dropdown({
					label: "Dropend",
					color: "secondary",
					arrow: "end",
					option: dditem,
				}),
				new dropdown({
					label: "Dropup",
					color: "secondary",
					arrow: "up",
					option: dditem,
				}),
			];
		},
	},

	{
		title: "Headers",
		import: ["dropdown"],
		code: () => {
			return [
				new dropdown({
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
		import: ["dropdown"],
		code: () => {
			return [
				new dropdown({
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
		import: ["div", "p", "dropdown"],
		code: () => {
			return [
				new dropdown({
					label: "Dropdown",
					color: "secondary",
					option: [
						{
							elem: new div({
								class: "text-muted p-4",
								style: { width: "200px" },
								elem: [
									new p("Some example text that's free-flowing within the dropdown menu."),
									new p({ marginbottom: 0, elem: "And this is more example text." }),
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
		import: ["div", "button", "input", "dropdown"],
		code: () => {
			return [
				new dropdown({
					label: "Dropdown",
					color: "secondary",
					autoclose: "outside",
					option: [
						{
							elem: new div({
								padding: 3,
								gap: 3,
								row: true,
								rowcol: 1,
								elem: [
									new input({
										size: "col",
										type: "email",
										label: "Email address",
										placeholder: "email@example.com",
									}),
									new input({
										size: "col",
										type: "password",
										label: "Password",
										placeholder: "Password",
									}),
									new input({ size: "col", type: "checkbox", label: "Remember me" }),
									new div({
										col: true,
										elem: new button({
											type: "submit",
											color: "primary",
											label: "Sign in",
										}),
									}),
								],
							}),
						},
						{ value: "-" },
						{ href: "javascript:void(0)", label: "new around here? Sign up" },
						{ href: "javascript:void(0)", label: "Forgot password?" },
					],
				}),
			];
		},
	},

	{
		title: "Dropdown options",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new dropdown({
					label: "Offset",
					color: "secondary",
					offset: "20,30",
					option: dditem,
				}),
				new dropdown({
					label: "Reference",
					color: "secondary",
					reference: "parent",
					splittoggle: true,
					option: dditem,
				}),
			];
		},
	},

	{
		title: "Auto close behavior",
		container: sample.stackcontainer,
		import: ["dropdown", "sample"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new dropdown({
					label: "Default dropdown",
					color: "secondary",
					option: dditem,
				}),
				new dropdown({
					label: "Clickable outside",
					color: "secondary",
					autoclose: "outside",
					option: dditem,
				}),
				new dropdown({
					label: "Clickable inside",
					color: "secondary",
					autoclose: "inside",
					option: dditem,
				}),
				new dropdown({
					label: "Manual close",
					color: "secondary",
					autoclose: "false",
					option: dditem,
				}),
			];
		},
	},
];
