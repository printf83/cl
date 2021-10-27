"use strict";
import * as core from "./base/core.js";
import div from "./base/div.js";
import p from "./base/p.js";
import h from "./base/h.js";
import button from "./base/button.js";
import * as inputgroup from "./base/inputgroup.js";
import icon from "./base/icon.js";

core.documentReady(() => {
	var root = document.getElementById("root");
	// let b = new div("display-1", "Hello world");
	let b = new div("mb-5", [
		new p("display-1", "Hello World"),
		new button({ label: "Primary", color: "primary", attr: { id: core.UUID("btn-xxxxxxx") } }),
		new button({
			label: "Danger",
			color: "danger",
			type: "submit",
			outline: true,
			icon: { style: "fab", icon: "facebook", spin: true },
			attr: { style: { width: "150px" } },
		}),
		new button({
			label: "Yay",
			disabled: true,
			hidelabel: true,
			color: "success",
			type: "reset",
			icon: "fire",
			attr: {
				class: ["makkauhijau", "btn", "btn", null, null, null, "makkaubiru", "makkaubiru", "makkaubiru"],
			},
		}),
		new button("hello", "warning"),
		new h(3, "text-primary mb-5", "This is h3 Title"),
		new div("mb-5", [
			new inputgroup.container([
				new inputgroup.text([new icon("fire")]),
				new button("Hello", "primary"),
				new inputgroup.text([new icon("fire")]),
				new inputgroup.text({ elem: new icon("fire"), attr: { class: "text-danger" } }),
				new button("World", "info"),
				new inputgroup.text([new icon("fire"), new icon("fire"), new icon("fire")]),
			]),
		]),
		new div("mb-5", [
			new icon("fab", "bootstrap"),
			new icon("home"),
			new icon({ icon: "home", color: "danger" }),
			new icon({ icon: "home", color: "danger", rotate: 90 }),
			new icon({ icon: "home", color: "warning", rotate: "both" }),
		]),

		new div("mb-5", [
			new icon({ icon: "home", color: "danger", weight: "5x" }),
			new icon({
				elem: [new icon({ stack: 1, icon: "camera" }), new icon({ stack: 2, icon: "ban", color: "danger" })],
			}),
			new icon({
				color: "info",
				elem: [
					new icon({ stack: 2, icon: "square" }),
					new icon({ stack: 1, style: "fab", icon: "twitter", inverse: true }),
				],
			}),
		]),
	]);
	b.build(root);
});
