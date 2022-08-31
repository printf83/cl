"use strict";
import toc from "../base/toc.js";
import toast from "../base/toast.js";

export default [
	{
		title: "Table of content",
		anchor: false,
	},
	{
		title: "Example",
		import: ["toc"],
		code: () => {
			return new toc({
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
		import: ["toc"],
		code: () => {
			return new toc({
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
		import: ["toc"],
		code: () => {
			return new toc({
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
		import: ["toc"],
		code: () => {
			return new toc({
				label: "Example",
				item: [
					{ label: "BS5 JS Builder", href: "#" },
					{ label: "Bootstrap 5", href: "https://getbootstrap.com/docs/5.2/" },
					{ label: "Font Awesome", href: "https://fontawesome.com/v6.1.2/icons" },
					{ label: "Bootswatch", href: "https://bootswatch.com/" },
				],
			});
		},
	},

	{
		title: "Function",
		import: ["toast", "toc"],
		code: () => {
			return new toc({
				label: "Example",
				item: [
					{
						label: "Show info toast",
						onclick: () => {
							new toast("i", "Info toast").show();
						},
					},
					{
						label: "Show warning toast",
						onclick: () => {
							new toast("!", "Warning toast").show();
						},
					},
					{
						label: "Show success toast",
						onclick: () => {
							new toast("/", "Success toast").show();
						},
					},
					{
						label: "Show critical toast",
						onclick: () => {
							new toast("x", "Critical toast").show();
						},
					},
				],
			});
		},
	},
];
