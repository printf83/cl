"use strict";
import sample from "./sample.js";
import toc from "../dist/cl/base/toc.js";
import toast from "../dist/cl/base/toast.js";

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
					{ label: "Item 2", /*marker*/ level: 1 },
					{ label: "Item 3" },
					{ label: "Item 4" },
					{ label: "Item 5" },
				],
			});
		},
	},

	{
		title: "With icon",
		import: ["toc", "sample"],
		code: () => {
			return new toc({
				label: "Example",
				item: [
					{ /*marker*/ icon: sample.icon(), label: "Item 1" },
					{ label: "Item 2" },
					{ label: "Item 3" },
					{ label: "Item 4" },
					{ label: "Item 5" },
				],

				//marker
				icon: sample.icon(),
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
					{ label: "BS5 JS Builder", /*marker*/ href: "#" },
					{ label: "Bootstrap 5", /*marker*/ href: "https://getbootstrap.com/docs/5.2/" },
					{ label: "Font Awesome", /*marker*/ href: "https://fontawesome.com/v6.2.0/icons" },
					{ label: "Bootswatch", /*marker*/ href: "https://bootswatch.com/" },
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

						//marker
						click: () => {
							new toast("i", "Info toast").show();
						},
						//-
					},
					{
						label: "Show warning toast",

						//marker
						click: () => {
							new toast("!", "Warning toast").show();
						},
						//-
					},
					{
						label: "Show success toast",

						//marker
						click: () => {
							new toast("/", "Success toast").show();
						},
						//-
					},
					{
						label: "Show critical toast",

						//marker
						click: () => {
							new toast("x", "Critical toast").show();
						},
						//-
					},
				],
			});
		},
	},
];
