"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Layout",
		anchor: false,
	},
	{
		title: "Layout 1",
		viewclass: "cl-highlight-divwithid",
		code: function () {
			return new $.layout.l1({
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
