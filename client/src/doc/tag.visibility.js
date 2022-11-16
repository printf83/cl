"use strict";
import tag from "../cl/base/tag.js";
import * as alert from "../cl/base/alert.js";

export default [
	{
		title: "Visibility",
		msg: "EControl the visibility of elements, without modifying their display, with visibility utilities.",
		anchor: false,
	},

	{
		msg: [
			"Set the {{visibility}} of elements with Bootstrap {{visible}} property. These property do not modify the {{display}} value at all and do not affect layout – {{visible:false}} elements still take up space in the page.",
			new alert.container({
				color: "warning",
				elem: "Elements with the <code>visible:false</code> property will be hidden <i>both</i> visually and for assistive technology/screen reader users.",
			}),
			"Apply {{visible:true}} or {{visible:false}} as needed",
		],
		import: ["tag"],
		code: () => {
			return [false, true].map((i) => {
				return new tag({
					tag: "div",
					visible: i, //marker
					elem: `Example element with <code>visible:${i}</code>.`,
				});
			});
		},
	},
];