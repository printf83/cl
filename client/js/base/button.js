"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";
import icon from "./icon.js";
import label from "./label.js";

export default class button extends tag {
	constructor(...arg) {
		let t = {};

		if (arg && arg.length === 1 && typeof arg[0] === "string") {
			t.label = arg[0];
		} else if (arg && arg.length === 2) {
			t.label = arg[0];
			t.color = arg[1];
		} else {
			t = arg[0];
		}

		let d = core.extend(
			{},
			{
				attr: null,

				type: "button",
				label: "Button",
				hidelabel: false,
				icon: null,
				color: null,
				textcolor: null,
				disabled: false,
				outline: false,
				onclick: null,
			},
			t
		);

		super({
			tag: "button",
			attr: attr.merge(d.attr, {
				role: "button",
				type: d.type,
				disabled: d.disabled,
				onclick: d.onclick,
				"aria-label": d.hidelabel && d.label ? d.label : null,
				class: [
					"btn",
					d.color ? (d.outline ? `btn-outline-${d.color}` : `btn-${d.color}`) : null,
					d.textcolor ? `text-${d.textcolor}` : null,
				],
			}),
			elem: d.hidelabel ? (d.icon ? new icon(d.icon) : null) : new label(d.icon, d.label),
		});
	}
}
