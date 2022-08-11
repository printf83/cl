"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Example",
		anchor: false,
	},

	{
		title: "Title only",
		code: () => {
			return new $.example({
				title: "Title only",
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Title and message",
		code: () => {
			return new $.example({
				title: "Title",
				msg: ["Message 1", "Message 2"],
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Code",
		code: () => {
			return new $.example({
				title: "Title",
				msg: "Message",
				code: () => {
					return new $.button({ label: "Button", color: "primary" });
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Code without preview",
		code: () => {
			return new $.example({
				title: "Title",
				msg: "Message",
				view: false,
				code: () => {
					new $.button({ label: "Button", color: "primary" });
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Sample code",
		code: () => {
			return new $.example({
				title: "Title",
				msg: "Message",
				sample: {
					"sample.optionitem": sample.optionitem,
				},
				code: () => {
					return new $.input({ type: "select", option: sample.optionitem() });
				},
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Dark view",
		code: () => {
			return new $.example({
				title: "Title",
				msg: "Message",
				dark: true,
				code: () => {
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
		code: () => {
			return new $.example({
				title: "Title",
				msg: "Message",
				viewclass: "cl-highlight-col",
				code: () => {
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
		code: () => {
			return new $.example({
				title: "Title",
				msg: "Message",
				container: (items) => {
					return new $.div(
						"p-0 container",
						new $.div(
							"g-2 row row-cols-auto",
							items.map((i) => {
								return new $.div("col", i);
							})
						)
					);
				},
				code: () => {
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
