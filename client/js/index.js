"use strict";
import * as core from "./base/core.js";
import div from "./base/div.js";
import p from "./base/p.js";
import h from "./base/h.js";
import button from "./base/button.js";
import * as inputgroup from "./base/inputgroup.js";

core.documentReady(() => {
	var root = document.getElementById("root");
	var b = new div("oooo", [
		new p("display-1", "Hello World"),
		new button({ label: "Primary", color: "primary", attr: { id: core.UUID("btn-xxxxxxx") } }),
		new button({
			label: "Danger",
			color: "danger",
			type: "submit",
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
		new h(3, "text-primary", "This is h3 Title"),
		new div([
			new inputgroup.container([
				new button("Hello", "primary"),
				new inputgroup.text("@"),
				new button("World", "info"),
			]),
		]),
	]);
	b.build(root);
});
