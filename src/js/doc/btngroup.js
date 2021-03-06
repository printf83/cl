"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Button group",
		msg: "Group a series of buttons together on a single line or stack them in a vertical column.",
		anchor: false,
	},

	{
		title: "Basic example",
		code: function () {
			return new $.btngroup({
				label: "Basic example",
				elem: [
					new $.button({ label: "Left", color: "primary" }),
					new $.button({ label: "Middle", color: "primary" }),
					new $.button({ label: "Right", color: "primary" }),
				],
			});
		},
	},

	{
		title: "Link example",
		code: function () {
			return new $.btngroup({
				label: "Link example",
				elem: [
					new $.button({
						href: "#",
						label: "Active link",
						color: "primary",
						active: true,
					}),
					new $.button({ href: "#", label: "Link", color: "primary" }),
					new $.button({ href: "#", label: "Link", color: "primary" }),
				],
			});
		},
	},

	{
		title: "Mixed styles",
		code: function () {
			return new $.btngroup({
				label: "Basic mixed styles example",
				elem: [
					new $.button({ label: "Left", color: "danger" }),
					new $.button({ label: "Middle", color: "warning" }),
					new $.button({ label: "Right", color: "success" }),
				],
			});
		},
	},

	{
		title: "Outlined styles",
		code: function () {
			return new $.btngroup({
				label: "Basic outlined styles example",
				elem: [
					new $.button({ outline: true, label: "Left", color: "primary" }),
					new $.button({ outline: true, label: "Middle", color: "primary" }),
					new $.button({ outline: true, label: "Right", color: "primary" }),
				],
			});
		},
	},

	{
		title: "Checkbox button styles",
		code: function () {
			return new $.btngroup({
				label: "Checkbox button styles example",
				elem: [
					new $.button({ type: "checkbox", outline: true, label: "Left", color: "primary" }),
					new $.button({
						type: "checkbox",
						outline: true,
						label: "Middle",
						color: "primary",
					}),
					new $.button({
						type: "checkbox",
						outline: true,
						label: "Right",
						color: "primary",
					}),
				],
			});
		},
	},

	{
		title: "Radio button styles",
		code: function () {
			return new $.btngroup({
				label: "Radio button styles example",
				elem: [
					new $.button({
						name: "g6",
						type: "radio",
						outline: true,
						label: "Left",
						color: "primary",
					}),
					new $.button({
						name: "g6",
						type: "radio",
						outline: true,
						label: "Middle",
						color: "primary",
					}),
					new $.button({
						name: "g6",
						type: "radio",
						outline: true,
						label: "Right",
						color: "primary",
					}),
				],
			});
		},
	},

	{
		title: "Button toolbar",
		code: function () {
			return new $.btntoolbar({
				label: "Toolbar with button groups",
				gap: 2,
				elem: [
					new $.btngroup({
						label: "First group",
						elem: [
							new $.button({ label: "1", color: "primary" }),
							new $.button({ label: "2", color: "primary" }),
							new $.button({ label: "3", color: "primary" }),
							new $.button({ label: "4", color: "primary" }),
						],
					}),
					new $.btngroup({
						label: "Second group",
						elem: [
							new $.button({ label: "5", color: "secondary" }),
							new $.button({ label: "6", color: "secondary" }),
							new $.button({ label: "7", color: "secondary" }),
						],
					}),
					new $.btngroup({
						label: "Third group",
						elem: [new $.button({ label: "8", color: "info" })],
					}),
				],
			});
		},
	},

	{
		title: "Mix toolbar",
		container: sample.formcontainer,
		code: function () {
			return [
				new $.btntoolbar({
					label: "Toolbar with button groups",
					gap: 2,
					elem: [
						new $.btngroup({
							label: "First group",
							elem: [
								new $.button({ label: "1", color: "secondary", outline: true }),
								new $.button({ label: "2", color: "secondary", outline: true }),
								new $.button({ label: "3", color: "secondary", outline: true }),
								new $.button({ label: "4", color: "secondary", outline: true }),
							],
						}),
						new $.input({
							type: "text",
							placeholder: "Input group example",
							before: "@",
						}),
					],
				}),

				new $.btntoolbar({
					label: "Toolbar with button groups",
					gap: 2,
					justifycontent: "between",
					elem: [
						new $.btngroup({
							label: "First group",
							elem: [
								new $.button({ label: "1", color: "secondary", outline: true }),
								new $.button({ label: "2", color: "secondary", outline: true }),
								new $.button({ label: "3", color: "secondary", outline: true }),
								new $.button({ label: "4", color: "secondary", outline: true }),
							],
						}),
						new $.input({
							type: "text",
							placeholder: "Input group example",
							before: "@",
						}),
					],
				}),
			];
		},
	},

	{
		title: "Sizing",
		container: sample.formcontainer,
		code: function () {
			return [
				new $.btngroup({
					weight: "lg",
					elem: [
						new $.button({ outline: true, label: "Left", color: "secondary" }),
						new $.button({ outline: true, label: "Middle", color: "secondary" }),
						new $.button({ outline: true, label: "Right", color: "secondary" }),
					],
				}),
				new $.btngroup({
					elem: [
						new $.button({ outline: true, label: "Left", color: "secondary" }),
						new $.button({ outline: true, label: "Middle", color: "secondary" }),
						new $.button({ outline: true, label: "Right", color: "secondary" }),
					],
				}),
				new $.btngroup({
					weight: "sm",
					elem: [
						new $.button({ outline: true, label: "Left", color: "secondary" }),
						new $.button({ outline: true, label: "Middle", color: "secondary" }),
						new $.button({ outline: true, label: "Right", color: "secondary" }),
					],
				}),
			];
		},
	},

	{
		title: "Nesting",
		code: function () {
			return new $.btngroup({
				label: "Button group with nested dropdown",
				elem: [
					new $.button({ label: "1", color: "primary" }),
					new $.button({ label: "2", color: "primary" }),
					new $.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "#", label: "Dropdown link" },
							{ href: "#", label: "Dropdown link" },
						],
					}),
				],
			});
		},
	},

	{
		title: "Vertical variation",
		code: function () {
			return new $.btngroup({
				vertical: true,
				elem: [
					new $.button({ label: "Button", color: "dark" }),
					new $.button({ label: "Button", color: "dark" }),
					new $.button({ label: "Button", color: "dark" }),
					new $.button({ label: "Button", color: "dark" }),
					new $.button({ label: "Button", color: "dark" }),
					new $.button({ label: "Button", color: "dark" }),
				],
			});
		},
	},

	{
		title: "Vertical variation with dropdown",
		code: function () {
			return new $.btngroup({
				vertical: true,
				elem: [
					new $.button({ label: "Button", color: "primary" }),
					new $.button({ label: "Button", color: "primary" }),
					new $.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "#", label: "Dropdown link" },
							{ href: "#", label: "Dropdown link" },
						],
					}),
					new $.button({ label: "Button", color: "primary" }),
					new $.button({ label: "Button", color: "primary" }),
					new $.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "#", label: "Dropdown link" },
							{ href: "#", label: "Dropdown link" },
						],
					}),
					new $.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "#", label: "Dropdown link" },
							{ href: "#", label: "Dropdown link" },
						],
					}),
					new $.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "#", label: "Dropdown link" },
							{ href: "#", label: "Dropdown link" },
						],
					}),
				],
			});
		},
	},

	{
		title: "Vertical variation with radio button",
		code: function () {
			return new $.btngroup({
				vertical: true,
				elem: [
					new $.button({
						name: "g9",
						type: "radio",
						outline: true,
						label: "Radio 1",
						color: "danger",
						checked: true,
					}),
					new $.button({
						name: "g9",
						type: "radio",
						outline: true,
						label: "Radio 2",
						color: "danger",
					}),
					new $.button({
						name: "g9",
						type: "radio",
						outline: true,
						label: "Radio 3",
						color: "danger",
					}),
				],
			});
		},
	},
];
