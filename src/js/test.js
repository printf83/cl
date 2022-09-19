"use strict";

///library
import * as core from "./base/core.js";
import breadcrumb from "./base/breadcrumb.js";
import sample from "./doc/sample.js"; //for documentation purpose only

///code
let code = () => {
	return [
		new breadcrumb({
			item: [
				{
					label: "Home",
					href: "#",
				},
				{
					label: "Library",
					icon: {
						icon: sample.icon(),
						shake: true,
					},
					click: () => {},
					textWrap: true,
					color: "primary",
					weight: "sm",
				},
				{
					label: "Data",
					current: true,
					href: "#",
				},
			],
		}),
	];
};

///loader
core.documentReady(() => {
	core.replaceChild(document.getElementById("root"), code());
});
