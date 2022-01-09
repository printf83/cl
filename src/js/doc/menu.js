"use strict";
import $ from "../component.js";

export default [
	{
		title: "Menu",
		anchor: false,
	},
	{
		title: "Example",
		code: function () {
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
			].map(function (i) {
				return new $.menu(i);
			});
		},
	},

	{
		title: "Dark background",
		dark: true,
		code: function () {
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
			].map(function (i) {
				return new $.menu(i);
			});
		},
	},

	{
		title: "Auto expand",
		code: function () {
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
					active: true,
					item: [
						{ label: "Sub menu 2.1" },
						{ label: "Sub menu 2.2", active: true },
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
			].map(function (i) {
				return new $.menu(i);
			});
		},
	},

	{
		title: "With icon",
		code: function () {
			return [
				{
					label: "Menu",
					icon: "fire",
					active: true,
					item: [
						{ label: "Sub menu 1", icon: "info", active: true },
						{ label: "Sub menu 2" },
						{ label: "Sub menu 3" },
						{ label: "Sub menu 4" },
					],
				},
			].map(function (i) {
				return new $.menu(i);
			});
		},
	},

	{
		title: "Link",
		code: function () {
			return [
				{
					label: "Menu",
					item: [
						{ label: "BS5 JS Builder", active: true, href: "#" },
						{ label: "Bootstrap 5", href: "https://getbootstrap.com/docs/5.0/" },
						{ label: "Font Awesome", href: "https://fontawesome.com/v5.15/icons" },
						{ label: "Bootswatch", href: "https://bootswatch.com/" },
					],
				},
			].map(function (i) {
				return new $.menu(i);
			});
		},
	},

	{
		title: "Function",
		code: function () {
			return [
				{
					label: "Menu",
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
				},
			].map(function (i) {
				return new $.menu(i);
			});
		},
	},
];
