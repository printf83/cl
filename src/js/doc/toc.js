"use strict";
import $ from "../component.js";

export default [
	{
		title: "Table of content",
		anchor: false,
	},
	{
		title: "Example",
		code: function () {
			return new $.toc({
				label: "On this page",
				item: [
					{ label: "Item 1" },
					{ label: "Item 2" },
					{ label: "Item 3" },
					{ label: "Item 4" },
					{ label: "Item 5" },
				],
			});
		},
	},

	{
		title: "Level",
		code: function () {
			return new $.toc({
				label: "On this page",
				item: [
					{ label: "Item 1" },
					{ label: "Item 2", level: 1 },
					{ label: "Item 3" },
					{ label: "Item 4" },
					{ label: "Item 5" },
				],
			});
		},
	},

	{
		title: "With icon",
		code: function () {
			return new $.toc({
				icon: "fire",
				label: "Example",
				item: [
					{ icon: "fire", label: "Item 1" },
					{ label: "Item 2" },
					{ label: "Item 3" },
					{ label: "Item 4" },
					{ label: "Item 5" },
				],
			});
		},
	},

	{
		title: "Link",
		code: function () {
			return new $.toc({
				label: "Example",
				item: [
					{ label: "BS5 JS Builder", href: "#" },
					{ label: "Bootstrap 5", href: "https://getbootstrap.com/docs/5.0/" },
					{ label: "Font Awesome", href: "https://fontawesome.com/v5.15/icons" },
					{ label: "Bootswatch", href: "https://bootswatch.com/" },
				],
			});
		},
	},

	{
		title: "Function",
		code: function () {
			return new $.toc({
				label: "Example",
				item: [
					{
						label: "Show info toast",
						onclick: function () {
							new $.toast("i", "Info toast").show();
						},
					},
					{
						label: "Show warning toast",
						onclick: function () {
							new $.toast("!", "Warning toast").show();
						},
					},
					{
						label: "Show success toast",
						onclick: function () {
							new $.toast("/", "Success toast").show();
						},
					},
					{
						label: "Show critical toast",
						onclick: function () {
							new $.toast("x", "Critical toast").show();
						},
					},
				],
			});
		},
	},
];
