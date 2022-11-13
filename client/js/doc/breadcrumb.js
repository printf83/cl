"use strict";
import sample from "./sample.js";
import breadcrumb from "../../cl/js/base/breadcrumb.js";

export default [
	{
		title: "Breadcrumb",
		msg: "Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.",
		anchor: false,
	},

	{
		title: "Example",
		container: sample.vstackcontainer,
		import: ["breadcrumb"],
		code: () => {
			return [
				new breadcrumb({
					item: [{ label: "Home", href: "#", current: true }],
				}),
				new breadcrumb({
					item: [
						{ label: "Home", href: "#" },
						{ label: "Library", href: "#", current: true },
					],
				}),
				new breadcrumb({
					item: [
						{ label: "Home", href: "#" },
						{ label: "Library", href: "#" },
						{ label: "Data", current: true, href: "#" },
					],
				}),
			];
		},
	},

	{
		title: "Divider",
		import: ["breadcrumb"],
		code: () => {
			return new breadcrumb({
				divider: "'>'", //marker
				item: [
					{ label: "Home", href: "#" },
					{ label: "Library", href: "#" },
					{ label: "Data", current: true, href: "#" },
				],
			});
		},
	},
	{
		title: "Divider URL",
		import: ["breadcrumb"],
		code: () => {
			return new breadcrumb({
				divider: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`, //marker
				item: [
					{ label: "Home", href: "#" },
					{ label: "Library", href: "#" },
					{ label: "Data", current: true, href: "#" },
				],
			});
		},
	},

	{
		title: "Divider None",
		import: ["breadcrumb"],
		code: () => {
			return new breadcrumb({
				divider: "''", //marker
				item: [
					{ label: "Home", href: "#" },
					{ label: "Library", href: "#" },
					{ label: "Data", current: true, href: "#" },
				],
			});
		},
	},

	{
		title: "Kitchen sink",
		container: sample.vstackcontainer,
		import: ["breadcrumb", "sample"],
		code: () => {
			return [
				new breadcrumb({
					item: [
						{ label: "Home", href: "#" },
						{
							label: "Library",
							icon: {
								icon: sample.icon(),
								shake: true,
								color: "danger",
							},
							click: () => {},
							weight: "sm",
							padding: 0,
						},
						{ label: "Data", current: true, href: "#" },
					],
				}),
			];
		},
	},
];
