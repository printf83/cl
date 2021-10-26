"use strict";
import { core } from "./core.js";
import tag from "./tag.js";

export default class icon extends tag {
	constructor(...arg) {
		let t = {};
		if (arg && arg.length === 1) {
			if (typeof arg[0] === "string") {
				t = {
					icon: `fas fa-${arg[0]}`,
				};
			} else if (typeof arg[0] === "object" && Array.isArray(arg[0]) && arg[0].length === 2) {
				t = {
					icon: `${arg[0][0]} fa-${arg[0][1]}`,
				};
			} else {
				t = arg[0];
			}
		}

		let d = core.extend(
			{},
			{
				id: null,
				class: null,
				style: null,
				attr: null,

				icon: null,
				fixwidth: true,
			},
			t
		);

		super({
			id: d.id,
			style: d.style,
			attr: d.attr,

			tag: "i",
			class: core.merge.class(d.class, [d.icon, d.fixwidth ? "fa-fw" : null]),
		});
	}
}
