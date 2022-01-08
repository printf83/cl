"use strict";
import * as sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Example",
		anchor: false,
	},

	{
		title: "Title only",
		code: function () {
			return new $.example({
				title: "Title only",
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Title and message",
		code: function () {
			return new $.example({
				title: "Title",
				msg: ["Message 1", "Message 2"],
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Code",
		code: function () {
			return new $.example({
				title: "Title",
				msg: "Message",
				code: function () {
					return new $.button({ label: "Button", color: "primary" });
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Code with beautify",
		sample: {
			"sample.beautifyjs": sample.beautifyjs,
			"sample.beautifyhtml": sample.beautifyhtml,
		},
		code: function () {
			return new $.example({
				title: "Title",
				msg: "Message",
				beautifyjs: sample.beautifyjs,
				beautifyhtml: sample.beautifyhtml,
				code: function () {
					return new $.button({ label: "Button", color: "primary" });
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},
	{
		title: "Sample code",
		sample: {
			"sample.beautifyjs": sample.beautifyjs,
			"sample.beautifyhtml": sample.beautifyhtml,
		},
		code: function () {
			return new $.example({
				title: "Title",
				msg: "Message",
				sample: {
					"sample.optionitem": sample.optionitem,
				},
				beautifyjs: sample.beautifyjs,
				beautifyhtml: sample.beautifyhtml,
				code: function () {
					return new $.input({ type: "select", option: sample.optionitem() });
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Dark view",
		sample: {
			"sample.beautifyjs": sample.beautifyjs,
			"sample.beautifyhtml": sample.beautifyhtml,
		},
		code: function () {
			return new $.example({
				title: "Title",
				msg: "Message",
				dark: true,
				beautifyjs: sample.beautifyjs,
				beautifyhtml: sample.beautifyhtml,
				code: function () {
					return new $.toast({
						color: "primary",
						textcolor: "light",
						icon: { icon: "fire", color: "primary" },
						title: "Bootstrap",
						elem: "Hello, world! This is a toast message.",
						debug: true, //this last option is for this documentation preview only
					});
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "View class",
		sample: {
			"sample.beautifyjs": sample.beautifyjs,
			"sample.beautifyhtml": sample.beautifyhtml,
		},
		code: function () {
			return new $.example({
				title: "Title",
				msg: "Message",
				viewclass: "cl-highlight-col",
				beautifyjs: sample.beautifyjs,
				beautifyhtml: sample.beautifyhtml,
				code: function () {
					return new $.div("container", [
						new $.div("row", [
							new $.div("col-sm-3", "Level 1: col-sm-3"),
							new $.div(
								"col-sm-9",
								new $.div("row", [
									new $.div("col-8 col-sm-6", "Level 2: col-8 col-sm-6"),
									new $.div("col-4 col-sm-6", "Level 2: col-4 col-sm-6"),
								])
							),
						]),
					]);
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Item container",
		sample: {
			"sample.beautifyjs": sample.beautifyjs,
			"sample.beautifyhtml": sample.beautifyhtml,
		},
		code: function () {
			return new $.example({
				title: "Title",
				msg: "Message",
				beautifyjs: sample.beautifyjs,
				beautifyhtml: sample.beautifyhtml,
				container: function (items) {
					return new $.div(
						"p-0 container",
						new $.div(
							"g-2 row row-cols-auto",
							items.map(function (i) {
								return new $.div("col", i);
							})
						)
					);
				},
				code: function () {
					return [
						new $.button({ label: "Primary", color: "primary" }),
						new $.button({ label: "Secondary", color: "secondary" }),
						new $.button({ label: "Success", color: "success" }),
						new $.button({ label: "Danger", color: "danger" }),
						new $.button({ label: "Warning", color: "warning" }),
						new $.button({ label: "Info", color: "info" }),
						new $.button({ label: "Light", color: "light" }),
						new $.button({ label: "Dark", color: "dark" }),
					];
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},
];
