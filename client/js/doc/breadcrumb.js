"use strict";
import breadcrumb from "../base/breadcrumb.js";

export default [
	{
		title: "Breadcrumb",
		msg: "Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.",
		anchor: false,
	},

	{
		title: "Example",
		code: function () {
			return [
				new breadcrumb({
					item: [{ label: "Home", href: "#", active: true }],
				}),
				new breadcrumb({
					item: [
						{ label: "Home", href: "#" },
						{ label: "Library", href: "#", active: true },
					],
				}),
				new breadcrumb({
					item: [
						{ label: "Home", href: "#" },
						{ label: "Library", href: "#" },
						{ label: "Data", active: true, href: "#" },
					],
				}),
			];
		},
	},

	{
		title: "Divider",
		code: function () {
			return new breadcrumb({
				divider: "'>'",
				item: [
					{ label: "Home", href: "#" },
					{ label: "Library", href: "#" },
					{ label: "Data", active: true, href: "#" },
				],
			});
		},
	},
	{
		title: "Divider URL",
		code: function () {
			return new breadcrumb({
				divider: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
				item: [
					{ label: "Home", href: "#" },
					{ label: "Library", href: "#" },
					{ label: "Data", active: true, href: "#" },
				],
			});
		},
	},

	{
		title: "Divider None",
		code: function () {
			return new breadcrumb({
				divider: "''",
				item: [
					{ label: "Home", href: "#" },
					{ label: "Library", href: "#" },
					{ label: "Data", active: true, href: "#" },
				],
			});
		},
	},
];
