"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import button from "./button.js";

core.documentReady(() => {
	var root = document.getElementById("root");
	var b = new tag({
		tag: "div",
		attr: { class: "display-1" },
		elem: [
			"Hello World",
			new button({ label: "Primary", color: "primary", attr: { id: core.UUID("btn-xxx") } }),
			new button({
				label: "Danger",
				color: "danger",
				type: "submit",
				icon: ["fab", "facebook"],
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
		],
	});
	b.build(root);
});
