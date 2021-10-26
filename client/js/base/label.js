"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import icon from "./icon.js";

export default class label extends tag {
	constructor(...arg) {
		let t = {};

		if (arg && arg.length === 1 && typeof arg[0] === "string") {
			t.label = arg[0];
		} else if (arg && arg.length === 2) {
			t.icon = arg[0];
			t.label = arg[1];
		} else {
			t = arg[0];
		}

		let d = core.extend(
			{},
			{
				attr: null,
				icon: null,
				label: null,
			},
			t
		);

		super({
			attr: d.attr,
			elem: d.icon
				? [new icon(d.icon), new tag({ tag: "label", attr: { class: "ms-2" }, elem: d.label })]
				: new tag({ tag: "label", elem: d.label }),
		});
	}
}
