"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";
import label from "./label.js";
import badge from "./badge.js";

/**
 * label
 * label, color
 * label, onclick
 * label, color, onclick
 * option : {attr,id,name,type,label,icon,badge,value,checked,color,textcolor,weight,disabled,outline,hidelabel,nowarp,onclick,href}
 */
export default class button extends tag {
	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
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

			this.data = core.extend(
				{},
				{
					attr: null,

					id: null,
					name: null,

					type: "button",
					label: null,
					icon: null,
					badge: null,
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
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			this._d = {
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
						d.badge && typeof d.badge === "object" && d.badge.notification ? "position-relative" : null,
					],
				}),
				elem: [
					d.label || d.icon ? new label({ icon: d.icon, label: !d.hidelabel ? d.label : null }) : null,
					d.badge ? new badge(d.badge) : null,
				],
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
