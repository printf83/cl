"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";
import icon from "./icon.js";
import label from "./label.js";

/**
 * label
 * label, color
 * label, onclick
 * label, color, onclick
 * option
 */
export default class button extends tag {
	constructor(...arg) {
		super();
		this.data = arg;
	}

	get data() {
		return this._d;
	}
	set data(arg) {
		this._d = arg;

		if (arg) {
			let t = {
				label: null,
				color: null,
				onclick: null,
			};
			if (arg && arg.length === 3) {
				t.label = arg[0];
				t.color = arg[1];
				t.onclick = arg[2];
			} else if (arg && arg.length === 2 && arg[1] instanceof Function) {
				t.label = arg[0];
				t.onclick = arg[1];
			} else if (arg && arg.length === 2 && typeof arg[1] === "string") {
				t.label = arg[0];
				t.color = arg[1];
			} else if (arg && arg.length === 1 && typeof arg[0] === "string") {
				t.label = arg[0];
			} else {
				t = arg[0];
			}

			let d = core.extend(
				{},
				{
					attr: null,

					id: null,
					name: null,

					type: "button",
					label: null,
					icon: null,
					value: null,
					checked: false,

					color: null,
					textcolor: null,
					weight: null,
					disabled: false,
					outline: false,
					hidelabel: false,
					nowarp: false,

					onclick: null,
					href: null,
				},
				t
			);

			super.data = {
				tag: d.href ? "a" : "button",
				attr: attr.merge(d.attr, {
					id: d.id,
					name: d.name,
					value: d.value,
					checked: d.checked,

					role: "button",
					type: d.type !== "button" ? d.type : null,
					disabled: d.disabled,
					onclick: d.onclick,
					href: d.href,
					"aria-label": d.hidelabel && d.label ? d.label : null,
					"aria-disabled": d.href && d.disabled ? "true" : null,
					class: [
						"btn",
						d.nowarp ? "text-nowarp" : null,
						d.weight ? `btn-${d.weight}` : null,
						d.color ? (d.outline ? `btn-outline-${d.color}` : `btn-${d.color}`) : null,
						d.textcolor ? `text-${d.textcolor}` : null,
					],
				}),
				elem: d.hidelabel ? (d.icon ? new icon(d.icon) : null) : new label(d.icon, d.label),
			};
		}
	}
}
