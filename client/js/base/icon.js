"use strict";
import attr from "./attr.js";
import * as core from "./core.js";
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
				attr: null,
				icon: null,
				fixwidth: true,
			},
			t
		);

		super({
			tag: "i",
			attr: attr.merge(d.attr, {
				class: [d.icon, d.fixwidth ? "fa-fw" : null],
			}),
		});
	}
}
