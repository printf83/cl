"use strict";
import * as layout from "../cl/base/layout.js";

export default [
	{
		title: "Layout",
		anchor: false,
	},
	{
		title: "Layout 1",
		viewclass: "cl-highlight-divwithid",
		import: ["layout"],
		code: () => {
			return new layout.l1({
				topid: "top",
				leftid: "left",
				rightid: "right",
				mainid: "main",
				footerid: "footer",

				topelem: "Top",
				leftelem: "Left",
				rightelem: "Right",
				mainelem: "Main",
				footerelem: "Footer",

				backtotop: true,
			});
		},
	},
];
