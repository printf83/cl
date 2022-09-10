"use strict";
import sample from "./sample.js";
import menu from "../base/menu.js";
import toast from "../base/toast.js";

export default [
	{
		title: "Menu",
		anchor: false,
	},
	{
		title: "Example",
		import: ["menu"],
		code: () => {
			return [
				{
					label: "Menu 1",
					item: [
						{ label: "Sub menu 1.1" },
						{ label: "Sub menu 1.2" },
						{ label: "Sub menu 1.3" },
						{ label: "Sub menu 1.4" },
					],
				},
				{
					label: "Menu 2",
					item: [
						{ label: "Sub menu 2.1" },
						{ label: "Sub menu 2.2" },
						{ label: "Sub menu 2.3" },
						{ label: "Sub menu 2.4" },
					],
				},
				{
					label: "Menu 3",
					item: [
						{ label: "Sub menu 3.1" },
						{ label: "Sub menu 3.2" },
						{ label: "Sub menu 3.3" },
						{ label: "Sub menu 3.4" },
					],
				},
			].map((i) => {
				return new menu(i);
			});
		},
	},

	{
		title: "Dark background",
		dark: true,
		import: ["menu"],
		code: () => {
			return [
				{
					label: "Menu 1",
					item: [
						{ label: "Sub menu 1.1" },
						{ label: "Sub menu 1.2" },
						{ label: "Sub menu 1.3" },
						{ label: "Sub menu 1.4" },
					],
				},
				{
					label: "Menu 2",
					item: [
						{ label: "Sub menu 2.1" },
						{ label: "Sub menu 2.2" },
						{ label: "Sub menu 2.3" },
						{ label: "Sub menu 2.4" },
					],
				},
				{
					label: "Menu 3",
					item: [
						{ label: "Sub menu 3.1" },
						{ label: "Sub menu 3.2" },
						{ label: "Sub menu 3.3" },
						{ label: "Sub menu 3.4" },
					],
				},
			].map((i) => {
				return new menu(i);
			});
		},
	},

	{
		title: "Auto expand",
		import: ["menu"],
		code: () => {
			return [
				{
					label: "Menu 1",
					item: [
						{ label: "Sub menu 1.1" },
						{ label: "Sub menu 1.2" },
						{ label: "Sub menu 1.3" },
						{ label: "Sub menu 1.4" },
					],
				},
				{
					label: "Menu 2",
					item: [
						{ label: "Sub menu 2.1" },
						{
							label: "Sub menu 2.2",

							//marker
							active: true,
						},
						{ label: "Sub menu 2.3" },
						{ label: "Sub menu 2.4" },
					],

					//marker
					active: true,
				},
				{
					label: "Menu 3",
					item: [
						{ label: "Sub menu 3.1" },
						{ label: "Sub menu 3.2" },
						{ label: "Sub menu 3.3" },
						{ label: "Sub menu 3.4" },
					],
				},
			].map((i) => {
				return new menu(i);
			});
		},
	},

	{
		title: "With icon",
		import: ["menu", "sample"],
		code: () => {
			return [
				{
					label: "Menu",

					active: true,
					item: [
						{
							label: "Sub menu 1",
							active: true,

							//marker
							icon: sample.icon(),
						},
						{ label: "Sub menu 2" },
						{ label: "Sub menu 3" },
						{ label: "Sub menu 4" },
					],

					//marker
					icon: sample.icon(),
				},
			].map((i) => {
				return new menu(i);
			});
		},
	},

	{
		title: "No arrow",
		import: ["menu", "sample"],
		code: () => {
			return [
				{
					label: "Menu",
					icon: {
						icon: sample.icon(),
						color: "danger",
					},
					active: true,
					item: [
						{
							label: "Sub menu 1",
							icon: {
								icon: sample.icon(),
								color: "primary",
							},
							active: true,
						},
						{ label: "Sub menu 2" },
						{ label: "Sub menu 3" },
						{ label: "Sub menu 4" },
					],

					//marker
					arrow: false,
				},
			].map((i) => {
				return new menu(i);
			});
		},
	},

	{
		title: "Link",
		import: ["menu"],
		code: () => {
			return [
				{
					label: "Menu",
					item: [
						{
							label: "BS5 JS Builder",
							active: true,

							//marker
							href: "#",
						},
						{
							label: "Bootstrap 5",

							//marker
							href: "https://getbootstrap.com/docs/5.2/",
						},
						{
							label: "Font Awesome",

							//marker
							href: "https://fontawesome.com/v6.2.0/icons",
						},
						{
							label: "Bootswatch",

							//marker
							href: "https://bootswatch.com/",
						},
					],
				},
			].map((i) => {
				return new menu(i);
			});
		},
	},

	{
		title: "Function",
		import: ["toast", "menu"],
		code: () => {
			return [
				{
					label: "Menu",
					item: [
						{
							label: "Show info toast",

							//marker
							onclick: () => {
								new toast("i", "Info toast").show();
							},
							//-
						},
						{
							label: "Show warning toast",

							//marker
							onclick: () => {
								new toast("!", "Warning toast").show();
							},
							//-
						},
						{
							label: "Show success toast",

							//marker
							onclick: () => {
								new toast("/", "Success toast").show();
							},
							//-
						},
						{
							label: "Show critical toast",

							//marker
							onclick: () => {
								new toast("x", "Critical toast").show();
							},
							//-
						},
					],
				},
			].map((i) => {
				return new menu(i);
			});
		},
	},
];
