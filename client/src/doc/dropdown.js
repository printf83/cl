"use strict";
import sample from "./sample.js";
import * as core from "../dist/cl/base/core.js";
import dropdown from "../dist/cl/base/dropdown.js";
import p from "../dist/cl/base/p.js";
import div from "../dist/cl/base/div.js";
import input from "../dist/cl/base/input.js";
import button from "../dist/cl/base/button.js";
import * as navbar from "../dist/cl/base/navbar.js";
import toast from "../dist/cl/base/toast.js";
import * as table from "../dist/cl/base/table.js";
import * as container from "../dist/cl/base/container.js";

export default [
	{
		title: "Dropdowns",
		msg: "Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.",
		anchor: false,
	},

	{
		title: "Single button",
		import: ["dropdown"],
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
		import: ["dropdown"],
		code: () => {
			return new dropdown({
				label: "Drowdown link",
				color: "secondary",
				href: "#", //marker
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
		import: ["dropdown"],
		code: () => {
			return new dropdown({
				label: "Drowdown",
				color: "primary", //marker
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
		viewclass: "cl-transparent-preview",
		import: ["dropdown"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "transparent"].map(
				(i) => {
					return new dropdown({
						label: core.capitalize(i),
						color: i, //marker
						option: [
							{ href: "#", label: "Action" },
							{ href: "#", label: "Another action" },
							{ href: "#", label: "Something else here" },
							{ value: "-" },
							{ href: "#", label: "Separated link" },
						],
					});
				}
			);
		},
	},

	{
		title: "Split button",
		import: ["dropdown", "sample"],
		code: () => {
			return new dropdown({
				label: "Drowdown",
				color: "primary",
				splittoggle: true, //marker
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
		viewclass: "cl-transparent-preview",
		import: ["dropdown"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "transparent"].map(
				(i) => {
					return new dropdown({
						label: core.capitalize(i),
						option: [
							{ href: "#", label: "Action" },
							{ href: "#", label: "Another action" },
							{ href: "#", label: "Something else here" },
							{ value: "-" },
							{ href: "#", label: "Separated link" },
						],

						//marker
						splittoggle: true,
						color: i,
						//-
					});
				}
			);
		},
	},

	{
		title: "Large size",
		container: sample.stackcontainer,
		import: ["dropdown"],
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
					option: dditem,

					//marker
					weight: "lg",
				}),
				new dropdown({
					label: "Large split dropdown",
					color: "secondary",
					splittoggle: true,
					option: dditem,

					//marker
					weight: "lg",
				}),
			];
		},
	},

	{
		title: "Small size",
		container: sample.stackcontainer,
		import: ["dropdown"],
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

					//marker
					weight: "sm",
				}),
				new dropdown({
					label: "Small split dropdown",
					color: "secondary",
					splittoggle: true,
					option: dditem,

					//marker
					weight: "sm",
				}),
			];
		},
	},

	{
		title: "Dark dropdown",
		container: sample.stackcontainer,
		import: ["dropdown"],
		code: () => {
			return new dropdown({
				label: "Dark dropdown",
				color: "secondary",
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],

				//marker
				dark: true,
			});
		},
	},

	{
		title: "Dropdown in navbar",
		dark: true,
		import: ["navbar", "dropdown"],
		code: () => {
			var id = core.UUID();
			return new navbar.container({
				expand: "lg",
				dark: true,
				color: "dark",
				elem: [
					new navbar.toggle({
						id: id,
						toggle: "collapse",
					}),

					new navbar.brand({
						label: "Navbar",
					}),

					new navbar.collapsecontainer({
						id: id,
						elem: [
							new navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									//marker
									new dropdown({
										label: "Dropdown",
										dark: true,
										option: [
											{ href: "#", label: "Action" },
											{ href: "#", label: "Another action" },
											{ href: "#", label: "Something else here" },
											{ value: "-" },
											{ href: "#", label: "Separated link" },
										],

										//marker
										navlink: true,
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
		import: ["dropdown"],
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
					option: dditem,

					//marker
					arrow: "up",
				}),
				new dropdown({
					label: "Split dropup",
					color: "secondary",
					splittoggle: true,
					option: dditem,

					//marker
					arrow: "up",
				}),
			];
		},
	},

	{
		title: "Dropend",
		container: sample.stackcontainer,
		import: ["dropdown"],
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
					option: dditem,

					//marker
					arrow: "end",
				}),
				new dropdown({
					label: "Split dropend",
					color: "secondary",
					splittoggle: true,
					option: dditem,

					//marker
					arrow: "end",
				}),
			];
		},
	},

	{
		title: "Dropstart",
		container: sample.stackcontainer,
		import: ["dropdown"],
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
					option: dditem,

					//marker
					arrow: "start",
				}),
				new dropdown({
					label: "Split dropstart",
					color: "secondary",
					splittoggle: true,
					option: dditem,

					//marker
					arrow: "start",
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

				//marker
				option: [
					{ value: "1", label: "Action" },
					{ value: "2", label: "Another action" },
					{ value: "3", label: "Something else here" },
					{ value: "-" },
					{ value: "4", label: "Separated link" },
				],
				//-
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
					{
						interactive: false, //marker
						label: "Dropdown item text",
					},
					{ href: "#", label: "Another" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
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
					{ href: "#", label: "Regular link" },
					{ href: "#", label: "Active link", active: true },
					{ href: "#", label: "Another link" },
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
					{ href: "#", label: "Regular link" },
					{
						href: "#",
						label: "Disabled link",
						disabled: true, //marker
					},
					{ href: "#", label: "Another link" },
				],
			});
		},
	},

	{
		title: "Menu Aligment",
		import: ["dropdown"],
		code: () => {
			return new dropdown({
				label: "Right-aligned menu example",
				color: "secondary",
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],

				//marker
				aligment: "end",
			});
		},
	},

	{
		title: "Responsive alignment",
		import: ["dropdown"],
		code: () => {
			return new dropdown({
				label: "Right-aligned, left-aligned lg",
				color: "secondary",
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ href: "#", label: "Something else here" },
					{ value: "-" },
					{ href: "#", label: "Separated link" },
				],

				//marker
				aligment: ["end", "lg-start"],
			});
		},
	},

	{
		title: "Alignment options",
		container: sample.stackcontainer,
		import: ["dropdown"],
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
					option: dditem,

					//marker
					aligment: "end",
				}),
				new dropdown({
					label: "Left-aligned, right-aligned lg",
					color: "secondary",
					option: dditem,

					//marker
					aligment: ["start", "lg-end"],
				}),
				new dropdown({
					label: "Right-aligned, left-aligned lg",
					color: "secondary",
					option: dditem,

					//marker
					aligment: ["end", "lg-start"],
				}),
				new dropdown({
					label: "Dropstart",
					color: "secondary",
					option: dditem,

					//marker
					arrow: "start",
				}),
				new dropdown({
					label: "Dropend",
					color: "secondary",
					option: dditem,

					//marker
					arrow: "end",
				}),
				new dropdown({
					label: "Dropup",
					color: "secondary",
					option: dditem,

					//marker
					arrow: "up",
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
						//marker
						{
							value: "-",
							label: "Dropdown header",
						},
						//-

						{ href: "#", label: "Action" },
						{ href: "#", label: "Another action" },
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
						{ href: "#", label: "Action" },
						{ href: "#", label: "Another action" },
						{ href: "#", label: "Something else here" },

						//marker
						{
							value: "-",
						},
						//-

						{ href: "#", label: "Separated link" },
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
							//marker
							elem: new div({
								class: "text-muted p-4",
								width: "200px",
								elem: [
									new p("Some example text that's free-flowing within the dropdown menu."),
									new p({ marginBottom: 0, elem: "And this is more example text." }),
								],
							}),
							//-
						},
					],
				}),
			];
		},
	},

	{
		title: "Form",
		import: ["div", "button", "input", "dropdown", "container"],
		code: () => {
			return new container.form([
				new dropdown({
					label: "Dropdown",
					color: "secondary",
					autoclose: "outside",
					option: [
						{
							//marker
							elem: new div({
								padding: 3,
								gap: 3,
								row: true,
								rowCol: 1,
								elem: [
									new input({
										size: "col",
										type: "email",
										label: "Email address",
										placeholder: "email@example.com",
										autocomplete: "email",
									}),
									new input({
										size: "col",
										type: "password",
										label: "Password",
										placeholder: "Password",
										autocomplete: "current-password",
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
							//-
						},
						{ value: "-" },
						{ href: "#", label: "new around here? Sign up" },
						{ href: "#", label: "Forgot password?" },
					],
				}),
			]);
		},
	},

	{
		title: "Dropdown options",
		container: sample.stackcontainer,
		import: ["dropdown"],
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
					option: dditem,

					//marker
					offset: "20,30",
				}),
				new dropdown({
					label: "Reference",
					color: "secondary",
					splittoggle: true,
					option: dditem,

					//marker
					reference: null, //reference to split button
				}),
			];
		},
	},

	{
		title: "Auto close behavior",
		container: sample.stackcontainer,
		import: ["dropdown"],
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
					option: dditem,

					//marker
					autoclose: "outside",
				}),
				new dropdown({
					label: "Clickable inside",
					color: "secondary",
					option: dditem,

					//marker
					autoclose: "inside",
				}),
				new dropdown({
					label: "Manual close",
					color: "secondary",
					option: dditem,

					//marker
					autoclose: "false",
				}),
			];
		},
	},

	{
		title: "Event",
		msg: [
			new table.container({
				item: [
					["Option", "Description"],
					[
						"<code>show</code>",
						"This event fires immediately when the <code>show</code> instance method is called.",
					],
					[
						"<code>shown</code>",
						"This event is fired when the dropdown has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>hide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>hidden</code>",
						"This event is fired when the dropdown has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
				],
			}),
		],
		import: ["dropdown", "toast"],
		code: () => {
			let fn = (sender, event) => `Dropdown <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

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

				//marker
				show: (event) => {
					new toast("i", fn(event.currentTarget, "show")).show();
				},
				shown: (event) => {
					new toast("/", fn(event.currentTarget, "shown")).show();
				},
				hide: (event) => {
					new toast("!", fn(event.currentTarget, "hide")).show();
				},
				hidden: (event) => {
					new toast("x", fn(event.currentTarget, "hidden")).show();
				},
				//-
			});
		},
	},
];
