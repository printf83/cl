"use strict";
import sample from "./sample.js";
import example from "../cl/base/example.js";
import toast from "../cl/base/toast.js";
import div from "../cl/base/div.js";
import button from "../cl/base/button.js";
import input from "../cl/base/input.js";
import * as core from "../cl/base/core.js";

export default [
	{
		title: "Example",
		anchor: false,
	},

	{
		title: "Title only",
		import: ["example"],
		code: () => {
			return new example({
				title: "Title only",
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Title and message",
		import: ["example"],
		code: () => {
			return new example({
				title: "Title",
				msg: ["Message 1", "Message 2"],
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Code",
		import: ["example"],
		code: () => {
			return new example({
				title: "Title",
				msg: "Message",
				source: [`import button from "./base/button.js";`, `\/\/\/another code`],
				code: () => {
					return new button({ label: "Button", color: "primary" });
				},
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Code without preview",
		import: ["example"],
		code: () => {
			return new example({
				title: "Title",
				msg: "Message",
				view: false,
				source: [`import button from "./base/button.js";`, `\/\/\/another code`],
				code: () => {
					new button({ label: "Button", color: "primary" });
				},
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Sample code",
		import: ["example"],
		code: () => {
			return new example({
				title: "Title",
				msg: "Message",
				source: [`import input from "./base/input.js";`, `\/\/\/another code`],
				code: () => {
					return new input({
						type: "select",
						option: [
							{ value: "", label: "Open this select menu", selected: true },
							{ value: "1", label: "One" },
							{ value: "2", label: "Two" },
							{ value: "3", label: "Three" },
						],
					});
				},
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Dark view",
		import: ["example", "sample"],
		code: () => {
			return new example({
				title: "Title",
				msg: "Message",
				dark: true,
				source: [`import toast from "./base/toast.js"`, `\/\/\/another code`],
				code: () => {
					return new toast({
						color: "primary",
						icon: { icon: sample.icon(), color: "primary" },
						title: core.setting.title(),
						elem: "Hello, world! This is a toast message.",
						debug: true, // documentation purpose only
					});
				},
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "View class",
		import: ["example"],
		code: () => {
			return new example({
				title: "Title",
				msg: "Message",
				viewclass: "cl-highlight-col",
				source: [`import div from "./base/div.js";`, `\/\/\/another code`],
				code: () => {
					return new div("container", [
						new div("row", [
							new div("col-sm-3", "Level 1: col-sm-3"),
							new div(
								"col-sm-9",
								new div("row", [
									new div("col-8 col-sm-6", "Level 2: col-8 col-sm-6"),
									new div("col-4 col-sm-6", "Level 2: col-4 col-sm-6"),
								])
							),
						]),
					]);
				},
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Item container",
		import: ["div", "example"],
		code: () => {
			return new example({
				title: "Title",
				msg: "Message",
				container: (items) => {
					return new div(
						"p-0 container",
						new div(
							"g-2 row row-cols-auto",
							items.map((i) => {
								return new div("col", i);
							})
						)
					);
				},
				source: [`import button from "./base/button.js";`, `\/\/\/another code`],
				code: () => {
					return [
						new button({ label: "Primary", color: "primary" }),
						new button({ label: "Secondary", color: "secondary" }),
						new button({ label: "Success", color: "success" }),
						new button({ label: "Danger", color: "danger" }),
						new button({ label: "Warning", color: "warning" }),
						new button({ label: "Info", color: "info" }),
						new button({ label: "Light", color: "light" }),
						new button({ label: "Dark", color: "dark" }),
					];
				},
				debug: true, // documentation purpose only
			});
		},
	},
];